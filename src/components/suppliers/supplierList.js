import React from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
} from "mdbreact";
import { confirmAlert } from "react-confirm-alert";

export default function GetSupplierList(props) {
  async function deleteSupplier(id) {
    await axios.delete(`https://vs-motors.herokuapp.com/suppliers/${id}`);
    props.handleSubmit();
  }

  function handleDelete(id) {
    confirmAlert({
      title: "Delete",
      message: "Delete supplier record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteSupplier(id);
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  }

  const handler = (e) => {
    let value = e.currentTarget.getAttribute("data-rowid");
    handleDelete(value);
  };

  if (props.suppliers) {
    let counter = 0;
    return (
      <MDBContainer className="mt-5">
        <MDBTable hover responsive>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {props.suppliers.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{(counter += 1)}</td>
                  <td>{e.s_name}</td>
                  <td>
                    <MDBIcon icon="trash" data-rowid={e.id} onClick={handler} />
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
