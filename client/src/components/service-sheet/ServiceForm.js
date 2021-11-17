import React, { useState, useEffect } from "react";
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

import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import { MenuItem, InputAdornment, TextField, Box } from "@mui/material";
import axios from "axios";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandsGroupStyle="thousand"
      thousandSeparator
    />
  );
});

function CreateService({ toggle, isModal, refresh }) {
  const url = host.url;
  const [date, setDate] = useState(new Date());
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
      let filter = data.filter((el) => el.status !== "closed");
      setOrders(filter);
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
    console.log(service);
    let createDate = date.toISOString().split("T")[0];
    let post = await axios.post(`${url}/services`, {
      date: createDate,
      orderId: orderID,
      odometer: service.odometer,
      description: service.description,
      work: service.work,
      workerId: service.workerId,
      paidStatus: 0,
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
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "20ch" },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={date}
                  inputFormat="d/M/y"
                  onChange={(newValue) => {
                    setDate(newValue);
                    console.log(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>

              <TextField
                id="order-select"
                select
                label="Order"
                value={orderID}
                onChange={handleOrderId}
                size="small"
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
                  <MenuItem value="0">Loading</MenuItem>
                )}
              </TextField>

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
              <TextField
                label="Miles"
                value={service.odometer}
                onChange={handleOdometer}
                size="small"
                id="odometer-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  endAdornment: (
                    <InputAdornment position="end">
                      <strong>miles</strong>
                    </InputAdornment>
                  ),
                }}
              />

              {/* <FormControl>
                <InputLabel htmlFor="odometer">Odometer</InputLabel>
                <NumberFormat
                  customInput={Input}
                  thousandsGroupStyle="thousand"
                  thousandSeparator={true}
                  id="odometer"
                  value={service.odometer}
                  onChange={handleOdometer}
                  endAdornment={
                    <InputAdornment position="end">
                      <strong>miles</strong>
                    </InputAdornment>
                  }
                />
                <FormHelperText>Required*</FormHelperText>
              </FormControl> */}

              <TextField
                id="order-select"
                select
                label="Serviced by"
                value={service.workerId}
                onChange={handleWorkerId}
                size="small"
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
                  <MenuItem value="0">Loading</MenuItem>
                )}
              </TextField>

              <TextField
                id="work-value"
                label="Work"
                variant="outlined"
                size="small"
                value={service.work}
                onChange={handleWork}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <strong>£</strong>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="service-description"
                label="Description"
                variant="outlined"
                size="small"
                value={service.description}
                onChange={handleDescription}
                required
              />
            </Box>
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
