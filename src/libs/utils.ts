import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export async function convertImageToBase64(file: File): Promise<string> {
//   const buffer = await file.arrayBuffer();
//   const base64 = Buffer.from(buffer).toString('base64');
//   return `data:${file.type};base64,${base64}`;
// }
