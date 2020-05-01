import isPlainObject from 'lodash/isPlainObject';
import get from 'lodash/get';
import pick from 'lodash/pick';
import flatten from 'lodash/flatten';
import { ITEM_TYPE, OPTION_PROPS } from './constants';

export const isValidLabelOrValue = (value) =>
  /string|boolean|number/.test(typeof value);

export const isNullOrUndefined = (value) => /null|undefined/.test(typeof value);

export const getOptionName = (option) => option.name;

export const getOptionLabel = (option, label = option) => {
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

export const getOptionValue = (option, value = option) => {
  if (isValidLabelOrValue(option.value)) {
    return option.value;
  }

  if (isValidLabelOrValue(option.label)) {
    return option.label;
  }

  return value;
};

export const parseOptionValue = (option, value, optionValue = null) => {
  if (option.type === 'group') {
    const match = option.items.filter((item) => item.value === value);
    if (match.length) {
      return match[0];
    }
  } else if (
    isValidLabelOrValue(option.value) &&
    getOptionValue(option) === value
  ) {
    return option;
  }

  return optionValue;
};

export const parseOptionsValue = (options, value) => {
  if (typeof value === 'string') {
    for (let i = options.length, optionValue; i--; ) {
      optionValue = parseOptionValue(options[i], value);

      if (optionValue !== null) {
        return optionValue;
      }
    }
  }

  return value;
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
  const options = option.items.map((option, index) =>
    prepareOption(option, startIndex + index),
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
