const { queryHelpers } = require('@testing-library/dom');

export const queryByAttr = (attr) =>
  queryHelpers.queryByAttribute.bind(null, attr);
export const queryAllByAttr = (attr) =>
  queryHelpers.queryAllByAttribute.bind(null, attr);

