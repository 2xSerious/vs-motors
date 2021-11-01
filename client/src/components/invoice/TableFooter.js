import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  con: {
    display: "flex",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1 solid grey",
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    paddingTop: 5,
    paddingRight: 2,
  },

  total: {
    width: "15%",
    textAlign: "right",
    paddingTop: 5,
    borderLeft: "1 solid grey",
  },
});
const TableFooter = ({ parts, work }) => {
  console.log(parts, work);
  const sum = parseFloat(parts) + parseFloat(work);
  const sumvat = parseFloat(sum * 1.2).toFixed(2);
  console.log(sum);
  return (
    <>
      <View style={styles.con}>
        <View style={styles.row}>
          <Text style={styles.description}>Total</Text>
          <Text style={styles.total}>£ {sum}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Vat</Text>
          <Text style={styles.total}>£ {(sum * 0.2).toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Total Vat</Text>
          <Text style={styles.total}>£ {sumvat}</Text>
        </View>
      </View>
    </>
  );
};

export default TableFooter;
