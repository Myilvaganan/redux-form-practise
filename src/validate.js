const validate = (values) => {
  const errors = {};

  const checkForSharePercentage = (value) =>
    new RegExp(/^[0-9%]+$/).test(value);

  const checkForAlphabet = (value) => new RegExp(/[A-Za-z]/).test(value);

  const sharePercentageValuesArray =
    values &&
    values.spendConfig &&
    Object.values(values.spendConfig).map((value) => {
      return value.share;
    });

  const checkAllValuesAreNonAlphabets =
    sharePercentageValuesArray &&
    sharePercentageValuesArray
      .map((element) => {
        if (checkForAlphabet(element)) {
          return 1;
        } else {
          return 0;
        }
      })
      .reduce((a, c) => a + c, 0);

  const sumOfTotalShareInPercentage =
    sharePercentageValuesArray &&
    sharePercentageValuesArray
      .map((element) => {
        if (checkForSharePercentage(element)) {
          return element.replace('%', '');
        }
        return 0;
      })
      .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur));

  if (!sumOfTotalShareInPercentage) {
    errors.spendConfig = 'Required';
  } else if (checkAllValuesAreNonAlphabets > 0) {
    errors.spendConfig = 'Only Numbers and  % are allowed';
  } else if (sumOfTotalShareInPercentage !== 100) {
    errors.spendConfig = 'The sum of shares should be 100%';
  }

  /* ========================================== */

  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.sex) {
    errors.sex = 'Required';
  }
  if (!values.favoriteColor) {
    errors.favoriteColor = 'Required';
  }

  return errors;
};

export default validate;
