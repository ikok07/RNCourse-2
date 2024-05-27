import {StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import StartGameScreen from "./screens/StartGameScreen";
import {LinearGradient} from "expo-linear-gradient";
import {useState} from "react";
import GameScreen from "./screens/GameScreen";
import {Colors} from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [rounds, setRounds] = useState([])
  const [gameIsOver, setGameIsOver] = useState(true)

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })

  if (!fontsLoaded) return <AppLoading/>

  function restartGame() {
    setUserNumber(null)
    setGameIsOver(true)
    setRounds([])
  }

  let screen = <StartGameScreen setGameIsOver={setGameIsOver} setUserNumber={setUserNumber}/>
  if (userNumber) screen = <GameScreen chosenNumber={userNumber} rounds={rounds} setRounds={setRounds} setGameIsOver={setGameIsOver}/>
  if (userNumber && gameIsOver) screen = <GameOverScreen userNumber={userNumber} roundsNumber={rounds.length} onStartNewGame={restartGame}/>

  return <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
    <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
        style={styles.rootScreen}
    >
      <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
    </ImageBackground>
  </LinearGradient>
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
});
