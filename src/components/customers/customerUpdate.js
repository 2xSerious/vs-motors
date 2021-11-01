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
export default function UpdateCustomer(props) {
  const [customer, setCustomer] = useState({});
  const [validation, setValidation] = useState({
    phone: true,
    email: true,
    address: true,
    city: true,
    postcode: true,
    country: true,
  });

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,})+$/;
  const phoneRegex = /^[0-9]*$/;

  // UPDATE ON id
  useEffect(() => {
    async function getCustomerbyId() {
      const res = await axios.get(
        `https://vs-motors.herokuapp.com/clients/${props.forId}`
      );
      let data = res.data.response;
      console.log(res);
      if (data.length > 0) {
        setCustomer({
          name: data[0].c_name,
          phone: data[0].phone,
          email: data[0].email,
          address: data[0].street_address,
          city: data[0].city,
          postcode: data[0].postcode,
          country: data[0].country,
        });
      }
    }
    getCustomerbyId();
  }, [props.forId]);

  // HANDLE UPDATE
  async function updateCustomerDetails() {
    let res = await axios.put(
      `https://vs-motors.herokuapp.com/clients/${props.forId}`,
      {
        cName: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        city: customer.city,
        postcode: customer.postcode,
        country: customer.country,
      }
    );
    console.log(res);
  }
  // HANDLE DELTE
  async function deleteCustomer() {
    await axios
      .delete(`https://vs-motors.herokuapp.com/clients/${props.forId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .then(() => {
        props.handleSubmit();
      });
  }

  function handleDelete() {
    props.toggle();
    confirmAlert({
      title: "Delete",
      message: "Delete customer record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteCustomer();
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
    if (!validation.email) {
      e.target.className += " was-validated";
      return;
    }

    if (!validation.phone) {
      e.target.className += " was-validated";
      return;
    }
    updateCustomerDetails();
    props.toggle();
    props.handleSubmit();
  };

  //HANDEL INPUTS

  const handleChangePhone = (e) => {
    let phone = e.target.value;
    if (phoneRegex.test(phone)) {
      setCustomer((prev) => ({ ...prev, phone: phone }));
      setValidation((prev) => ({ ...prev, phone: true }));
    } else {
      setCustomer((prev) => ({ ...prev, phone: phone }));
      setValidation((prev) => ({ ...prev, phone: false }));
    }
  };
  const handleChangeEmail = (e) => {
    let email = e.target.value;
    if (emailRegex.test(email)) {
      setCustomer((prev) => ({ ...prev, email: email }));
      setValidation((prev) => ({ ...prev, email: true }));
    } else {
      setCustomer((prev) => ({ ...prev, email: email }));
      setValidation((prev) => ({ ...prev, email: false }));
    }
  };
  const handleChangeAddress = (e) => {
    let address = e.target.value;
    if (address) {
      setCustomer((prev) => ({ ...prev, address: address }));
      setValidation((prev) => ({ ...prev, address: true }));
    } else {
      setCustomer((prev) => ({ ...prev, address: address }));
      setValidation((prev) => ({ ...prev, address: false }));
    }
  };
  const handleChangeCity = (e) => {
    let city = e.target.value;
    if (city) {
      setCustomer((prev) => ({ ...prev, city: city }));
      setValidation((prev) => ({ ...prev, city: true }));
    } else {
      setCustomer((prev) => ({ ...prev, city: city }));
      setValidation((prev) => ({ ...prev, city: false }));
    }
  };
  const handleChangePostcode = (e) => {
    let postcode = e.target.value;
    if (postcode) {
      setCustomer((prev) => ({ ...prev, postcode: postcode }));
      setValidation((prev) => ({ ...prev, postcode: true }));
    } else {
      setCustomer((prev) => ({ ...prev, postcode: postcode }));
      setValidation((prev) => ({ ...prev, postcode: false }));
    }
  };
  const handleChangeCountry = (e) => {
    let country = e.target.value;
    if (country) {
      setCustomer((prev) => ({ ...prev, country: country }));
      setValidation((prev) => ({ ...prev, country: true }));
    } else {
      setCustomer((prev) => ({ ...prev, country: country }));
      setValidation((prev) => ({ ...prev, country: false }));
    }
  };

  return (
    <MDBContainer className="mt-5">
      <MDBModal isOpen={props.modal} toggle={props.toggle}>
        <MDBModalHeader toggle={props.toggle}>Update Customer</MDBModalHeader>
        <MDBModalBody>
          <form
            className="need-validation"
            id="update-user"
            onSubmit={handleSubmit}
            noValidate
          >
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  value={customer.name}
                  name="full-name"
                  type="text"
                  id="formUpdateName"
                  label="Customer Name"
                  disabled
                ></MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={customer.phone}
                  name="phone"
                  onChange={handleChangePhone}
                  type="text"
                  pattern="[0-9]*"
                  maxLength="10"
                  id="formUpdatePhone"
                  label="Phone number"
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback">Use numbers only!</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={customer.email}
                  name="email"
                  onChange={handleChangeEmail}
                  type="email"
                  id="formUpdateEmail"
                  label="Email"
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback">"example@example.com"</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={customer.address}
                  name="address"
                  onChange={handleChangeAddress}
                  type="text"
                  label="Address"
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback"></div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={customer.city}
                  name="city"
                  onChange={handleChangeCity}
                  type="text"
                  label="City"
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback"></div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={customer.postcode}
                  name="psotcode"
                  onChange={handleChangePostcode}
                  type="text"
                  label="Postcode"
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback"></div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  value={customer.country}
                  name="country"
                  onChange={handleChangeCountry}
                  type="text"
                  label="Country"
                >
                  <div className="valid-feedback">Looks Good!</div>
                  <div className="invalid-feedback"></div>
                </MDBInput>
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
          <MDBBtn color="primary" form="update-user" type="submit">
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}
