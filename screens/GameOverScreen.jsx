import {Image, Text, StyleSheet, View} from "react-native";
import {Title} from "../components/ui/Title";
import {Colors} from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

export default function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){
    return <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require("../assets/images/success.png")} />
        </View>
        <Text style={styles.text}>Your phone needed <Text style={styles.textHighlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.textHighlight}>{userNumber}</Text></Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        width: "100%",
        height: "100%"
    },
    imageContainer: {
        width: 300,
        height: 300,
        overflow: "hidden",
        margin: 36
    },
    text: {
        fontFamily: "open-sans",
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    textHighlight: {
        fontFamily: "open-sans-bold",
        color: Colors.primary500
    }
})