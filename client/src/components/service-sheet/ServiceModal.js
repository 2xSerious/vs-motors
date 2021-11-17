import { useState, useEffect } from "react";
import { host } from "../host";
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
  Switch,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";

import { sumFloat, floatParser } from "../../js/helpers";

const ServiceModal = ({ toggle, isModal, service, parts }) => {
  const url = host.url;
  const [paidStatus, setPaidStatus] = useState("0");
  const [checked, setChecked] = useState(false);

  const [paidType, setPaidType] = useState("");
  const [paidTypes, setPaidTypes] = useState([]);
  const [workUpdate, setWorkUpdate] = useState("");
  const [details, setDetails] = useState({});
  const totalparts = floatParser(service.total_vat).toFixed(2);
  const totalvat = sumFloat(totalparts, workUpdate.work);
  const total = floatParser(totalvat / 1.2).toFixed(2);
  const vat = floatParser(total * 0.2).toFixed(2);

  useEffect(() => {
    setWorkUpdate(service);
    async function getPaidTypes() {
      let res = await axios.get(`${url}/services/types`);
      let data = res.data.response;
      setPaidTypes(data);
    }
    getPaidTypes();
    console.log(service);
    if (service.paid_status === 1) {
      setPaidStatus("1");
      setChecked(true);
    } else {
      setPaidStatus("0");
      setChecked(false);
    }
    if (service.paid_id) {
      setPaidType(service.paid_id);
    } else {
      setPaidType("1");
    }
  }, [url, toggle, service]);

  useEffect(() => {
    function invoiceNoGenerator() {
      const date = new Date();
      const d = date.getDate();
      const mm = date.getMonth();
      const yy = date.getFullYear();
      const random = Math.floor(Math.random() * (9000 - 1000 + 1) + 1000);
      const invNo = `${yy}${mm}${d}${random}`;
      const formatedDate = `${yy}-${mm}-${d}`;

      setDetails({
        inv_no: invNo,
        total: totalvat,
        service_id: service.id,
        date: formatedDate,
      });
    }
    invoiceNoGenerator();
  }, [service.id, totalvat]);

  async function update() {
    let status = "closed";
    let res = await axios.put(`${url}/services`, {
      id: service.id,
      work: workUpdate.work,
    });
    if (res.status === 200) {
      postInvoiceInfo().then(
        updateOrderStatus(service.orderID, { status: status })
      );
    }
  }

  async function postInvoiceInfo() {
    await axios.post(`${url}/invoices`, {
      invoice: workUpdate,
      parts: parts,
      details: details,
    });
  }

  async function updateOrderStatus(id, status) {
    await axios.put(`${url}/orders/${id}`, status);
  }

  async function updatePaidStatus(id) {
    await axios.put(`${url}/services/service/${id}`, {
      paidId: paidType,
      paidStatus: paidStatus,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    update();
    toggle();
  }

  function handlePaidStatus(e) {
    setChecked(e.target.checked);

    if (e.target.checked) {
      setPaidStatus("1");
    } else setPaidStatus("0");
  }
  function handleWorkUpdate(e) {
    setWorkUpdate((prev) => ({ ...prev, work: e.target.value }));
  }

  function handlePaidType(e) {
    setPaidType(e.target.value);
    updatePaidStatus(service.id);
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
              {service.InvoiceId === null ? (
                <FormControl variant="standard">
                  <InputLabel htmlFor="input-work">Work</InputLabel>
                  <Input
                    id="input-work"
                    label="Work"
                    value={workUpdate.work}
                    onChange={handleWorkUpdate}
                    startAdornment={
                      <InputAdornment position="start">
                        <strong>£</strong>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              ) : (
                <div>
                  <Switch
                    checked={checked}
                    onChange={handlePaidStatus}
                    color="success"
                  />
                  <span>Paid </span>
                </div>
              )}
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
              </>
            )}
            <hr />
            <>
              <h4 className="text-center">Invoice Summary</h4>
            </>
            <MDBContainer>
              <MDBCard>
                <MDBCardBody>
                  <div className="row">
                    <div className="col">
                      <strong>Parts:</strong>
                    </div>
                  </div>
                  {parts.map((e) => {
                    return (
                      <div className="row">
                        <div className="col">
                          <small>{e.p_name}</small>
                        </div>
                        <div className="col">
                          <small>£{e.cost_vat}</small>
                        </div>
                      </div>
                    );
                  })}

                  <div className="row">
                    <div className="col">
                      <small>Work</small>
                    </div>
                    <div className="col">
                      <small>£{workUpdate.work}</small>
                    </div>
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
          </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
          {service.InvoiceId !== null ? (
            <MDBBtn color="dark" disabled>
              Create Invoice
            </MDBBtn>
          ) : (
            <MDBBtn color="success" form="update-service" type="submit">
              Create Invoice
            </MDBBtn>
          )}
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default ServiceModal;
