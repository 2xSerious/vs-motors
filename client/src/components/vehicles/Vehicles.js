import { useEffect, useState } from "react";
import axios from "axios";
import { MDBContainer, MDBIcon } from "mdbreact";
import CreateVehicle from "./VehicleForm";
import GetVehicleList from "./VehicleList";
import { host } from "../host";

function Vehicles() {
  const [vehicles, setVehicles] = useState({
    columns: [
      {
        label: "#",
        field: "num",
        sort: "asc",
      },
      {
        label: "Make",
        field: "make",
        sort: "asc",
      },
      {
        label: "Model",
        field: "model",
        sort: "asc",
      },
      {
        label: "Year",
        field: "year",
        sort: "asc",
      },
      {
        label: "Reg Number",
        field: "reg",
      },
      {
        label: "Owner",
        field: "owner",
        sort: "asc",
      },
    ],
    rows: [],
  });
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [reg, setReg] = useState("");
  const [owner, setOwner] = useState("");
  const [submit, setSubmit] = useState(false);

  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [customer, setCustomer] = useState("");

  const url = host.url;

  const handler = (id, owner) => {
    setId(id);
    setCustomer(owner);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    async function getVehicles() {
      const res = await axios.get(`${url}/vehicles/`);
      let data = res.data.response;
      if (data.length > 0) {
        let counter = 1;
        let arr = data.reduce(
          (acc, sub) => [
            ...acc,
            {
              num: counter++,
              make: sub.make,
              model: sub.model,
              year: sub.year,
              reg: sub.reg_num,
              owner: sub.c_name,
              clickEvent: () => handler(sub.id, sub.c_name),
            },
          ],
          []
        );

        setVehicles((prev) => ({ ...prev, rows: arr }));
      }
    }
    getVehicles();
    setSubmit(false);
  }, [url, submit]);

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
      await axios.post(`${url}/vehicles/`, {
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
      <GetVehicleList
        handleSubmit={toggleSubmit}
        vehicles={vehicles}
        toggle={toggle}
        customer={customer}
        id={id}
        modal={modal}
      />
      ,
    </MDBContainer>
  );
}

export default Vehicles;
