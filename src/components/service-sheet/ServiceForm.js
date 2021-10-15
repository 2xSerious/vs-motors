import React, { useState, useEffect } from "react";

import {
  MDBContainer,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdbreact";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

function CreateService({ toggle, isModal }) {
  const [orders, setOrders] = useState("");
  const [orderID, setOrderID] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    let res = await axios.get("http://localhost:3001/orders");
    let data = res.data.orders;
    setOrders(data);
    console.log(data);
  }

  // HANDLE ORDERS SELECT

  function handleOrderId(e) {
    let val = e.target.value;
    if (val) {
      setOrderID(val);
    }
  }
  return (
    <MDBContainer>
      <MDBModal isOpen={isModal}>
        <MDBModalHeader toggle={toggle}>Service</MDBModalHeader>
        <MDBModalBody>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="order-select">Order</InputLabel>
            <Select
              id="order-select"
              label="Order"
              value={orderID}
              onChange={handleOrderId}
            >
              {orders ? (
                orders.map((e) => {
                  return (
                    <MenuItem key={e.orderID} value={e.orderID}>
                      {e.orderID} - {e.make} {e.model} {e.reg_num}
                    </MenuItem>
                  );
                })
              ) : (
                <div>Loading...</div>
              )}
            </Select>
          </FormControl>
          {orders ? (
            orders.forEach((e) => {
              if (e.orderID === orderID) {
                <div>
                  <span>e.c_name</span>
                </div>;
              }
            })
          ) : (
            <div> Loading... </div>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="success">Create</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}

export default CreateService;
