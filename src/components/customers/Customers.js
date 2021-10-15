import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateClient from "./customerForm";
import GetClientList from "./customerList";
import { MDBContainer, MDBIcon } from "mdbreact";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [validation, setValidation] = useState(true);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  const phoneRegex = /^[0-9]*$/;
  useEffect(() => {
    getCustomers();
    setSubmit(false);
  }, [submit]);

  async function getCustomers() {
    const res = await axios.get("http://localhost:3001/clients/");
    let data = res.data.response;
    if (data.length > 0) {
      setCustomers(data);
    }
  }
  // HANDLE INPUTS
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePhone = (e) => {
    let phone = e.target.value;
    if (phoneRegex.test(phone)) {
      setPhone(phone);
      setValidation(true);
    } else {
      setPhone(phone);
      setValidation(false);
    }
  };
  const handleChangeEmail = (e) => {
    let email = e.target.value;
    if (emailRegex.test(email)) {
      setEmail(email);
      return true;
    } else {
      setEmail(email);
      return false;
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      e.target.className += " was-validated";
      return;
    }

    if (!validation) {
      e.target.className += " was-validated";
      return;
    }
    insertClient(); // create user API
    clearFields(); // Clear input fields
    toggleSubmit(); // Update list After Submit
  };

  function toggleSubmit() {
    setSubmit(!submit);
  }

  async function insertClient() {
    try {
      await axios.post("http://localhost:3001/clients/", {
        cName: name,
        phone: phone,
        email: email,
      });
    } catch (error) {
      alert("Customer already exist");
    }
  }

  function clearFields() {
    setName("");
    setPhone("");
    setEmail("");
  }

  return (
    <MDBContainer className="mt-5">
      <MDBContainer className="d-flex flex-column align-items-center mb-3 ">
        <MDBIcon size="5x" icon="users" />
        <div>
          <h1>Customers</h1>
        </div>
      </MDBContainer>
      <CreateClient
        onNameChange={handleChangeName}
        onPhoneChange={handleChangePhone}
        onEmailChange={handleChangeEmail}
        onSubmit={handleSubmit}
        name={name}
        phone={phone}
        email={email}
      />
      <GetClientList handleSubmit={toggleSubmit} customers={customers} />,
    </MDBContainer>
  );
}

export default Customers;
