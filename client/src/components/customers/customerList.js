import { useState } from "react";

import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateCustomer from "./customerUpdate";

export default function GetClientList(props) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  const handler = (e) => {
    let value = e.currentTarget.getAttribute("data-rowid");
    console.log(value);
    setId(value);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  function handlerRefresh() {
    props.handleSubmit();
    console.log("call");
  }

  if (props.customers.length > 0) {
    let counter = 0;
    return (
      <MDBContainer className="mt-5">
        <MDBTable hover responsive>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {props.customers.map((e) => {
              return (
                <tr key={(e.id, e.c_name)} data-rowid={e.id} onClick={handler}>
                  <td>{(counter += 1)}</td>
                  <td>{e.c_name}</td>
                  <td>{e.phone}</td>
                  <td>{e.email}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
        <UpdateCustomer
          handleSubmit={handlerRefresh}
          forId={id}
          modal={modal}
          toggle={toggle}
        />
      </MDBContainer>
    );
  } else {
    return <div>Loading...</div>;
  }
}
