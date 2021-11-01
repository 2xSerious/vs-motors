import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});
const BillTo = ({ name, phone, email, address }) => (
  <View>
    <Text style={styles.billTo}>Bill To:</Text>
    <Text>{name}</Text>
    <Text>{address.street}</Text>
    <Text>{address.city}</Text>
    <Text>{address.postcode}</Text>
  </View>
);

export default BillTo;
