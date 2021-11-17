import axios from "axios";
import { useEffect, useState } from "react";
import { host } from "../host";
import {
  MDBContainer,
  MDBCard,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBCardHeader,
  MDBCardBody,
} from "mdbreact";

export default function CurrentServices() {
  const url = host.url;
  const [services, setServices] = useState("");

  useEffect(() => {
    async function getCurrentServices() {
      const res = await axios.get(`${url}/services/current`);
      const data = res.data.response;
      console.log(data);
      if (data.length > 0) {
        setServices(data);
      }
    }
    getCurrentServices();
  }, [url]);

  return (
    <MDBContainer className="my-5">
      <MDBCard className="cloudy-knoxville-gradient">
        <div className="d-flex justify-content-start ml-4 mt-5">
          <div className="d-flex flex-column justify-content-center">
            <h4>Pending Services</h4>
            <MDBTable small>
              <MDBTableBody>
                {services ? (
                  services.map((e) => {
                    return (
                      <tr>
                        <td>
                          {
                            <MDBIcon
                              icon="tools"
                              className="orange-text"
                              spin
                            />
                          }
                        </td>
                        <td>{e.created_at}</td>
                        <td>{e.description}</td>
                        <td>
                          {e.make} {e.model} {e.reg_num}
                        </td>
                        <td>{e.c_name}</td>
                      </tr>
                    );
                  })
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "300px" }}
                  >
                    <div className="spinner-border " role="status">
                      <span className="sr-only ">Loading...</span>
                    </div>
                  </div>
                )}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </MDBCard>
    </MDBContainer>
  );
}
