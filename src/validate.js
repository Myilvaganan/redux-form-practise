const isPositiveFloat = (value) =>
  new RegExp(/^([0-9]+(\.[0-9]+)?|\.[0-9]+)$/).test(value);

const validate = (values) => {
  const errors = {};

  // if (!values.fundingPartnerDetails) {
  //   errors.spendConfig = "Share percentage is required";
  // } else {
  errors.spendConfig = sharePercentageValidation(values.fundingPartnerDetails);
  // }

  /* ========================================== */

  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.sex) {
    errors.sex = "Required";
  }
  if (!values.favoriteColor) {
    errors.favoriteColor = "Required";
  }

  return errors;
};

const sharePercentageValidation = (values) => {
  let isPositiveFloatValue = true;
  let isShareValue = false;

  const sumOfTotalSharePercentage =
    values &&
    Object.values(values)
      .map((inputValue) => {
        if (inputValue.share) {
          isShareValue = true;
        }
        return inputValue.share;
      })
      .map((sharePercentageValue) => {
        if (isPositiveFloat(sharePercentageValue)) {
          return sharePercentageValue;
        } else {
          isPositiveFloatValue = false;
          return 0;
        }
      })
      .reduce((acc, cur) => parseFloat(acc) + parseFloat(cur), 0);
  if (!values || !isShareValue) {
    return "Share percentage is required";
  } else if (!isPositiveFloatValue) {
    return "Only Positive Float values are allowed";
  } else if (sumOfTotalSharePercentage !== 100) {
    return "The sum of shares should be 100";
  }
};

export default validate;
