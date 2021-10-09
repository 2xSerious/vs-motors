import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

export default function PartsList() {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3001/parts/");
      setParts(response.data["parts"]);
    }
    fetchData();
  }, []);

  if (parts) {
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Part</th>
              <th>Supplier</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((e) => {
              return (
                <tr>
                  <td>{e.id}</td>
                  <td>{e.part}</td>
                  <td>{e.supplier}</td>
                  <td>{e.client}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return <div>Loading..</div>;
  }
}
