import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBContainer, MDBIcon } from "mdbreact";
import CreateVehicle from "./VehicleForm";
import GetVehicleList from "./VehicleList";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [reg, setReg] = useState("");
  const [owner, setOwner] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    async function getVehicles() {
      const res = await axios.get("http://localhost:3001/vehicles/");
      let data = res.data.response;
      setVehicles(data);
      console.log(data);
    }
    getVehicles();
    setSubmit(false);
  }, [submit]);

  // HANDLE INPUTS
  const handleChangeMake = (e) => {
    let make = e.target.value;
    setMake(make);
  };
  const handleChangeModel = (e) => {
    let model = e.target.value;
    setModel(model);
  };
  const handleChangeYear = (e) => {
    let year = e.target.value;
    setYear(year);
  };
  const handleChangeReg = (e) => {
    let reg = e.target.value;
    setReg(reg.toUpperCase());
  };
  const handleChangeOwner = (e) => {
    let owner = e.target.value;
    setOwner(owner);
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!make || !model || !year || !reg || !owner) {
      e.target.className += " was-validated";
      return;
    }
    insertVehicle(); // create user API
    clearFields(); // Clear input fields
    toggleSubmit(); // Update list After Submit
  };

  function toggleSubmit() {
    setSubmit(!submit);
  }

  async function insertVehicle() {
    try {
      await axios.post("http://localhost:3001/vehicles/", {
        make: make,
        model: model,
        year: year,
        reg: reg,
        ownerId: owner,
      });
    } catch (error) {
      alert("Vehicle Registration number already exist");
    }
  }

  function clearFields() {
    setMake("");
    setModel("");
    setYear("");
    setReg("");
    setOwner("");
  }

  return (
    <MDBContainer className="mt-5">
      <MDBContainer className="d-flex flex-column align-items-center mb-3 ">
        <MDBIcon size="5x" icon="car" />
        <div>
          <h1>Vehicles</h1>
        </div>
      </MDBContainer>
      <CreateVehicle
        onMakeChange={handleChangeMake}
        onModelChange={handleChangeModel}
        onYearChange={handleChangeYear}
        onRegChange={handleChangeReg}
        onOwnerChange={handleChangeOwner}
        onSubmit={handleSubmit}
        make={make}
        model={model}
        year={year}
        reg={reg}
        ownerId={owner}
      />
      <GetVehicleList handleSubmit={toggleSubmit} vehicles={vehicles} />,
    </MDBContainer>
  );
}

export default Vehicles;
