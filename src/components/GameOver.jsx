import React, {useContext} from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {gameOver, setGameOver, correctWord, currentAttempt} =useContext(AppContext)
  return (
    <div classname="gameOver">
        <h3>{gameOver.guessedWord ? "Successful" : "Failed"}</h3>
        <h1>Correct word: {correctWord.toUpperCase()}</h1>
        {gameOver.guessedWord && (
            <h3>You guessed in {currentAttempt.attempt} attempts </h3>
        )}
    </div>
  )
}

export default GameOver