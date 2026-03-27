#!/usr/bin/env node
// Recreates missing schema stub files for @premieroctet/next-admin
// These files are declared in package.json exports but not shipped in the package.
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../node_modules/@premieroctet/next-admin/dist');

if (!fs.existsSync(distDir)) {
  console.log('next-admin not installed, skipping schema patch');
  process.exit(0);
}

// Use a static relative path so webpack can resolve it at build time
// (dynamic path.join(process.cwd(), ...) causes "Can't resolve <dynamic>" errors)
const relativeToJson = '../../../../src/generated/json-schema.json';

fs.writeFileSync(
  path.join(distDir, 'schema.cjs'),
  `const schema = require('${relativeToJson}');\nmodule.exports = schema;\n`
);

fs.writeFileSync(
  path.join(distDir, 'schema.mjs'),
  `import { createRequire } from 'module';\nconst require = createRequire(import.meta.url);\nconst schema = require('${relativeToJson}');\nexport default schema;\n`
);

console.log('Patched @premieroctet/next-admin schema stubs');
