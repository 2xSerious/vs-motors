import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 18,
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
const TableBlank = ({ rows }) => {
  const count = Array(rows).fill(0);
  console.log(count);
  return (
    <>
      {count
        ? count.map((x, i) => {
            return (
              <View style={styles.row} key={`Blank${i}`}>
                <Text style={styles.no}></Text>
                <Text style={styles.description}></Text>
                <Text style={styles.quantity}></Text>
                <Text style={styles.unitprice}></Text>
                <Text style={styles.total}></Text>
              </View>
            );
          })
        : ""}
    </>
  );
};

export default TableBlank;
