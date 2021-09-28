import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span id="validateError">{error}</span> : false;

const SpendConfig = (props) => {
  return (
    <div>
      <div>Spend Configuration</div>
      <Field name="spendConfig" component={renderError} />
    </div>
  );
};

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SpendConfig);
