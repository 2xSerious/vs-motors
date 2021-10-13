import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const CreateVehicle = (props) => {
  const [years, setYears] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    getOwners();
    generateYears();
  }, []);

  function generateYears() {
    let date = new Date();
    var year = date.getFullYear();
    const array = [];
    for (let i = 1; i < 21; i++) {
      array.push(year - i);
    }
    array.reverse();
    setYears(array);
  }

  async function getOwners() {
    const res = await axios.get("http://localhost:3001/clients");
    let data = res.data.response;
    data.sort((a, b) => a.c_name > b.c_name);
    setOwners(data);
  }
  return (
    <MDBContainer>
      <form className="needs-validation" onSubmit={props.onSubmit} noValidate>
        <MDBRow>
          <MDBCol md="4">
            <MDBInput
              className="form-control"
              id="formBasicMake"
              name="make"
              value={props.make}
              onChange={props.onMakeChange}
              label="Vehicle Make"
              required
            >
              <div className="valid-feedback">Looks Good!</div>
              <div className="invalid-feedback">Required*</div>
            </MDBInput>
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              className="form-control"
              name="model"
              value={props.model}
              onChange={props.onModelChange}
              id="formVehicleModel"
              label="Vehicle Model"
              required
            >
              <div className="valid-feedback">Looks Good!</div>
              <div className="invalid-feedback">Required*</div>
            </MDBInput>
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              className="form-control"
              value={props.reg}
              name="reg"
              onChange={props.onRegChange}
              type="text"
              id="formVehicleReg"
              label="Vehicle Registration"
              required
            >
              <div className="valid-feedback">Looks Good!</div>
              <div className="invalid-feedback">Required*</div>
            </MDBInput>
          </MDBCol>
          <MDBCol md="4">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="vehicle-year">Year</InputLabel>
              <Select
                labelId="vehicle-year"
                id="select-vehicle-year"
                value={props.year}
                onChange={props.onYearChange}
                label="Year"
              >
                {years ? (
                  years.map((e) => {
                    return <MenuItem value={e}>{e}</MenuItem>;
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </Select>
            </FormControl>
          </MDBCol>
          <MDBCol>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="vehicle-year">Owner</InputLabel>
              <Select
                labelId="vehicle-owner"
                id="select-vehicle-owner"
                value={props.ownerId}
                onChange={props.onOwnerChange}
                label="owner"
                required
              >
                {owners ? (
                  owners.map((e) => {
                    return <MenuItem value={e.id}>{e.c_name}</MenuItem>;
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </Select>
            </FormControl>
          </MDBCol>
        </MDBRow>
        <MDBBtn color="success" type="submit">
          Add
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default CreateVehicle;
