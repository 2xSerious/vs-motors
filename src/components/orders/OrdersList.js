import React, { useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
} from "mdbreact";
import axios from "axios";
import PartModal from "./PartModal";
import { confirmAlert } from "react-confirm-alert";
export default function GetOrderList(props) {
  const [modal, setModal] = useState(false);
  const [parts, setParts] = useState([]);
  const [orderID, setOrderID] = useState("");

  function toggleModal() {
    setModal(!modal);
  }

  async function getPartsList(id) {
    let res = await axios.get(`http://localhost:3001/parts/order/${id}`);
    let data = res.data.parts;
    console.log(data);
    setParts(data);
  }
  async function deleteOrderById(id) {
    let res = await axios.delete(`http://localhost:3001/orders/${id}`);
    console.log(res);
    props.toggleUpdate();
  }
  function handleModal(e) {
    let id = e.currentTarget.getAttribute("data-rowid");
    toggleModal();
    getPartsList(id);
    setOrderID(id);
  }

  function handleDelete(e) {
    let id = e.currentTarget.getAttribute("data-rowid");
    confirmAlert({
      title: "Delete",
      message: "Delete this order?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            deleteOrderById(id);
          },
        },
        {
          label: "Cancel",
          onClick: () => {
            return;
          },
        },
      ],
    });
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
                <tr key={e.orderID + "-" + e.customerID} id={e.orderID}>
                  <td>{e.orderID}</td>
                  <td>{e.created_at}</td>
                  <td>
                    <MDBIcon
                      far
                      icon="list-alt"
                      data-rowid={e.orderID}
                      onClick={handleModal}
                    />
                  </td>
                  <td>
                    {e.make} {e.model} {e.reg_num}
                  </td>
                  <td>{e.c_name}</td>
                  <td>
                    £{e.total} / vat £{e.total_vat}
                  </td>
                  <td>
                    <MDBIcon
                      icon="trash"
                      data-rowid={e.orderID}
                      onClick={handleDelete}
                    />
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
        <PartModal
          modal={modal}
          toggleModal={toggleModal}
          orderId={orderID}
          parts={parts}
          partsList={getPartsList}
        />
      </MDBContainer>
    );
  } else {
    return <div>Loading...</div>;
  }
}
