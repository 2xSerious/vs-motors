import { useEffect, useState } from "react";
import { host } from "../host";
import axios from "axios";
import CreateSupplier from "./supplierForm";
import GetSupplierList from "./supplierList";
import { MDBContainer, MDBIcon } from "mdbreact";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const url = host.url;
  useEffect(() => {
    async function getSuppliers() {
      const res = await axios.get(`${url}/suppliers/`);
      let data = res.data.response;
      setSuppliers(data);
    }
    getSuppliers();
  }, [url, submit]);

  // HANDLE INPUTS
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      e.target.className += " was-validated";
      return;
    }
    insertSupplier(); // create user API
    clearFields(); // Clear input fields
    toggleSubmit(); // Update list After Submit
  };

  function toggleSubmit() {
    setSubmit(!submit);
  }

  async function insertSupplier() {
    try {
      await axios.post(`${url}/suppliers/`, {
        sName: name,
      });
    } catch (error) {
      alert("Supplier already exist");
    }
  }

  function clearFields() {
    setName("");
  }

  return (
    <MDBContainer className="mt-5">
      <MDBContainer className="d-flex flex-column align-items-center mb-3 mb-md-0">
        <MDBIcon size="5x" icon="truck-moving" />
        <div>
          <h1>Suppliers</h1>
        </div>
      </MDBContainer>
      <CreateSupplier
        onNameChange={handleChangeName}
        onSubmit={handleSubmit}
        name={name}
      />
      <GetSupplierList handleSubmit={toggleSubmit} suppliers={suppliers} />
    </MDBContainer>
  );
}

export default Suppliers;
