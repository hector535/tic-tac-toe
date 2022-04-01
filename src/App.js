import { useContext } from "react";
import GameContext from "./store/game-context";

import HomeScreen from "./components/Home/HomeScreen";
import GameScreen from "./components/Game/GameScreen";
import classes from "./App.module.css";

function App() {
  const { mode } = useContext(GameContext);
  return (
    <main className={classes["main"]}>
      {!mode && <HomeScreen />}
      {mode && <GameScreen />}
    </main>
  );
}

export default App;
