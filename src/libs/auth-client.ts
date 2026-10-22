import { oauthProviderClient } from '@better-auth/oauth-provider/client';
import { passkeyClient } from '@better-auth/passkey/client';
import { ssoClient } from '@better-auth/sso/client';
import { stripeClient } from '@better-auth/stripe/client';
import {
  lastLoginMethodClient,
  adminClient,
  deviceAuthorizationClient,
  oneTapClient,
  organizationClient,
  twoFactorClient,
  inferOrgAdditionalFields,
  multiSessionClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { toast } from 'sonner';
import type { auth } from './auth';

export const authClient = createAuthClient({
  plugins: [
    multiSessionClient(),
    lastLoginMethodClient(),
    ssoClient(),
    organizationClient({
      schema: inferOrgAdditionalFields<typeof auth>(),
    }),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = '/two-factor';
      },
    }),
    passkeyClient(),
    adminClient(),
    oneTapClient({
      clientId: String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
      promptOptions: {
        maxAttempts: 1,
      },
    }),
    oauthProviderClient(),
    deviceAuthorizationClient(),
    stripeClient({
      subscription: true, //if you want to enable subscription management
    }),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error('Too many requests. Please try again later.');
      }
    },
  },
});
