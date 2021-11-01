import { useState } from "react";

import { MDBContainer, MDBIcon, MDBBtn } from "mdbreact";
import CreateService from "./ServiceForm";
import ServiceList from "./ServiceList";

const Services = () => {
  const [isModal, setIsModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function toggle() {
    setIsModal(!isModal);
  }

  function refresher() {
    setRefresh(!refresh);
  }
  return (
    <>
      <MDBContainer className="mt-5">
        <MDBContainer className="d-flex flex-column align-items-center mb-3 ">
          <MDBIcon size="5x" icon="tools" />
          <div>
            <h1>Service Sheet</h1>
          </div>
        </MDBContainer>
        <MDBBtn color="success" onClick={toggle}>
          Crate Service
        </MDBBtn>
        <CreateService toggle={toggle} isModal={isModal} refresh={refresher} />
      </MDBContainer>
      <MDBContainer>
        <ServiceList didrefresh={refresh} />
      </MDBContainer>
    </>
  );
};

export default Services;
