import {StyleSheet, Text, TextInput, View} from "react-native";
import PrimaryButton from "./PrimaryButton";
import {Colors} from "../../constants/colors";

export default function Card({children}) {
    return <View style={styles.card}>{children}</View>
}
const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        marginTop: 36,
        marginHorizontal: 24,
        borderRadius: 7,
        padding: 16,
        backgroundColor: Colors.primary800,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    }
})