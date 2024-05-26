import {TextInput, View, StyleSheet, Alert} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";
import {Colors} from "../constants/colors";


export default function StartGameScreen({setUserNumber}) {

    const [enteredNumber, setEnteredNumber] = useState("")

    function resetInputHandler() {
        setEnteredNumber("")
    }

    function confirmInputHandler() {
        const chosenNumber = +enteredNumber
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid number",
                "Number has to be a value between 1 and 99.",
                [{text: "Ok", style: "destructive", onPress: resetInputHandler}]
            )
            return
        }
        setUserNumber(chosenNumber)
    }

    return <View style={styles.inputContainer}>
        <TextInput
            placeholder=""
            style={styles.numberInput}
            maxLength={2}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            value={enteredNumber}
            onChangeText={(v) => setEnteredNumber(v)}
        />
        <View style={styles.buttonsContainer}>
            <View style={styles.button}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.button}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: "center",
        marginTop: 100,
        marginHorizontal: 24,
        borderRadius: 7,
        padding: 16,
        backgroundColor: Colors.primary800,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    numberInput: {
        width: 60,
        height: 50,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    button: {
        flex: 1
    }
})