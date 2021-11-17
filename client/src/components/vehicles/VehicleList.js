import { MDBContainer, MDBDataTableV5 } from "mdbreact";
import UpdateVehicle from "./VehicleUpdate";

export default function GetVehicleList(props) {
  if (props.vehicles.rows.length > 0) {
    return (
      <MDBContainer className="mt-5">
        <MDBDataTableV5
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={props.vehicles}
          searchTop
          searchBottom={false}
        />
        <UpdateVehicle
          handleSubmit={props.handleSubmit}
          forId={props.id}
          modal={props.modal}
          toggle={props.toggle}
          c_name={props.customer}
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
}
