import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableBlank from "./TableBlank";

const Table = ({ items, work, totalParts }) => {
  const rows = 12;
  const styles = StyleSheet.create({
    table: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 34,
    },
  });
  console.log(items);
  return (
    <View style={styles.table}>
      <TableHeader />
      <TableBody items={items} work={work} />
      <TableBlank rows={rows - items.length} />
      <TableFooter parts={totalParts} work={work} />
    </View>
  );
};

export default Table;
