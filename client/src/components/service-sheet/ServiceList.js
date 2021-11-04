import { useEffect, useState } from "react";
import { host } from "../host";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBContainer,
} from "mdbreact";
import axios from "axios";
import ServiceModal from "./ServiceModal";
import InvoiceModal from "./InvoiceModal";

const ServiceList = ({ didrefresh }) => {
  const [serviceList, setServiceList] = useState([]);
  const [currentService, setCurrentService] = useState("");
  const [isModal, setIsModal] = useState(false);

  const [parts, setParts] = useState([]);
  const url = host.url;
  const [invoiceModal, setInvoiceModal] = useState(false);

  let count = 1;

  useEffect(() => {
    async function getServiceList() {
      let res = await axios.get(`${url}/services`);
      let data = res.data.response;
      setServiceList(data);
      console.log(data);
    }
    getServiceList();
  }, [url, isModal, didrefresh]);

  async function getPartsByOrderId(id) {
    let res = await axios.get(`${url}/parts/order/${id}`);
    let data = res.data.parts;
    console.log(data);
    setParts(data);
  }

  // Helper sum function
  function sum(parts, work) {
    let total = parseInt(parts) + parseInt(work);
    return total.toFixed(2);
  }

  // Service Modal toggle
  function toggle() {
    setIsModal(!isModal);
  }

  // Invoice Modal toggle
  function toggleInvoiceModal() {
    setInvoiceModal(!invoiceModal);
  }
  // Current Service Id
  function handleServiceId(e) {
    let id = e.currentTarget.getAttribute("id");
    toggle();
    findIndex(id);
  }
  // Invoce Modal current service

  function handleInvoiceModalId(e) {
    let id = e.currentTarget.getAttribute("data-id");
    toggleInvoiceModal();
    findIndex(id);
  }

  function findIndex(id) {
    const fid = parseInt(id);
    const index = serviceList.findIndex((e) => e.id === fid);
    const curobj = serviceList[index];
    setCurrentService(curobj);
    getPartsByOrderId(curobj.orderID);
  }

  return (
    <MDBContainer>
      <MDBTable hover responsive>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Description</th>
            <th>Parts</th>
            <th>Work</th>
            <th>Total</th>
            <th>Serviced by</th>
            <th>Paid</th>
            <th></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {serviceList ? (
            serviceList.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{count++}</td>
                  <td>{e.created_at}</td>
                  <td>{e.c_name}</td>
                  <td>
                    {e.model} {e.model} {e.reg_num}
                  </td>
                  <td>{e.description}</td>
                  <td>£{e.total_vat}</td>
                  <td>£{e.work}</td>
                  <td>£{sum(e.total_vat, e.work)}</td>
                  <td>{e.w_name}</td>
                  <td id={e.id} onClick={handleServiceId}>
                    {e.paid_status ? (
                      <MDBIcon icon="check" className="green-text" />
                    ) : (
                      <MDBIcon icon="times" className="red-text" />
                    )}
                  </td>
                  <td>
                    {e.paid_status ? (
                      <MDBIcon
                        far
                        icon="file-alt"
                        data-id={e.id}
                        onClick={handleInvoiceModalId}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </MDBTableBody>
      </MDBTable>
      <ServiceModal
        isModal={isModal}
        toggle={toggle}
        service={currentService}
        parts={parts}
      />
      {currentService ? (
        <InvoiceModal
          isModal={invoiceModal}
          toggle={toggleInvoiceModal}
          serviceid={currentService.id}
          paidstatus={currentService.paid_status}
        />
      ) : (
        ""
      )}
    </MDBContainer>
  );
};

export default ServiceList;
