import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { sendEmail } from '@better-auth/infra';
import { passkey } from '@better-auth/passkey';
import { stripe } from '@better-auth/stripe';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import type { UserWithTwoFactor } from 'better-auth/plugins';
import {
  admin,
  bearer,
  deviceAuthorization,
  lastLoginMethod,
  oAuthProxy,
  oneTap,
  jwt,
  openAPI,
  organization,
  twoFactor,
  multiSession,
} from 'better-auth/plugins';
import Stripe from 'stripe';
import * as AuthSchema from '@/models/auth-schema';
import { db } from './DB';
import { baseURL } from './demo-url';

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema: { ...AuthSchema },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID ?? '',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? '',
    },
  },
  plugins: [
    multiSession(),
    organization({
      schema: {
        organization: {
          additionalFields: {
            domain: {
              type: 'string',
              input: true,
              required: false,
            },
            address: {
              type: 'string',
              input: true,
              required: false,
            },
          },
        },
        member: {
          additionalFields: {
            status: {
              type: 'string',
              input: false,
              required: false,
              default: 'active',
            },
            lastActiveAt: {
              type: 'date',
              input: false,
              required: false,
              default: new Date(),
            },
          },
        },
      },
      async sendInvitationEmail(data) {
        await sendEmail({
          to: data.email,
          subject: "You've been invited to join an organization",
          template: 'invitation',
          variables: {
            inviterEmail: data.inviter.user.email,
            inviterName: data.inviter.user.name,
            organizationName: data.organization.name,
            role: data.role,
            inviteLink:
              process.env.NODE_ENV === 'development'
                ? `http://localhost:3000/accept-invitation/${data.id}`
                : `${baseURL}/accept-invitation/${data.id}`,
          },
        });
      },
    }),
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }: { user: UserWithTwoFactor; otp: string }) {
          await sendEmail({
            to: user.email,
            subject: 'Your two-factor authentication code',
            template: 'two-factor',
            variables: {
              otpCode: otp,
              userEmail: user.email,
              userName: user.name,
              appName: 'Better Auth Demo',
            },
          });
        },
      },
    }),
    passkey(),
    openAPI(),
    bearer(),
    admin(),
    oAuthProxy({
      productionURL: baseURL,
    }),
    oneTap(),
    deviceAuthorization({
      expiresIn: '3min',
      interval: '5s',
    }),
    lastLoginMethod(),
    jwt({
      jwt: {
        issuer: baseURL,
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
      createCustomerOnSignUp: true,
    }),
    nextCookies(),
  ], // make sure nextCookies is the last plugin in the array
});

export type Session = typeof auth.$Infer.Session;
export type ActiveOrganization = typeof auth.$Infer.ActiveOrganization;
export type OrganizationRole = ActiveOrganization['members'][number]['role'];
export type Invitation = typeof auth.$Infer.Invitation;
export type DeviceSession = Awaited<ReturnType<typeof auth.api.listDeviceSessions>>[number];
export type Organization = typeof auth.$Infer.Organization;
export type OrganizationMember = ActiveOrganization['members'][number];
