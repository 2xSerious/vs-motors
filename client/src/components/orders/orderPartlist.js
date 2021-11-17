import { MDBContainer, MDBTable, MDBTableBody, MDBIcon } from "mdbreact";

export default function OrderPartList(props) {
  var count = 0;

  return (
    <MDBContainer>
      <MDBTable>
        <MDBTableBody>
          {props.parts.map((e) => {
            count++;
            return (
              <tr key={(e.partName, e.partValue)}>
                <td>{count}</td>
                <td>{e.supplierName}</td>
                <td>
                  <strong>{e.partName}</strong>
                </td>
                <td>{e.quantity}</td>
                <td>£{e.partValue}</td>
                <td>
                  <MDBIcon
                    icon="times"
                    name={e.partName}
                    onClick={props.onRemove}
                  />
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
