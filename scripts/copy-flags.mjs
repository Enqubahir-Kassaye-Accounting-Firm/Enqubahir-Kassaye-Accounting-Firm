#!/usr/bin/env node
/**
 * Copies the country flags used by the phone field into public/flags/, so the
 * site serves them itself instead of the phone library's default third-party
 * URL. Runs after every `npm install` / `npm ci` (postinstall); public/flags/
 * is not committed.
 * Usage: npm run flags:copy
 */
import { cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(ROOT, 'node_modules', 'country-flag-icons', '3x2');
const target = join(ROOT, 'public', 'flags');

if (!existsSync(source)) {
  console.warn('copy-flags: country-flag-icons not installed; phone field flags will be missing.');
  process.exit(0);
}

cpSync(source, target, { recursive: true });
console.log('copy-flags: flags copied to public/flags/');
