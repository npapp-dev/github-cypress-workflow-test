const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  //1) Get some input values
  const bucket = core.getInput('bucket', {required: true});
  const bucketRegion = core.getInput('bucket', {required: true})
  const distFolder = core.getInput('dist-folder', {required: true})

  //2) Upload files
  //--endpoint-url=http://aws-bucket-github-actions.s3-website.eu-central-1.amazonaws.com
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);
  core.notice('Hello from my custom JavaScript action');
  const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`;


  core.setOutput('website-url', websiteUrl) //:set-output
}

run();
