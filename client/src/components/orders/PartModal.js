import { useEffect, useState } from "react";
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
  Input,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const PartModal = ({
  modal,
  toggleModal,
  orderId,
  parts,
  partsList,
  refresh,
}) => {
  let count = 1;
  const [part, setPart] = useState({
    supplierId: 0,
    quantity: 1,
    name: "",
    value: "",
    valueVat: 0,
    orderId: 0,
  });

  const [suppliers, setSuppliers] = useState();

  useEffect(() => {
    async function getSuppliersList() {
      const res = await axios.get("https://vs-motors.herokuapp.com/suppliers");
      const data = res.data.response;
      setSuppliers(data);
      setPart((prev) => ({ ...prev, orderId: orderId }));
      refresh();
    }
    getSuppliersList();
  }, [modal, orderId, refresh]);

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
    let res = await axios.post("https://vs-motors.herokuapp.com/parts/add", {
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

  // HANDLE DELTE
  function handleDeletePart(e) {
    e.preventDefault();
    let id = e.currentTarget.getAttribute("id");
    console.log(id);
    deletePart(id);
  }

  async function deletePart(id) {
    let res = await axios.delete(`https://vs-motors.herokuapp.com/parts/${id}`);
    if (res.status === 200) {
      partsList(part.orderId);
    }
  }

  return (
    <MDBContainer>
      <MDBModal isOpen={modal} toggle={toggleModal} backdrop={false}>
        <MDBModalHeader toggle={toggleModal}>Parts</MDBModalHeader>
        <MDBModalBody>
          <form id="add-part" onSubmit={onSubmitPart}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="supplier-select">Supplier</InputLabel>
              <Select
                id="supplier-select"
                label="Supplier"
                value={part.supplierId}
                onChange={handleChangeSupplier}
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
                  <div>Loading...</div>
                )}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, maxWidth: 100 }}>
              <InputLabel htmlFor="part">Part</InputLabel>
              <Input id="part" value={part.name} onChange={handleChangeName} />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, maxWidth: 100 }}>
              <InputLabel htmlFor="part">Quantity</InputLabel>
              <Input
                id="part"
                value={part.quantity}
                onChange={handleQuantity}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, maxWidth: 60 }}>
              <InputLabel htmlFor="value">Value</InputLabel>
              <Input
                id="value"
                value={part.value}
                onChange={handleChangeValue}
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ m: 3, maxWidth: 60 }}>
              <IconButton type="submit" form="add-part">
                <MDBIcon icon="plus" />
              </IconButton>
            </FormControl>
          </form>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>Part</th>
                <th>Value</th>
                <th>Order #</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {parts.map((e) => {
                return (
                  <tr key={e.p_name + "-" + e.id + "-" + e.order_id} id={e.id}>
                    <td>{count++}</td>
                    <td>{e.p_name}</td>
                    <td>
                      £{e.cost} / vat £{e.cost_vat}
                    </td>
                    <td>{e.order_id}</td>
                    <td>
                      <IconButton
                        type="button"
                        id={e.id}
                        onClick={handleDeletePart}
                      >
                        <MDBIcon icon="times" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
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
