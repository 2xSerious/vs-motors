import { useEffect, useState } from "react";
import { host } from "../host";
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
  const [orders, setOrders] = useState([]);
  const update = props.update;
  const url = host.url;

  useEffect(() => {
    // GET ORDER LIST
    async function getOrdersList() {
      const res = await axios.get(`${url}/orders/open`);
      let data = res.data.orders;
      console.log(data);
      setOrders(data);
    }
    getOrdersList();
  }, [url, parts, update]);
  function toggleModal() {
    setModal(!modal);
  }

  async function getPartsList(id) {
    let res = await axios.get(`${url}/parts/order/${id}`);
    let data = res.data.parts;
    console.log(data);
    setParts(data);
  }
  async function deleteOrderById(id) {
    await axios.delete(`${url}/orders/${id}`);
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

  if (orders) {
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
            {orders.map((e) => {
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
                    ??{e.total} / vat ??{e.total_vat}
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
