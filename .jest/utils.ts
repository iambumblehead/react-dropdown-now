const { queryHelpers } = require('@testing-library/dom');

export const queryByAttr = (attr: string) =>
  queryHelpers.queryByAttribute.bind(null, attr);
export const queryAllByAttr = (attr: string) =>
  queryHelpers.queryAllByAttribute.bind(null, attr);

  export const castElement = (node: Node): Element => {
    return node as Element
  }

