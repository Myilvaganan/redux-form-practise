import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";
import renderField from "./renderField";

const WizardFormFirstPage = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="fundingPartnerDetails[0].share"
        type="text"
        component={renderField}
      />
      <Field
        name="fundingPartnerDetails[1]share"
        type="text"
        component={renderField}
      />
      <Field
        name="fundingPartnerDetails[2].share"
        type="text"
        component={renderField}
      />
      <Field
        name="fundingPartnerDetails[3].share"
        type="text"
        component={renderField}
      />
      <Field
        name="fundingPartnerDetails[4].share"
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
  form: "wizard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  initialValues: getInitialValues()
})(WizardFormFirstPage);

function getInitialValues() {
  const data = {
    fundingPartnerDetails: [
      {
        share: ""
      },
      {
        share: ""
      },
      {
        share: ""
      },
      {
        share: ""
      },
      {
        share: ""
      }
    ]
  };

  return data;
}
