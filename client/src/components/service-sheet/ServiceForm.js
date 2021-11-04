import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { host } from "../host";
import {
  MDBContainer,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdbreact";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import axios from "axios";

function CreateService({ toggle, isModal, refresh }) {
  const url = host.url;
  const [orders, setOrders] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [orderID, setOrderID] = useState("");
  const [index, setIndex] = useState(0);
  const [service, setService] = useState({
    odometer: "",
    description: "",
    work: "",
    workerId: "",
  });

  useEffect(() => {
    async function getOrders() {
      let res = await axios.get(`${url}/orders`);
      let data = res.data.orders;
      setOrders(data);
    }
    async function getWorkers() {
      let res = await axios.get(`${url}/workers`);
      let data = res.data.response;
      setWorkers(data);
    }
    getOrders();
    getWorkers();
  }, [url]);

  // HANDLE ORDERS SELECT

  function handleOrderId(e) {
    let val = e.target.value;

    if (val) {
      setOrderID(val);
      var ind = orders.findIndex((p) => p.orderID === val);
      setIndex(ind);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    postService().then(refresh());
    clearForm();
  }

  // Prepare post
  async function postService() {
    let post = await axios.post(`${url}/services`, {
      date: new Date(),
      orderId: orderID,
      odometer: service.odometer,
      description: service.description,
      work: service.work,
      workerId: service.workerId,
    });
    console.log(post);
  }

  // Handle Odometer Input
  function handleOdometer(e) {
    setService((prev) => ({ ...prev, odometer: e.target.value }));
  }
  // Handle Description Input
  function handleDescription(e) {
    setService((prev) => ({ ...prev, description: e.target.value }));
  }

  // Handle Work Input
  function handleWork(e) {
    setService((prev) => ({ ...prev, work: e.target.value }));
  }

  // Handle Worker ID Input
  function handleWorkerId(e) {
    setService((prev) => ({ ...prev, workerId: e.target.value }));
  }

  function clearForm() {
    setService({
      odometer: "",
      description: "",
      work: "",
      workerId: "",
    });
  }
  return (
    <MDBContainer>
      <MDBModal isOpen={isModal}>
        <MDBModalHeader toggle={toggle}>Service</MDBModalHeader>
        <MDBModalBody>
          <form id="service-form" onSubmit={handleSubmit}>
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
                        #{e.orderID} - {e.make} {e.model} {e.reg_num}
                      </MenuItem>
                    );
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </Select>
            </FormControl>
            {orderID ? (
              <div className="d-flex justify-content-between">
                <span>Customer: {orders[index].c_name}</span>
                <span>
                  Total parts: <strong>£{orders[index].total_vat}</strong>
                </span>
              </div>
            ) : (
              <div>None</div>
            )}

            <hr />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 20 }}>
              <InputLabel htmlFor="odometer">Odometer</InputLabel>
              <NumberFormat
                customInput={Input}
                thousandsGroupStyle="thousand"
                thousandSeparator={true}
                id="odometer"
                label="Odometer"
                variant="standard"
                value={service.odometer}
                onChange={handleOdometer}
                endAdornment={
                  <InputAdornment position="end">
                    <strong>miles</strong>
                  </InputAdornment>
                }
              />
              <FormHelperText>Required*</FormHelperText>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="service-worker">Serviced by</InputLabel>
              <Select
                id="service-worker"
                label="Serviced by"
                value={service.workerId}
                onChange={handleWorkerId}
              >
                {workers ? (
                  workers.map((e) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>
                        {e.w_name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
              <InputLabel htmlFor="work-cost">Work</InputLabel>
              <Input
                id="work-cost"
                label="Work"
                variant="standard"
                value={service.work}
                onChange={handleWork}
                startAdornment={
                  <InputAdornment position="start">
                    <strong>£</strong>
                  </InputAdornment>
                }
              />
              <FormHelperText>Required*</FormHelperText>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
              <InputLabel htmlFor="service-description">Description</InputLabel>
              <Input
                id="service-description"
                label="Description"
                variant="standard"
                value={service.description}
                onChange={handleDescription}
              />
            </FormControl>
          </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="success" type="submit" form="service-form">
            Create
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}

export default CreateService;
