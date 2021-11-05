import { host } from "../host";
import {
  MDBBtn,
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdbreact";
import { saveAs } from "file-saver";
import axios from "axios";
import { useEffect, useState } from "react";

const InvoiceModal = ({ toggle, isModal, serviceid, paidstatus }) => {
  const [invoiceNo, setInvoiceNo] = useState("");
  const url = host.url;
  useEffect(() => {
    if (paidstatus > 0) {
      async function getInvoiceNo() {
        const { data } = await axios.get(
          `${url}/services/service/${serviceid}`
        );
        console.log(data);
        console.log(data.response[0]);
        setInvoiceNo(data.response[0].inv_no);
      }
      getInvoiceNo();
    }
  }, [url, serviceid, paidstatus, invoiceNo, toggle]);

  async function getPdf() {
    const { data } = await axios.get(
      `https://vs-motors.s3.amazonaws.com/${invoiceNo}.pdf`,
      {
        responseType: "arraybuffer",
      }
    );
    const blob = new Blob([data], { type: "application/pdf" });
    saveAs(blob, `${invoiceNo}.pdf`);
  }

  return (
    <MDBContainer>
      <MDBModal isOpen={isModal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Service # {}</MDBModalHeader>
        <MDBModalBody>
          <MDBBtn onClick={getPdf}>Download</MDBBtn>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default InvoiceModal;
