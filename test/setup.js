require('@babel/register')({
  extends: './.babelrc',
  plugins: [ '@babel/plugin-proposal-class-properties' ],
  presets: [ '@babel/env', '@babel/preset-react' ]
});

require('browser-env')();

const Adapter = require('enzyme-adapter-react-16');
const { configure } = require('enzyme');

configure({ adapter: new Adapter() });
