const load = require('@commitlint/load');
const lint = require('@commitlint/lint');

module.exports = message =>
  Promise.all([load()]).then(tasks => {
    const [{ rules, parserPreset }] = tasks;
    return lint(
      message,
      rules,
      parserPreset ? { parserOpts: parserPreset.parserOpts } : {},
    );
  });
