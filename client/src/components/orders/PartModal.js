import { useEffect, useState } from "react";
import { host } from "../host";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdbreact";

import {
  Box,
  InputAdornment,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import axios from "axios";

import { sumFloat, floatParser } from "../../js/helpers";

const PartModal = ({ modal, toggleModal, orderId, parts, partsList }) => {
  var total = 0;
  var totalvat = 0;
  let count = 1;
  const [part, setPart] = useState({
    supplierId: 0,
    quantity: 1,
    name: "",
    value: "",
    valueVat: 0,
    orderId: 0,
  });
  const [date, setDate] = useState(new Date());
  const [suppliers, setSuppliers] = useState();
  const url = host.url;
  useEffect(() => {
    async function getSuppliersList() {
      const res = await axios.get(`${url}/suppliers`);
      const data = res.data.response;
      setSuppliers(data);
      setPart((prev) => ({ ...prev, orderId: orderId }));
    }
    getSuppliersList();
  }, [url, modal, orderId]);

  // HANDLER PART STATE
  function handleChangeSupplier(e) {
    setPart((prev) => ({ ...prev, supplierId: e.target.value }));
  }
  function handleChangeName(e) {
    setPart((prev) => ({ ...prev, name: e.target.value }));
  }
  function handleQuantity(e) {
    setPart((prev) => ({ ...prev, quantity: e.target.value }));
  }
  function handleChangeValue(e) {
    const vRegex = /^\d+\.?\d{0,2}$/;
    let value = e.target.value;
    if (!value || vRegex.test(value)) {
      setPart((prev) => ({ ...prev, value: value, valueVat: value * 1.2 }));
    }
  }

  // Handle Submit

  function onSubmitPart(e) {
    e.preventDefault();
    addPart();
  }
  async function addPart() {
    let createDate = date.toISOString().split("T")[0];
    console.log(createDate);
    let res = await axios.post(`${url}/parts/add`, {
      date: createDate,
      name: part.name,
      quantity: part.quantity,
      value: part.value,
      valueVat: part.valueVat,
      orderId: part.orderId,
      supplierId: part.supplierId,
    });

    if (res.status === 200) {
      partsList(part.orderId);
      setPart((prev) => ({ ...prev, name: "" }));
      setPart((prev) => ({ ...prev, quantity: 1 }));
      setPart((prev) => ({ ...prev, value: "" }));
      setPart((prev) => ({ ...prev, valueVat: 0 }));
    }
  }
  async function updatePart(id, cost, costvat) {
    let res = await axios.put(`${url}/parts/${id}`, {
      cost: cost,
      costvat: costvat,
    });
    if (res.status === 200) {
      partsList(part.orderId);
    }
  }
  //HANDLE UPDATE
  function handleUpdatePart(e) {
    e.preventDefault();
    let id = e.currentTarget.getAttribute("data-row");
    let cost = e.currentTarget.getAttribute("data-cost");
    if (cost > 0) {
      cost = -Math.abs(cost);
    } else {
      cost = Math.abs(cost);
    }
    let costvat = floatParser(cost * 1.2);
    updatePart(id, cost, costvat);
  }
  // HANDLE DELTE
  function handleDeletePart(e) {
    e.preventDefault();
    let id = e.currentTarget.getAttribute("id");
    console.log(id);
    deletePart(id);
  }

  async function deletePart(id) {
    let res = await axios.delete(`${url}/parts/${id}`);
    if (res.status === 200) {
      partsList(part.orderId);
    }
  }

  return (
    <MDBContainer>
      <MDBModal isOpen={modal} toggle={toggleModal} size="lg">
        <MDBModalHeader toggle={toggleModal}>Parts</MDBModalHeader>
        <MDBModalBody>
          <form id="add-part" onSubmit={onSubmitPart}>
            <div className="d-gird row mx-2">
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
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
                  id="supplier-select"
                  select
                  label="Supplier"
                  value={part.supplierId}
                  onChange={handleChangeSupplier}
                  size="small"
                >
                  {suppliers ? (
                    suppliers.map((e) => {
                      return (
                        <MenuItem key={e.id} value={e.id}>
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
                  value={part.name}
                  onChange={handleChangeName}
                  required
                />
                <TextField
                  id="part-quantity"
                  label="quantity"
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
                  value={part.value}
                  onChange={handleChangeValue}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">£</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </div>
          </form>
          <div className="d-flex justify-content-center">
            <MDBBtn
              style={{ width: "50%" }}
              color="success"
              type="submit"
              form="add-part"
            >
              <span className="px-2">
                <MDBIcon icon="plus" size="lg" style={{ color: "white" }} />
              </span>
            </MDBBtn>
          </div>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Supplier</th>
                <th>Part</th>
                <th>Value</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {parts.map((e) => {
                total = sumFloat(total, e.cost);
                totalvat = sumFloat(totalvat, e.cost_vat);
                let date = new Date(e.date).toLocaleDateString("en-uk");
                return (
                  <tr key={e.p_name + "-" + e.id + "-" + e.order_id} id={e.id}>
                    <td>{count++}</td>
                    <td>{date}</td>
                    <td>{e.s_name}</td>
                    <td>{e.p_name}</td>
                    {e.cost < 0 ? (
                      <td style={{ color: "red" }}>
                        £{e.cost} / vat £{e.cost_vat}
                      </td>
                    ) : (
                      <td>
                        £{e.cost} / vat £{e.cost_vat}
                      </td>
                    )}

                    <td>
                      <IconButton
                        type="button"
                        data-row={e.id}
                        data-cost={e.cost}
                        onClick={handleUpdatePart}
                      >
                        <MDBIcon icon="sync-alt" size="xs" />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        type="button"
                        id={e.id}
                        onClick={handleDeletePart}
                      >
                        <MDBIcon icon="times" style={{ color: "red" }} />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
          <div className="d-flex flex-column align-items-end">
            <div>
              Total: <span>£{total.toFixed(2)}</span>
            </div>
            <div>
              Total Vat: <span>£{totalvat.toFixed(2)}</span>
            </div>
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="success" onClick={toggleModal}>
            ok
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default PartModal;
