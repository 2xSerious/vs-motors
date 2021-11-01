import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import logo from "../../images/logo2.png";
import BillTo from "./InvoiceClient";
import InvoiceNo from "./invoiceNumber";
import Table from "./Table";
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 174,
    height: 86,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

// Create Document Component
const Invoice = ({ invoice, parts }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <InvoiceTitle />
        <InvoiceNo />
        <BillTo
          name={invoice.c_name}
          phone={invoice.phone}
          email={invoice.email}
          address={{
            street: invoice.street_address,
            city: invoice.city,
            postcode: invoice.postcode,
            country: invoice.country,
          }}
        />
        {parts ? (
          <Table
            items={parts}
            work={invoice.work}
            totalParts={invoice.total_vat}
          />
        ) : (
          ""
        )}
      </Page>
    </Document>
  );
};

export default Invoice;
