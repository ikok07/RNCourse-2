import {Alert, FlatList, StyleSheet, Text, View} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {Title} from "../components/ui/Title";
import {useEffect, useState} from "react";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import {InstructionText} from "../components/ui/InstructionText";
import {Ionicons} from "@expo/vector-icons"
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1
let maxBoundary = 100

export default function GameScreen({chosenNumber, rounds, setRounds, setGameIsOver}) {
    const initialGuess = generateRandomBetween(1, 100, chosenNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    useEffect(() => {
        if (currentGuess === chosenNumber) setGameIsOver(true)
    }, [currentGuess, chosenNumber, setGameIsOver]);

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

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
        setRounds(round => [newRndNumber, ...round])
    }

    const guessRoundsListLength = rounds.length

    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                        <Ionicons name="remove" size={24} color="white"/>
                    </PrimaryButton>
                </View>
                <View style={styles.button}>
                    <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                        <Ionicons name="add" size={24} color="white"/>
                    </PrimaryButton>
                </View>
            </View>
        </Card>
        <View style={styles.list}>
            {/*{rounds.map((round, index) => <Text key={index}>{round}</Text>)}*/}
            <FlatList
                data={rounds}
                renderItem={({item, index}) => {
                return <GuessLogItem guess={item} roundNumber={guessRoundsListLength - index}/>
                }}
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        padding: 12
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    button: {
        flex: 1
    },
    list: {
        height: 250,
        marginTop: 30
    }
})