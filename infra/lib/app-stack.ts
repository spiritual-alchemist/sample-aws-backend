import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

/** Mv's own infra: a single S3 bucket, tagged app=mv. (filter test: infra change SHOULD trigger) */
export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const account = cdk.Stack.of(this).account; // keeps the bucket name globally unique

    const bucket = new s3.Bucket(this, 'MvBucket', {
      bucketName: `mv-bucket-${account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // sandbox: cdk destroy can remove it (empty)
    });

    cdk.Tags.of(bucket).add('app', 'mv');
    cdk.Tags.of(bucket).add('env', 'dev');
    cdk.Tags.of(bucket).add('managed-by', 'cdk');

    new cdk.CfnOutput(this, 'MvBucketName', { value: bucket.bucketName });
  }
}
