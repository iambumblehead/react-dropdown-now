const load = require('@commitlint/load').default;
const lint = require('@commitlint/lint').default;

module.exports = (message) =>
  Promise.all([load()]).then((tasks) => {
    const [{ rules, parserPreset }] = tasks;
    return lint(
      message,
      rules,
      parserPreset ? { parserOpts: parserPreset.parserOpts } : {},
    );
  });
