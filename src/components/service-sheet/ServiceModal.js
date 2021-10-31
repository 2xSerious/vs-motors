import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const ServiceModal = ({ toggle, isModal, service }) => {
  const totalparts = parseFloat(service.total_vat).toFixed(2);
  const totalwork = parseFloat(service.work).toFixed(2);
  const total = parseFloat(totalparts) + parseFloat(totalwork);
  const vat = parseFloat(total * 0.2).toFixed(2);
  const totalvat = parseFloat(total * 1.2).toFixed(2);

  const [paidStatus, setPaidStatus] = useState("0");
  const [paidType, setPaidType] = useState("");
  const [paidTypes, setPaidTypes] = useState([]);
  const [workUpdate, setWorkUpdate] = useState("");

  useEffect(() => {
    setWorkUpdate(service.work);
    getPaidTypes();
    console.log(service);
    if (service.paid_status === 1) {
      setPaidStatus("1");
    }
    if (service.paid_id) {
      setPaidType(service.paid_id);
    }
  }, [toggle, service]);

  async function update() {
    let res = await axios.put("http://localhost:3001/services", {
      id: service.id,
      work: workUpdate,
      paidStatus: paidStatus,
      paidId: paidType,
    });
    console.log(res);
  }
  async function getPaidTypes() {
    let res = await axios.get("http://localhost:3001/services/types");
    let data = res.data.response;
    setPaidTypes(data);
  }
  function handleSubmit(e) {
    e.preventDefault();
    update();
    toggle();
  }

  function handlePaidStatus(e) {
    setPaidStatus(e.target.value);
  }
  function handleWorkUpdate(e) {
    setWorkUpdate(e.target.value);
  }
  function handlePaidType(e) {
    setPaidType(e.target.value);
  }

  return (
    <MDBContainer>
      <MDBModal isOpen={isModal}>
        <MDBModalHeader toggle={toggle}>Service # {service.id}</MDBModalHeader>
        <MDBModalBody>
          <div>
            <p>
              Customer: <span>{service.c_name}</span>
            </p>
            <p>
              Vehicle:{" "}
              <span>
                {service.make} {service.model} {service.year} -{" "}
                {service.odometer}mls
              </span>
            </p>
          </div>
          <form id="update-service" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between mx-3">
              <FormControl variant="standard">
                <InputLabel htmlFor="input-work">Work</InputLabel>
                <Input
                  id="input-work"
                  label="Work"
                  value={workUpdate}
                  onChange={handleWorkUpdate}
                  startAdornment={
                    <InputAdornment position="start">
                      <strong>£</strong>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">Paid</FormLabel>
                <RadioGroup
                  row
                  aria-label="paid"
                  name="radio-controll-paid"
                  value={paidStatus}
                  onChange={handlePaidStatus}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Yes" />
                  <FormControlLabel value="0" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            {paidStatus === "1" && (
              <>
                <FormControl variant="standard" sx={{ minWidth: 100 }}>
                  <InputLabel htmlFor="paid-status">Paid with</InputLabel>
                  <Select
                    id="paid-status"
                    label="Paid with"
                    value={paidType}
                    onChange={handlePaidType}
                  >
                    {paidTypes ? (
                      paidTypes.map((e) => {
                        return (
                          <MenuItem key={e.id} value={e.id}>
                            {e.type}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <div>Loading...</div>
                    )}
                  </Select>
                </FormControl>
                <hr />
                <>
                  <h4>Invoice Summerry</h4>
                </>
                <MDBContainer>
                  <MDBCard>
                    <MDBCardBody>
                      <div className="row">
                        <div className="col">Parts Total</div>
                        <div className="col">£{totalparts}</div>
                      </div>
                      <div className="row">
                        <div className="col">Work Total</div>
                        <div className="col">£{totalwork}</div>
                      </div>
                      <div className="row">
                        <div className="col">Total:</div>
                        <div className="col">£{total}</div>
                      </div>
                      <div className="row">
                        <div className="col">Vat:</div>
                        <div className="col">£{vat}</div>
                      </div>
                      <div className="row">
                        <div className="col">Total with Vat:</div>
                        <div className="col">£{totalvat}</div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBContainer>
              </>
            )}
          </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
          <MDBBtn color="success" form="update-service" type="submit">
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default ServiceModal;
