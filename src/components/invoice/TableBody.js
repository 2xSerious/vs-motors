import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1 solid grey",
    borderLeft: "1 solid grey",
    fontStyle: "bold",
  },
  no: {
    width: "5%",
    paddingTop: 5,
    textAlign: "center",
    borderRight: "1 solid grey",
  },
  description: {
    width: "50%",
    textAlign: "left",
    paddingTop: 5,
    paddingLeft: 5,
    borderRight: "1 solid grey",
  },
  quantity: {
    width: "15%",
    textAlign: "center",
    paddingTop: 5,
    borderRight: "1 solid grey",
  },
  unitprice: {
    width: "15%",
    textAlign: "center",
    paddingTop: 5,
    borderRight: "1 solid grey",
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingTop: 5,
    borderRight: "1 solid grey",
  },
});
const TableBody = ({ items, work }) => {
  var count = 1;
  console.log(items);
  return (
    <>
      {items
        ? items.map((item) => {
            console.log(item);
            return (
              <View style={styles.row} key={item.id}>
                <Text style={styles.no}>{count++}</Text>
                <Text style={styles.description}>{item.p_name}</Text>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text style={styles.unitprice}>
                  £{item.cost_vat / item.quantity}
                </Text>
                <Text style={styles.total}>£{item.cost_vat}</Text>
              </View>
            );
          })
        : ""}
      <View style={styles.row} key="work">
        <Text style={styles.no}>{count++}</Text>
        <Text style={styles.description}>Work</Text>
        <Text style={styles.quantity}>1</Text>
        <Text style={styles.unitprice}>£{work}</Text>
        <Text style={styles.total}>£{1 * work}</Text>
      </View>
    </>
  );
};

export default TableBody;
