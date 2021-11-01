import { useEffect, useState } from "react";
import axios from "axios";
import CreateClient from "./customerForm";
import GetClientList from "./customerList";
import { MDBContainer, MDBIcon } from "mdbreact";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [submit, setSubmit] = useState(false);
  const [validation, setValidation] = useState(true);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,})+$/;
  const phoneRegex = /^[0-9]*$/;
  useEffect(() => {
    getCustomers();
  }, [submit]);

  async function getCustomers() {
    const res = await axios.get("https://vs-motors.herokuapp.com/clients");
    let data = res.data.response;
    if (data.length > 0) {
      setCustomers(data);
    } else {
      setCustomers([]);
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
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleChangeCity = (e) => {
    let val = e.target.value;
    let str;
    if (val !== "") {
      str = val[0].toUpperCase() + val.substring(1).toLowerCase();
    } else {
      str = "";
    }
    setCity(str);
  };
  const handleChangePostcode = (e) => {
    let val = e.target.value;
    let str;
    if (val !== "") {
      str = val.toUpperCase();
    } else {
      str = "";
    }
    setPostcode(str);
  };
  const handleChangeCountry = (e) => {
    let val = e.target.value;
    let str;
    if (val !== "") {
      str = val[0].toUpperCase() + val.substring(1).toLowerCase();
    } else {
      str = "";
    }
    setCountry(str);
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
    console.log(submit);
  }

  async function insertClient() {
    try {
      await axios.post("http://localhost:3001/clients/", {
        cName: name,
        phone: phone,
        email: email,
        address: address,
        city: city,
        postcode: postcode,
        country: country,
      });
    } catch (error) {
      alert("Customer already exist");
    }
  }

  function clearFields() {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setCity("");
    setPostcode("");
    setCountry("");
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
        onAddressChange={handleChangeAddress}
        onCityChange={handleChangeCity}
        onPostcodeChange={handleChangePostcode}
        onCountryChange={handleChangeCountry}
        onSubmit={handleSubmit}
        name={name}
        phone={phone}
        email={email}
        address={address}
        city={city}
        postcode={postcode}
        country={country}
      />
      <GetClientList handleSubmit={toggleSubmit} customers={customers} />,
    </MDBContainer>
  );
}

export default Customers;