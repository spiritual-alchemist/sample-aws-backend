#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AppStack } from '../lib/app-stack';

const app = new cdk.App();

// Mv's own infra stack, deployed into the claude-test member account (Mumbai).
new AppStack(app, 'MvInfra', {
  env: { account: '720294271018', region: 'ap-south-1' },
});
