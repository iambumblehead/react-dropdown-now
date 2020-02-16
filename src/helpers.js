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

export const parseValue = (value, options) => {
  let option;

  if (typeof value === 'string') {
    for (let i = 0, num = options.length; i < num; i++) {
      if (options[i].type === 'group') {
        const match = options[i].items.filter(item => item.value === value);
        if (match.length) {
          [ option ] = match;
        }
      } else if (
        typeof options[i].value !== 'undefined' &&
        options[i].value === value
      ) {
        option = options[i];
      }
    }
  }

  return option || value;
};
