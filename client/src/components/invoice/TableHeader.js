import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#c9c9c9",
    fontStyle: "bold",
  },
  no: {
    width: "5%",
  },
  description: {
    width: "50%",
  },
  quantity: {
    width: "15%",
  },
  unitprice: {
    width: "15%",
  },
  total: {
    width: "15%",
  },
});
const TableHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.no}>#</Text>
      <Text style={styles.description}>Description</Text>
      <Text style={styles.quantity}>Quantity</Text>
      <Text style={styles.unitprice}>Unit Price</Text>
      <Text style={styles.total}>Total</Text>
    </View>
  );
};

export default TableHeader;
