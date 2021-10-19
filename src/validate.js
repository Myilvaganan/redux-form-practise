const isPositiveFloatRegex = (value) =>
  new RegExp(/^([0-9]+(\.[0-9]+)?|\.[0-9]+)$/).test(value);

const isFloat = (value) =>
  value && !(!isNaN(parseFloat(value)) && isFinite(value))
    ? "Only float " + "values are allowed."
    : undefined;
const isPositiveFloat = (value) =>
  !(isFloat(value) === undefined && parseFloat(value) >= 0)
    ? "Only positive" + " float values are allowed."
    : undefined;

const validate = (values) => {
  const errors = {};
  errors.spendConfig = sharePercentageValidation(values.fundingPartnerDetails);
  return errors;
};

const required = (value) => (value ? undefined : "Required");

const sharePercentageValidation = (values) => {
  let isSharePercentage = false;

  const sharePercentageValues =
    values &&
    values
      .filter(({ share }) => !required(share) && share)
      .map(({ share }) => {
        isSharePercentage = true;
        return share;
      });

  const sharePercentageFloatValues =
    sharePercentageValues &&
    sharePercentageValues
      .map((value) => !isPositiveFloat(value) && parseFloat(value))
      .filter((val) => val);

  const sumOfTotalSharePercentage =
    sharePercentageFloatValues &&
    sharePercentageFloatValues.reduce((acc, cur) => acc + cur, 0);

  if (!isSharePercentage) {
    return "Share percentage is required.";
  } else if (
    sharePercentageValues.length !== sharePercentageFloatValues.length
  ) {
    return "Only positive number values are allowed";
  } else if (sharePercentageValues && sumOfTotalSharePercentage !== 100) {
    return "The sum of shares should be 100.";
  }
};

export default validate;
