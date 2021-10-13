import React, { useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
} from "mdbreact";

export default function GetOrderList(props) {
  const [modal, setModal] = useState();

  function toggleModal() {
    setModal(!modal);
  }

  if (props.orders) {
    return (
      <MDBContainer className="mt-5">
        <MDBTable hover responsive>
          <MDBTableHead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Parts</th>
              <th>Vehicle</th>
              <th>Customer</th>
              <th>Total</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {props.orders.map((e) => {
              return (
                <tr key={(e.orderID, e.customerID)} id={e.orderID}>
                  <td>{e.orderID}</td>
                  <td>{e.created_at}</td>
                  <td>
                    <MDBIcon far icon="list-alt" data-rowid={e.orderID} />
                  </td>
                  <td>
                    {e.make} {e.model} {e.reg_num}
                  </td>
                  <td>{e.c_name}</td>
                  <td>
                    £{e.total} / vat £{e.total_vat}
                  </td>
                  <td>
                    <MDBIcon icon="trash" data-rowid={e.orderID} />
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    );
  } else {
    return <div>Loading...</div>;
  }
}
