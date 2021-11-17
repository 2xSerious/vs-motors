import axios from "axios";
import { host } from "../host";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
} from "mdbreact";
import { confirmAlert } from "react-confirm-alert";

export default function GetSupplierList(props) {
  const url = host.url;
  async function deleteSupplier(id) {
    await axios.delete(`${url}}/suppliers/${id}`);
    props.handleSubmit();
  }

  function handleDelete(id) {
    confirmAlert({
      title: "Delete",
      message: "Delete this record?",
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
