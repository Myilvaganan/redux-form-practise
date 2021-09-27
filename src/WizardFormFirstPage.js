import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';

const WizardFormFirstPage = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="spendConfig.marketplace.share"
        type="text"
        component={renderField}
      />
      <Field
        name="spendConfig.amazonpay.share"
        type="text"
        component={renderField}
      />
      <Field
        name="spendConfig.brand.share"
        type="text"
        component={renderField}
      />
      <Field
        name="spendConfig.bank.share"
        type="text"
        component={renderField}
      />
      <Field
        name="spendConfig.market.share"
        type="text"
        component={renderField}
      />
      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage);
