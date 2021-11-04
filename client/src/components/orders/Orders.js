import { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../host";
import { MDBBtn, MDBContainer, MDBIcon } from "mdbreact";

import CreateOrder from "./OrdersForm";
import GetOrderList from "./OrdersList";

function Orders() {
  const [customers, setCustomers] = useState([]);

  const [suppliers, setSuppliers] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const [modal, setModal] = useState(false);

  const [updateList, setUpdateList] = useState(false);
  const url = host.url;

  useEffect(() => {
    async function getCustomers() {
      const res = await axios.get(`${url}/clients`);
      const data = res.data.response;

      setCustomers(data);
    }
    async function getSuppliers() {
      const res = await axios.get(`${url}/suppliers`);
      const data = res.data.response;
      setSuppliers(data);
    }

    getCustomers();
    getSuppliers();
  }, [url, updateList]);

  function toggleUpdateList() {
    setCustomerId("");
    setVehicleId("");
    setUpdateList(!updateList);
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
      <GetOrderList toggleUpdate={toggleUpdateList} update={updateList} />
    </MDBContainer>
  );
}

export default Orders;
