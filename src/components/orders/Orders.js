import React, { useEffect, useState } from "react";
import axios from "axios";

import { MDBBtn, MDBContainer, MDBIcon } from "mdbreact";

import CreateOrder from "./OrdersForm";
import GetOrderList from "./OrdersList";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [suppliers, setSuppliers] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const [modal, setModal] = useState(false);

  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    getOrdersList();
    getCustomers();
    getSuppliers();
  }, [updateList]);

  function toggleUpdateList() {
    setCustomerId("");
    setVehicleId("");
    setUpdateList(!updateList);
  }
  // GET ORDER LIST
  async function getOrdersList() {
    const res = await axios.get("http://localhost:3001/orders");
    let data = res.data.orders;
    console.log(data);
    setOrders(data);
  }

  // GET CUSTOMER LIST
  async function getCustomers() {
    const res = await axios.get("http://localhost:3001/clients");
    const data = res.data.response;

    setCustomers(data);
  }

  // GET SUPPLIER LIST
  async function getSuppliers() {
    const res = await axios.get("http://localhost:3001/suppliers");
    const data = res.data.response;
    setSuppliers(data);
  }
  function toggle() {
    setModal(!modal);
  }

  const handleCustomerIdChange = (e) => {
    setCustomerId(e.target.value);
  };

  const handelVehicleIdChange = (e) => {
    setVehicleId(e.target.value);
  };

  return (
    <MDBContainer className="mt-5">
      <MDBContainer className="d-flex flex-column align-items-center mb-3 ">
        <MDBIcon size="5x" icon="shopping-basket" />
        <div>
          <h1>Orders</h1>
        </div>
      </MDBContainer>
      <MDBBtn color="success" onClick={toggle}>
        Crate Order
      </MDBBtn>
      <CreateOrder
        onCustomerIdChange={handleCustomerIdChange}
        onVehicleIdChange={handelVehicleIdChange}
        customerId={customerId}
        vehicleId={vehicleId}
        customers={customers}
        suppliers={suppliers}
        modal={modal}
        toggle={toggle}
        toggleUpdate={toggleUpdateList}
      />
      <GetOrderList toggleUpdate={toggleUpdateList} orders={orders} />
    </MDBContainer>
  );
}

export default Orders;
