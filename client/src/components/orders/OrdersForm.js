import { useState, useEffect } from "react";
import { host } from "../host";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import OrderPartList from "./orderPartlist";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputAdornment, Input, FormHelperText } from "@mui/material";
import axios from "axios";

const CreateOrder = (props) => {
  const [vehicles, setVehicles] = useState([]);

  const [part, setPart] = useState({
    partName: "",
    quantity: 1,
    partValue: "",
    partValueVat: "",
    supplierId: "",
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

  const handleSupplierChange = (e) => {
    const id = e.target.value;
    setPart((prev) => ({ ...prev, supplierId: id }));
  };
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
      <MDBModal isOpen={props.modal} toggle={props.toggle} backdrop={false}>
        <MDBModalHeader toggle={props.toggle}>Create Order</MDBModalHeader>
        <MDBModalBody>
          <form
            className="need-validation"
            id="create-order"
            onSubmit={onSubmit}
            noValidate
          >
            <MDBRow>
              <MDBCol md="4">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="vehicle-year">Customer</InputLabel>
                  <Select
                    labelId="vehicle-year"
                    id="select-vehicle-year"
                    value={props.customerId}
                    onChange={props.onCustomerIdChange}
                    label="Customer"
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
                      <div>Loading...</div>
                    )}
                  </Select>
                </FormControl>
              </MDBCol>
              <MDBCol md="4">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="vehicle">Vehicle</InputLabel>
                  <Select
                    labelId="vehicle"
                    id="select-vehicle"
                    value={props.vehicleId}
                    onChange={props.onVehicleIdChange}
                    label="Vehicle"
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
                      <div>Loading...</div>
                    )}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol md="4">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="supplier">Supplier</InputLabel>
                  <Select
                    labelId="supplier"
                    id="select-supplier"
                    value={part.supplierId}
                    onChange={handleSupplierChange}
                    label="Supplier"
                  >
                    {props.suppliers ? (
                      props.suppliers.map((e) => {
                        return (
                          <MenuItem key={e.id} value={e.id}>
                            {e.s_name}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <div>Loading...</div>
                    )}
                  </Select>
                </FormControl>
              </MDBCol>
              <MDBCol>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="part">Part</InputLabel>
                  <Input
                    id="standard-basic"
                    label="Part"
                    variant="standard"
                    value={part.partName}
                    onChange={handlePartNameChange}
                  />
                  <FormHelperText>Required*</FormHelperText>
                </FormControl>
              </MDBCol>
              <MDBCol>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                  <InputLabel id="quantity">Quantity</InputLabel>
                  <Input
                    id="standard-basic"
                    label="Quantity"
                    variant="standard"
                    value={part.quantity}
                    onChange={handleQuantity}
                  />
                  <FormHelperText>Required*</FormHelperText>
                </FormControl>
              </MDBCol>
              <MDBCol>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                  <InputLabel id="value">Value</InputLabel>
                  <Input
                    id="cost"
                    label="Value"
                    variant="standard"
                    value={part.partValue}
                    onChange={handlePartValueChange}
                    startAdornment={
                      <InputAdornment position="start">£</InputAdornment>
                    }
                  />
                  <FormHelperText>Required*</FormHelperText>
                </FormControl>
              </MDBCol>
              <MDBCol>
                <MDBBtn
                  className="mt-4"
                  color="success"
                  size="sm"
                  onClick={addToPartList}
                >
                  <MDBIcon icon="plus" /> Add
                </MDBBtn>
              </MDBCol>
            </MDBRow>
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
