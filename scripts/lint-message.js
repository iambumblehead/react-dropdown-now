const load = require('@commitlint/load');
const lint = require('@commitlint/lint');
const argv = require('yargs').argv;

Promise.all([load()])
  .then(tasks => {
    const [{ rules, parserPreset }] = tasks;
    return lint(
      argv.message,
      rules,
      parserPreset ? { parserOpts: parserPreset.parserOpts } : {},
    );
  })
  .then(result => {
    console.log(JSON.stringify(result, 0, 2));
    if (!result.valid) {
      process.exit(1);
    }
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
