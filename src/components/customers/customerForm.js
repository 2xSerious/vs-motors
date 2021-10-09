import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

const CreateClient = (props) => {
  return (
    <MDBContainer>
      <form className="needs-validation" onSubmit={props.onSubmit} noValidate>
        <MDBRow>
          <MDBCol md="4">
            <MDBInput
              className="form-control"
              value={props.name}
              name="full-name"
              onChange={props.onNameChange}
              type="text"
              id="formBasicName"
              label="Customer Name"
              required
            >
              <div className="valid-feedback">Looks Good!</div>
              <div className="invalid-feedback">Required*</div>
            </MDBInput>
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              className="form-control"
              value={props.phone}
              name="phone"
              onChange={props.onPhoneChange}
              type="text"
              pattern="[0-9]*"
              maxLength="10"
              id="formBasicPhone"
              label="Phone number"
            >
              <div className="valid-feedback">Looks Good!</div>
              <div className="invalid-feedback">Use numbers only!</div>
            </MDBInput>
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              className="form-control"
              value={props.email}
              name="email"
              onChange={props.onEmailChange}
              type="email"
              id="formBasicEmail"
              label="Email"
            >
              <div className="valid-feedback">Looks Good!</div>
              <div className="invalid-feedback">"example@example.com"</div>
            </MDBInput>
          </MDBCol>
        </MDBRow>
        <MDBBtn color="success" type="submit">
          Add
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default CreateClient;
