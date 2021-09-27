import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const SpendConfig = (props) => {
  return (
    <div>
      <div>Spend Configuration</div>
      <Field name="spendConfig" component={renderError} />
    </div>
  );
};

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SpendConfig);
