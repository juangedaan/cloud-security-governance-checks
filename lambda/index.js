
exports.handler = async (event) => {
    const invokingEvent = JSON.parse(event.invokingEvent);
    const configurationItem = invokingEvent.configurationItem;

    const isS3 = configurationItem.resourceType === 'AWS::S3::Bucket';
    const tags = configurationItem.configurationItemCaptureTime ? configurationItem.tags : {};

    const compliance = isS3 && tags && tags.Confidential === 'true' ? 'NON_COMPLIANT' : 'COMPLIANT';

    return {
        compliance_type: compliance,
        annotation: 'Bucket missing required Confidential=true tag.'
    };
};
