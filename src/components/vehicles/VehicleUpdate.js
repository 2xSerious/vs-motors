import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
  MDBInput,
  MDBCol,
} from "mdbreact";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

export default function UpdateVehicle(props) {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
    reg: "",
    ownerId: "",
  });
  const [validation, setValidation] = useState({
    make: true,
    model: true,
    year: true,
    reg: true,
    owner: true,
  });

  const id = props.forId;

  // UPDATE ON id
  useEffect(() => {
    getVehiclebyId();
  }, [id]);

  async function getVehiclebyId() {
    const res = await axios.get(`http://localhost:3001/vehicles/${id}`);
    let data = res.data.response;
    console.log(data);
    if (data.length > 0) {
      setVehicle({
        make: data[0].make,
        model: data[0].model,
        year: data[0].year,
        reg: data[0].reg_num,
        ownerId: data[0].customer_id,
      });
    } else {
      return;
    }
  }
  // HANDLE UPDATE
  async function updateVehicleDetails() {
    let res = await axios.put(`http://localhost:3001/vehicles/${id}`, {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      reg: vehicle.reg,
      owner: vehicle.ownerId,
    });
    console.log(res);
  }
  // HANDLE DELTE
  async function deleteVehicle() {
    console.log(id);
    await axios.delete(`http://localhost:3001/vehicles/${id}`);
    props.handleSubmit();
  }

  function handleDelete() {
    props.toggle();
    confirmAlert({
      title: "Delete",
      message: "Delete Vehicle record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteVehicle();
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  }

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(validation).includes(false)) {
      e.target.className += " was-validated";
      return;
    }

    updateVehicleDetails();
    props.toggle();
    props.handleSubmit();
  };

  //HANDEL INPUTS

  const handleChangeMake = (e) => {
    let make = e.target.value;
    if (make) {
      setVehicle((prev) => ({ ...prev, make: make }));
      setValidation((prev) => ({ ...prev, make: true }));
    } else {
      setVehicle((prev) => ({ ...prev, make: make }));
      setValidation((prev) => ({ ...prev, make: false }));
    }
  };
  const handleChangeModel = (e) => {
    let model = e.target.value;
    if (model) {
      setVehicle((prev) => ({ ...prev, model: model }));
      setValidation((prev) => ({ ...prev, model: true }));
    } else {
      setVehicle((prev) => ({ ...prev, model: model }));
      setValidation((prev) => ({ ...prev, model: false }));
    }
  };
  const handleChangeYear = (e) => {
    const yRegex = /^[0-9]{1,4}$/;
    let year = e.target.value;
    if (year === "" || yRegex.test(year)) {
      if (year) {
        setVehicle((prev) => ({ ...prev, year: year }));
        setValidation((prev) => ({ ...prev, year: true }));
      } else {
        setVehicle((prev) => ({ ...prev, year: year })); // allow clear the input field
        setValidation((prev) => ({ ...prev, year: false }));
      }
    }
  };
  const handleChangeReg = (e) => {
    let reg = e.target.value;
    if (reg) {
      setVehicle((prev) => ({ ...prev, reg: reg.toUpperCase() }));
      setValidation((prev) => ({ ...prev, reg: true }));
    } else {
      setVehicle((prev) => ({ ...prev, reg: reg }));
      setValidation((prev) => ({ ...prev, reg: false }));
    }
  };

  //   const handleChangeOwner = (e) => {
  //     let owner = e.target.value;
  //     if (owner) {
  //       setVehicle((prev) => ({ ...prev, ownerId: owner }));
  //       setValidation((prev) => ({ ...prev, owner: true }));
  //     } else {
  //       setValidation((prev) => ({ ...prev, owner: false }));
  //     }
  //   };

  return (
    <MDBContainer className="mt-5">
      <MDBModal isOpen={props.modal} toggle={props.toggle}>
        <MDBModalHeader toggle={props.toggle}>Update Vehicle</MDBModalHeader>
        <MDBModalBody>
          <form
            className="need-validation"
            id="update-vehicle"
            onSubmit={handleSubmit}
            noValidate
          >
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  value={vehicle.make}
                  onChange={handleChangeMake}
                  name="make"
                  type="text"
                  id="formUpdateMake"
                  label="Vehicle Make"
                ></MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={vehicle.model}
                  name="model"
                  onChange={handleChangeModel}
                  type="text"
                  id="formUpdateModel"
                  label="Phone number"
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback">Use numbers only!</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={vehicle.year}
                  name="year"
                  onChange={handleChangeYear}
                  type="text"
                  id="formUpdateYear"
                  label="Year"
                  required
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback">Required*</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={vehicle.reg}
                  name="reg"
                  onChange={handleChangeReg}
                  type="text"
                  id="formUpdateReg"
                  label="Reg Number"
                  required
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback">Required*</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <div className="d-flex mt-4">
                  <p>Owned by {props.c_name}</p>
                </div>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={handleDelete}>
            Delete
          </MDBBtn>
          <MDBBtn color="secondary" onClick={props.toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="primary" form="update-vehicle" type="submit">
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}
