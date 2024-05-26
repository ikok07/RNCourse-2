import {Alert, StyleSheet, Text, View} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {Title} from "../components/ui/Title";
import {useState} from "react";
import NumberContainer from "../components/game/NumberContainer";

let minBoundary = 1
let maxBoundary = 100

export default function GameScreen({chosenNumber}) {
    const initialGuess = generateRandomBetween(minBoundary, maxBoundary, chosenNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    function generateRandomBetween(min, max, exclude) {
        const rndNum = Math.floor(Math.random() * (max - min)) + min
        if (rndNum === exclude) return generateRandomBetween(min, max, exclude)
        else return rndNum
    }
    function nextGuessHandler(direction) {
        if ((direction === "lower" && currentGuess < chosenNumber) || (direction === "greater" && currentGuess > chosenNumber)) {
            Alert.alert("Don't lie", "You know that this is wrong...", [{text: "Sorry", style: "cancel"}])
            return
        }

        if (direction === "lower") maxBoundary = currentGuess
        else minBoundary = currentGuess + 1

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
    }

    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
            <Text>Higher or lower?</Text>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <PrimaryButton onPress={() => nextGuessHandler("lower")}>-</PrimaryButton>
                </View>
                <View style={styles.button}>
                    <PrimaryButton onPress={() => nextGuessHandler("greater")}>+</PrimaryButton>
                </View>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        padding: 12
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    button: {
        flex: 1
    }
})