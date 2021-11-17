import { useEffect } from "react";

import { MDBContainer, MDBDataTableV5 } from "mdbreact";
import UpdateCustomer from "./customerUpdate";

export default function GetClientList(props) {
  useEffect(() => {});

  function handlerRefresh() {
    props.handleSubmit();
    console.log("call");
  }

  if (props.customers.rows.length > 0) {
    return (
      <MDBContainer className="mt-5">
        <MDBDataTableV5
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={props.customers}
          searchTop
          searchBottom={false}
        />

        <UpdateCustomer
          handleSubmit={handlerRefresh}
          forId={props.id}
          modal={props.modal}
          toggle={props.toggle}
        />
      </MDBContainer>
    );
  } else {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <div className="spinner-border " role="status">
          <span className="sr-only ">Loading...</span>
        </div>
      </div>
    );
  }
}
