#!/usr/bin/env node
/**
 * Scans the project for leftover template placeholder text. In a client copy
 * (after `npm run client:init`) it also fails on any template-only file or
 * mention left behind.
 * Run before delivering a client site:  npm run check:placeholders
 * Exits 0 when clean, 1 when placeholders are found.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const PATTERNS = [
  /brand name/i,
  /your (company|brand|tagline|logo|email|phone|text|content|organization)\b/i,
  /lorem ipsum/i,
  /\/placeholders\//i,
  /example\.com/i,
  /john doe|jane doe/i,
  /\+1[-\s]?\(?555/,
  /\b1?5555550100\b/,
  /Mon–Fri, 9:00 AM – 5:00 PM/,
  /123\s+main\s+st/i,
  /yourusername/i,
  /TODO|FIXME|REPLACE[_\s]?ME/i,
  // Template defaults in src/data and src/config
  /goes here/i,
  /\[Enter /i,
  /\b(Service|Project|Partner|Pillar) (One|Two|Three|Four|Five|Six)\b/,
  /\bservice-(one|two|three|four|five|six)\b|\bproject-(one|two|three)\b/,
  /Belief (one|two|three)/i,
  /Feature or deliverable/i,
  /Describe (your|how clients)/i,
  /Replace with a real/i,
  /\bClient [A-C]\b|Client Name|Title \/ Role|City, Country|\bTag [A-C]\b/,
  /your (jurisdiction|city)/i,
  // Legal wording not yet approved: set `reviewed: true` in src/data/legal.ts
  /reviewed:\s*false/,
];

const SCAN_DIRS = ['src', 'public'];
const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css', '.svg']);
// public/placeholders holds the template's sample art; using it is caught by the
// /placeholders/ pattern in src, so its own contents are not scanned.
const SKIP = new Set(['node_modules', '.next', 'out', '.git', 'dist', 'placeholders']);
const SKIP_FILES = new Set(['check-placeholders.mjs', 'package-lock.json']);

const hits = [];

function scan(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      scan(full);
      continue;
    }
    if (SKIP_FILES.has(entry) || !SCAN_EXTS.has(extname(entry))) continue;
    const lines = readFileSync(full, 'utf8').split('\n');
    lines.forEach((line, i) => {
      for (const pattern of PATTERNS) {
        if (pattern.test(line)) {
          hits.push(`${relative(ROOT, full)}:${i + 1}  ${line.trim().slice(0, 120)}`);
          break;
        }
      }
    });
  }
}

for (const dir of SCAN_DIRS) {
  try {
    scan(join(ROOT, dir));
  } catch {
    /* dir missing */
  }
}

// Client copy: client:init deletes itself, so its absence marks a client repo.
const TEMPLATE_FILES = [
  'TEMPLATE_ROADMAP.md',
  'PROJECT_WORKFLOW.md',
  '.claude/commands/template-next.md',
  'src/app/hero-preview',
  'public/hero-preview',
  'docs/hero-layouts',
  'src/data/stress',
  'scripts/client-init',
];
const TEMPLATE_MENTION =
  /TEMPLATE_ROADMAP|PROJECT_WORKFLOW|template-next|hero-preview|hero-layouts|STRESS_DATA|dev:stress|data\/stress|template-only/;
const CLEAN_EXTS = new Set([...SCAN_EXTS, '.mjs', '.yml']);
const CLEAN_SKIP = new Set(['node_modules', '.next', 'out', '.git', 'flags']);

function scanClean(dir) {
  for (const entry of readdirSync(dir)) {
    if (CLEAN_SKIP.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      scanClean(full);
      continue;
    }
    if (SKIP_FILES.has(entry) || !CLEAN_EXTS.has(extname(entry))) continue;
    readFileSync(full, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        if (TEMPLATE_MENTION.test(line)) {
          hits.push(
            `${relative(ROOT, full)}:${i + 1}  template-only: ${line.trim().slice(0, 100)}`
          );
        }
      });
  }
}

if (!existsSync(join(ROOT, 'scripts', 'client-init.mjs'))) {
  for (const path of TEMPLATE_FILES) {
    if (existsSync(join(ROOT, path)))
      hits.push(`${path}  template-only file left in a client copy`);
  }
  scanClean(ROOT);
}

if (hits.length === 0) {
  console.log('✓ No placeholder text found. Site is ready to ship.');
  process.exit(0);
}

console.log(`Found ${hits.length} possible placeholder(s):\n`);
for (const hit of hits) console.log('  ' + hit);
console.log('\nReplace these with real client content, then run again.');
process.exit(1);
