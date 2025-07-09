#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting custom build script...');

try {
  // Use the most direct approach - call vite through node
  console.log('Running vite build via node...');
  
  const viteBinPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  console.log(`Using vite path: ${viteBinPath}`);
  
  execSync(`node "${viteBinPath}" build`, { 
    stdio: 'inherit',
    cwd: process.cwd(),
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  console.error('Error details:', error);
  process.exit(1);
} 