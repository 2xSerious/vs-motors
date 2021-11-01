import { useState } from "react";

import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateVehicle from "./VehicleUpdate";

export default function GetVehicleList(props) {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [customer, setCustomer] = useState("");

  const handler = (e) => {
    let value = e.currentTarget.getAttribute("data-rowid");
    let client = e.currentTarget.getAttribute("data-customer");

    setId(value);
    setCustomer(client);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  if (props.vehicles) {
    let counter = 0;
    return (
      <MDBContainer className="mt-5">
        <MDBTable hover responsive>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Reg Number</th>
              <th>Owner</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {props.vehicles.map((e) => {
              return (
                <tr
                  key={e.id}
                  data-customer={e.c_name}
                  data-rowid={e.id}
                  onClick={handler}
                >
                  <td>{(counter += 1)}</td>
                  <td>{e.make}</td>
                  <td>{e.model}</td>
                  <td>{e.year}</td>
                  <td>{e.reg_num}</td>
                  <td>{e.c_name}</td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
        <UpdateVehicle
          handleSubmit={props.handleSubmit}
          forId={id}
          modal={modal}
          toggle={toggle}
          c_name={customer}
        />
      </MDBContainer>
    );
  } else {
    return <div>Loading...</div>;
  }
}
