
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as config from 'aws-cdk-lib/aws-config';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class GovernanceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Enable Config recorder
    new config.ConfigurationRecorder(this, 'ConfigRecorder', {
      role: undefined,
      recordingGroup: {
        allSupported: true,
      },
    });

    new config.DeliveryChannel(this, 'DeliveryChannel', {
      s3BucketName: 'my-config-bucket', // Replace with your bucket
    });

    // Managed rules
    new config.ManagedRule(this, 'S3PublicReadProhibited', {
      identifier: 'S3_BUCKET_PUBLIC_READ_PROHIBITED',
    });

    new config.ManagedRule(this, 'S3PublicWriteProhibited', {
      identifier: 'S3_BUCKET_PUBLIC_WRITE_PROHIBITED',
    });

    // Custom rule Lambda
    const ruleFn = new lambda.Function(this, 'S3TagRuleFunction', {
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_18_X,
    });

    new config.CustomRule(this, 'CustomS3TagRule', {
      configRuleName: 'custom-s3-tag-check',
      lambdaFunction: ruleFn,
      inputParameters: { tagKey: 'Confidential', tagValue: 'true' },
      configurationChanges: true,
      maximumExecutionFrequency: config.MaximumExecutionFrequency.TWENTY_FOUR_HOURS,
    });
  }
}
