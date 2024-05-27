import {TextInput, View, Text, StyleSheet, Alert} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";
import {Colors} from "../constants/colors";
import {Title} from "../components/ui/Title";
import Card from "../components/ui/Card";
import {InstructionText} from "../components/ui/InstructionText";


export default function StartGameScreen({setGameIsOver, setUserNumber}) {

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
        setGameIsOver(false)
    }

    return <View style={styles.rootContainer}>
        <Title>Guess My Number</Title>
        <Card>
            <InstructionText>Enter a number</InstructionText>
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
        </Card>
    </View>
}

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      marginTop: 100,
        alignItems: "center"
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