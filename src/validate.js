const validate = (values) => {
  const errors = {};

  const sharePecentageValues =
    values &&
    values.spendConfig &&
    Object.values(values.spendConfig).map((value) => {
      return value.share;
    });

  const checkForSharePercentage = (value) =>
    new RegExp(/^[0-9%]+$/).test(value);

  const validShareInput =
    sharePecentageValues &&
    sharePecentageValues
      .map((element) => (new RegExp(/[A-Za-z]/).test(element) ? 1 : 0))
      .reduce((a, c) => a + c, 0);

  const sharePercentage =
    sharePecentageValues &&
    sharePecentageValues
      .map((element) => {
        if (checkForSharePercentage(element)) {
          return element.replace('%', '');
        }
        return 0;
      })
      .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur));

  if (!sharePercentage) {
    errors.spendConfig = 'Required';
  } else if (validShareInput > 0) {
    errors.spendConfig = 'Only Numbers & % are allowed';
  } else if (sharePercentage !== 100) {
    errors.spendConfig = 'The value must be 100%';
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
