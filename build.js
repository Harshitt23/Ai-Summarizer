#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';

console.log('Starting custom build script...');

try {
  // Run vite build using execSync
  console.log('Running vite build...');
  execSync('npx vite build', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 