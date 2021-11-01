import { Fragment } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";
// import logo from './logo.svg';

function InvoiceViewer({ invoice, parts }) {
  return (
    <Fragment>
      {/* <PDFViewer width="auto" height="500">
        <Invoice invoice={invoice} parts={parts} />
      </PDFViewer> */}
      <PDFDownloadLink
        document={<Invoice invoice={invoice} parts={parts} />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </Fragment>
  );
}

export default InvoiceViewer;
