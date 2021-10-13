import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

const CreateWorker = (props) => {
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
              id="formWorkerName"
              label="Worker Name"
              required
            >
              <div className="valid-feedback">Looks Good!</div>
              <div className="invalid-feedback">
                Please provide a Worker Name!
              </div>
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

export default CreateWorker;
