const core = require('@actions/core');
const github = require('@actions/github');
const { get } = require('lodash');
const lint = require('./lint-message');

async function run() {
  try {
    const title = get(github, 'context.payload.pull_request.title');

    core.info(`Checking the PR title: "${title}"`);
    const result = await lint(title);
    core.info(JSON.stringify(result, null, 2));

    if (!result.valid) {
      core.setFailed('Please fix your PR title');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
