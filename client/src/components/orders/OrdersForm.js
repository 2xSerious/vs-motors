import { useState, useEffect } from "react";
import { host } from "../host";
import {
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import OrderPartList from "./orderPartlist";
import { InputAdornment, MenuItem, TextField, Box } from "@mui/material";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import axios from "axios";

const CreateOrder = (props) => {
  const [vehicles, setVehicles] = useState([]);

  const [part, setPart] = useState({
    date: new Date(),
    partName: "",
    quantity: 1,
    partValue: "",
    partValueVat: "",
    supplierId: "",
    supplierName: "",
  });

  const [parts, setParts] = useState([]);
  const status = "open";
  const url = host.url;
  let id = props.customerId;

  useEffect(() => {
    if (id) {
      async function getVehicles() {
        const res = await axios.get(`${url}/vehicles/customer/${id}`);
        const data = res.data.response;
        console.log(data);
        setVehicles(data);
      }
      getVehicles();
    }
  }, [url, id]);

  // GET VEHICLES BY CUSTOMER ID

  function addToPartList() {
    if (!part.partName || !part.partValue) {
      return;
    }

    setParts((prev) => [...prev, part]);
    setPart((prev) => ({ ...prev, partName: "", quantity: 1, partValue: "" }));
  }
  function removeFromPartList(e) {
    let name = e.target.getAttribute("name");
    setParts(parts.filter((item) => item.partName !== name));
  }

  // HANDLERS

  function handleSupplierChange(e, index) {
    const id = e.target.value;
    const name = index.props.text;
    setPart((prev) => ({ ...prev, supplierId: id, supplierName: name }));
  }
  const handlePartNameChange = (e) => {
    const part = e.target.value;
    if (part) {
      setPart((prev) => ({ ...prev, partName: part }));
    }
  };
  const handlePartValueChange = (e) => {
    const vRegex = /^\d+\.?\d{0,2}$/;
    const cost = e.target.value;
    if (!cost || vRegex.test(cost)) {
      setPart((prev) => ({
        ...prev,
        partValue: cost,
        partValueVat: cost * 1.2,
      }));
    } else {
      return;
    }
  };
  function handleQuantity(e) {
    setPart((prev) => ({ ...prev, quantity: e.target.value }));
  }
  function createdAtDate() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAt = `${yyyy}-${mm}-${dd}`;
    return createdAt;
  }
  //HANDLE SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    postOrder();
  };

  // POST THE ORDER
  async function postOrder() {
    let d = createdAtDate();
    try {
      let res = await axios.post(`${url}/orders`, {
        date: d,
        vehicleId: props.vehicleId,
        status: status,
      });
      if (res.statusText === "Created") {
        let response = await axios.get(`${url}/orders`);
        let orders = response.data.orders;
        let orderId = orders[orders.length - 1];
        let lastId = orderId.orderID;
        console.log(lastId);
        let newParts = [];
        parts.forEach((p) => {
          let st = Object.assign(p, { orderId: lastId });
          newParts.push(st);
        });

        setParts(newParts);
        postParts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // POST PARTS LIST - CREATE ORDER COMPONENT
  async function postParts() {
    let payload = {
      parts: [],
    };
    try {
      parts.forEach((element) => {
        payload.parts.push(element);
      });
      let res = await axios.post(`${url}/parts`, payload);
      if (res.status === 200) {
        setPart({
          partName: "",
          quantity: 1,
          partValue: "",
          partValueVat: "",
          supplierId: "",
        }); // IF PARTS ADDED, RESET
        setParts([]); // IF PARTS ADDED, RESET
        props.toggleUpdate();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MDBContainer className="mt-5">
      <MDBModal
        isOpen={props.modal}
        size="lg"
        toggle={props.toggle}
        backdrop={false}
      >
        <MDBModalHeader toggle={props.toggle}>Create Order</MDBModalHeader>
        <MDBModalBody>
          <form
            className="need-validation"
            id="create-order"
            onSubmit={onSubmit}
            noValidate
          >
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "20ch" },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={part.date}
                  inputFormat="d/M/y"
                  onChange={(newValue) => {
                    setPart((prev) => ({ ...prev, date: newValue }));
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                />
              </LocalizationProvider>

              <TextField
                id="customer-select"
                select
                label="Customer"
                value={props.customerId}
                onChange={props.onCustomerIdChange}
                size="small"
              >
                {props.customers ? (
                  props.customers.map((e) => {
                    return (
                      <MenuItem key={e.id + "-" + e.c_name} value={e.id}>
                        {e.c_name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value="0">Loading</MenuItem>
                )}
              </TextField>

              <TextField
                id="vehicle-select"
                select
                label="Vehicle"
                value={props.vehicleId}
                onChange={props.onVehicleIdChange}
                size="small"
              >
                {vehicles ? (
                  vehicles.map((e) => {
                    return (
                      <MenuItem key={e.id} value={e.id}>
                        {e.make} {e.model} {e.reg_num}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value="0">Loading</MenuItem>
                )}
              </TextField>
            </Box>
            <hr />
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "18ch" },
              }}
            >
              <TextField
                id="supplier-select"
                select
                label="Supplier"
                value={part.supplierId}
                onChange={handleSupplierChange}
                size="small"
              >
                {props.suppliers ? (
                  props.suppliers.map((e) => {
                    return (
                      <MenuItem key={e.id} value={e.id} text={e.s_name}>
                        {e.s_name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value="0">Loading</MenuItem>
                )}
              </TextField>
              <TextField
                id="part"
                label="Part"
                variant="outlined"
                size="small"
                value={part.partName}
                onChange={handlePartNameChange}
                required
              />

              <TextField
                id="part-quantity"
                label="Quantity"
                variant="outlined"
                size="small"
                value={part.quantity}
                onChange={handleQuantity}
                required
              />

              <TextField
                id="part-value"
                label="Value"
                variant="outlined"
                size="small"
                value={part.partValue}
                onChange={handlePartValueChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">£</InputAdornment>
                  ),
                }}
              />

              <MDBBtn
                className="mt-4"
                color="success"
                size="sm"
                onClick={addToPartList}
              >
                <MDBIcon icon="plus" /> Add
              </MDBBtn>
            </Box>
          </form>
          {parts ? (
            <OrderPartList onRemove={removeFromPartList} parts={parts} />
          ) : (
            ""
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={props.toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" form="create-order" type="submit">
            Create
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default CreateOrder;
