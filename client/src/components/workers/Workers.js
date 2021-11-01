import { useEffect, useState } from "react";
import axios from "axios";

import { MDBContainer, MDBIcon } from "mdbreact";
import CreateWorker from "./WorkerForm";
import GetWorkerList from "./WorkerList";

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    async function getWorkers() {
      const res = await axios.get("http://localhost:3001/workers/");
      let data = res.data.response;
      setWorkers(data);
      console.log(data);
    }
    getWorkers();
    setSubmit(false);
  }, [submit]);

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
    insertWorker(); // create user API
    clearFields(); // Clear input fields
    toggleSubmit(); // Update list After Submit
  };

  function toggleSubmit() {
    setSubmit(!submit);
  }

  async function insertWorker() {
    try {
      await axios.post("https://vs-motors.herokuapp.com/workers/", {
        wName: name,
      });
    } catch (error) {
      alert("Worker already exist");
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
