import React, { useState, useEffect } from "react";
import InvoiceViewer from "../invoice/Viewer";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import axios from "axios";
const InvoiceModal = ({ toggle, isModal, service }) => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    if (service) {
      getPartsByOrderId(service.orderID);
    }
  }, []);

  async function getPartsByOrderId(id) {
    let res = await axios.get(`http://localhost:3001/parts/order/${id}`);
    let data = res.data.parts;
    console.log(data);
    setParts(data);
  }
  console.log(service);
  console.log(parts);
  return (
    <MDBContainer>
      <MDBModal isOpen={isModal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Service # {service.id}</MDBModalHeader>
        <MDBModalBody>
          {parts.length > 0 ? (
            <InvoiceViewer invoice={service} parts={parts} />
          ) : (
            ""
          )}
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default InvoiceModal;
