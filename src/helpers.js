export const isValidLabelOrValue = value =>
  /string|boolean|number/.test(typeof value);

export const getOptionLabel = (option, label = option) => {
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
    const match = option.items.filter(item => item.value === value);
    if (match.length) {
      return match[0];
    }
  } else if (
    isValidLabelOrValue(option.value)
      && getOptionValue(option) === value) {
    return option;
  }

  return optionValue;
};

export const parseOptionsValue = (options, value) => {
  if (typeof value === 'string') {
    for (let i = options.length, optionValue; i--;) {
      optionValue = parseOptionValue(options[i], value);

      if (optionValue !== null) {
        return optionValue;
      }
    }
  }

  return value;
};
