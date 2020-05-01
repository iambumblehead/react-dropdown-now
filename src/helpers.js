import isPlainObject from 'lodash/isPlainObject';
import get from 'lodash/get';
import pick from 'lodash/pick';
import flatten from 'lodash/flatten';
import { ITEM_TYPE, OPTION_PROPS } from './constants';

export const isValidLabelOrValue = (value) =>
  /string|boolean|number/.test(typeof value);

export const isNullOrUndefined = (value) => /null|undefined/.test(typeof value);

export const getOptionDisplay = (option, label = option) => {
  if (isNullOrUndefined(option)) {
    return option;
  }

  if (option.view) {
    return option.view;
  }

  if (isValidLabelOrValue(option.label)) {
    return option.label;
  }

  if (isValidLabelOrValue(option.value)) {
    return option.value;
  }

  return label;
};

const isGroup = (option) => {
  return Array.isArray(get(option, 'items'));
};

const prepareOption = (option, index) => {
  const opt = pick(option, OPTION_PROPS);
  return {
    index,
    id: opt.id || opt.value,
    type: ITEM_TYPE.OPTION,
    option: {
      ...opt,
      id: opt.id || opt.value,
      label: opt.label || opt.value,
    },
  };
};

const prepareGroup = (option, startIndex = 0) => {
  const options = option.items.map((opt, index) =>
    prepareOption(opt, startIndex + index),
  );
  return [{ label: option.name, type: ITEM_TYPE.LABEL }, ...options];
};

export const isValidNonObjectOption = (value) =>
  /string|number/.test(typeof value);

export const prepareOptions = (options) => {
  if (!Array.isArray(options)) {
    return [];
  }
  let count = 0;

  return options.reduce((accu, option) => {
    if (isGroup(option)) {
      const newValues = [...accu, prepareGroup(option, count)];
      count += option.items.length;
      return newValues;
    }

    if (isPlainObject(option)) {
      const newValues = [...accu, prepareOption(option, count)];
      count += 1;
      return newValues;
    }

    if (isValidNonObjectOption(option)) {
      const newValues = [
        ...accu,
        prepareOption({ value: option, label: option }, count),
      ];
      count += 1;
      return newValues;
    }

    return accu;
  }, []);
};

export const findSelected = (options, value, matcher) => {
  const filteredItems = flatten(options).filter(
    (item) => item.type === ITEM_TYPE.OPTION,
  );
  return filteredItems.find((option) => matcher(option, value));
};

export const defaultMatcher = (item, value) => {
  return item.option.value === value;
};
