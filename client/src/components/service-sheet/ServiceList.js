import { useEffect, useState } from "react";
import { host } from "../host";
import { MDBIcon, MDBContainer, MDBDataTableV5 } from "mdbreact";
import axios from "axios";
import ServiceModal from "./ServiceModal";
import { saveAs } from "file-saver";

import { sumFloat, floatParser } from "../../js/helpers";

const ServiceList = ({ didrefresh }) => {
  const [serviceList, setServiceList] = useState([]);
  const [currentService, setCurrentService] = useState("");
  const [isModal, setIsModal] = useState(false);

  const [parts, setParts] = useState([]);
  const url = host.url;

  const [services, setServices] = useState({
    columns: [
      {
        label: "#",
        field: "num",
        sort: "asc",
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
      },
      {
        label: "Customer",
        field: "customer",
        sort: "asc",
      },
      {
        label: "Vehicle",
        field: "vehicle",
        sort: "asc",
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
      },
      {
        label: "Parts",
        field: "parts",
      },
      {
        label: "Work",
        field: "work",
      },
      {
        label: "Total",
        field: "total",
      },
      {
        label: "Serviced by",
        field: "servicedby",
        sort: "asc",
      },
      {
        label: "Paid",
        field: "paid",
      },
      {
        field: "invoice",
      },
    ],
  });

  useEffect(() => {
    async function getServiceList() {
      let res = await axios.get(`${url}/services`);
      let data = res.data.response;
      setServiceList(data);
      if (data.length > 0) {
        let counter = 1;
        let arr = data.reduce(
          (acc, e) => [
            ...acc,
            {
              num: counter++,
              date: e.created_at,
              customer: e.c_name,
              vehicle: `${e.model} ${e.model} ${e.reg_num}`,
              description: e.description,
              parts: `£${e.total_vat}`,
              work: `£${e.work}`,
              total: `£${sum(e.total_vat, e.work)}`,
              servicedby: e.w_name,
              paid: e.paid_status ? (
                <MDBIcon icon="check" className="green-text" />
              ) : (
                ""
              ),
              invoice:
                e.InvoiceId !== null ? (
                  <MDBIcon
                    icon="download"
                    data-id={e.id}
                    onClick={handleInvoiceDownload}
                  />
                ) : (
                  ""
                ),
              clickEvent: () => {
                let id = e.id;
                handleServiceId(id);
              },
            },
          ],
          []
        );
        setServices((prev) => ({ ...prev, rows: arr }));
      }
      console.log(data);
    }
    getServiceList();
  }, [url, isModal, didrefresh]);

  async function getPartsByOrderId(id) {
    let res = await axios.get(`${url}/parts/order/${id}`);
    let data = res.data.parts;
    console.log(data);
    let filteredData = [];
    for (let i = 0; i < data.length; i++) {
      if (floatParser(data[i]["cost_vat"]) > 0) {
        filteredData.push(data[i]);
      }
    }
    setParts(filteredData);
  }

  // Helper sum function
  function sum(parts, work) {
    let total = sumFloat(parts, work);
    return total.toFixed(2);
  }

  // Service Modal toggle
  function toggle() {
    setIsModal(!isModal);
  }

  // Current Service Id
  function handleServiceId(id) {
    toggle();
    findIndex(id);
  }

  function handleInvoiceDownload(e) {
    let id = e.currentTarget.getAttribute("data-id");
    console.log(serviceList);
    getInvoiceNo(id).then(({ data }) => {
      getPdf(data.response[0].inv_no);
    });
  }

  async function getInvoiceNo(serviceid) {
    const res = await axios.get(`${url}/services/service/${serviceid}`);
    return res;
  }
  async function getPdf(invoiceNo) {
    const { data } = await axios.get(
      `https://vs-motors.s3.amazonaws.com/${invoiceNo}.pdf`,
      {
        responseType: "arraybuffer",
      }
    );
    const blob = new Blob([data], { type: "application/pdf" });
    saveAs(blob, `${invoiceNo}.pdf`);
  }

  function findIndex(id) {
    const fid = parseInt(id);
    const index = serviceList.findIndex((e) => e.id === fid);
    const curobj = serviceList[index];
    console.log(curobj);
    setCurrentService(curobj);
    getPartsByOrderId(curobj.orderID);
  }

  if (serviceList) {
    return (
      <MDBContainer className="mt-5">
        <MDBDataTableV5
          hover
          entriesOptions={[10, 20, 25]}
          entries={10}
          pagesAmount={4}
          data={services}
          searchTop
          searchBottom={false}
        />

        <ServiceModal
          isModal={isModal}
          toggle={toggle}
          service={currentService}
          parts={parts}
        />
      </MDBContainer>
    );
  } else {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <div className="spinner-border " role="status">
          <span className="sr-only ">Loading...</span>
        </div>
      </div>
    );
  }
};

export default ServiceList;
