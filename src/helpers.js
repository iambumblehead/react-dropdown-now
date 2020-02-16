export const isValidLabelOrValue = value => (
  /string|boolean|number/.test(typeof value));

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
