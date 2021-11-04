import { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../host";

import { MDBContainer, MDBIcon } from "mdbreact";
import CreateWorker from "./WorkerForm";
import GetWorkerList from "./WorkerList";
import { confirmAlert } from "react-confirm-alert";

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const url = host.url;

  useEffect(() => {
    async function getWorkers() {
      let res = await axios.get(`${url}/workers/`);
      let data = res.data.response;
      setWorkers(data);
    }
    getWorkers();
  }, [url, submit]);

  // HANDLE INPUTS
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      e.target.className += " was-validated";
      return;
    }
    checkDuplicate();
    clearFields(); // Clear input fields
  };

  function toggleSubmit() {
    setSubmit(!submit);
  }
  async function checkDuplicate() {
    try {
      let res = await axios.get(`${url}/workers/${name}`);
      let result = res.data.response;
      if (result.length > 0) {
        confirmAlert({
          title: "Error",
          message: `${result[0].w_name} already exist!`,
          buttons: [
            {
              label: "Ok",
              onClick: () => {
                return;
              },
            },
          ],
        });
      } else {
        insertWorker().then(toggleSubmit());
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function insertWorker() {
    try {
      await axios.post(`${url}/workers/`, {
        wName: name,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function clearFields() {
    setName("");
  }

  return (
    <MDBContainer className="mt-5">
      <MDBContainer className="d-flex flex-column align-items-center mb-3 mb-md-0">
        <MDBIcon size="5x" icon="hard-hat" />
        <div>
          <h1>Workers</h1>
        </div>
      </MDBContainer>
      <CreateWorker
        onNameChange={handleChangeName}
        onSubmit={handleSubmit}
        name={name}
      />
      <GetWorkerList handleSubmit={toggleSubmit} workers={workers} />
    </MDBContainer>
  );
}

export default Workers;
