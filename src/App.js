import './App.css';
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { boardDefault, generateWordSet } from './Words';
import GameOver from './components/GameOver';

import {createContext, useEffect, useState} from 'react'
export const AppContext = createContext()


function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterIndex: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetter, setDisabledLetter] = useState([])
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})

  const correctWord = "REACT"

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
    })
  }, [])

  const onSelect = (keyValue)=>{
    if (currentAttempt.letterIndex <= 4) {
      const currentBoard = [...board]
      currentBoard[currentAttempt.attempt][currentAttempt.letterIndex] = keyValue
      setBoard(currentBoard)
      setCurrentAttempt({attempt: currentAttempt.attempt , letterIndex :currentAttempt.letterIndex +1})
    }
  }
  const onEnter = ()=>{
    if (currentAttempt.letterIndex === 5){
      let currentWord =""
      for (let i=0; i<5; i++){
        currentWord += board[currentAttempt.attempt][i]
      }
      //check if the current word is in the dictionary or not, then go to new row
      if (wordSet.has(currentWord.toLowerCase())){
        setCurrentAttempt({attempt: currentAttempt.attempt+1, letterIndex: 0})
        //check if finish
        if (currentWord.toUpperCase() === correctWord.toUpperCase()){
          setGameOver({gameOver: true, guessedWord: true})
        } else {
          if  (currentAttempt.attempt === 5){
            setGameOver({gameOver: true, guessedWord: false})
          }
        } 
      } else {
        alert(currentWord + " has no meaning!")
      }



      
    }
  }
  const onDelete = ()=>{
    if (currentAttempt.letterIndex > 0) {
      const currentBoard = [...board]
      currentBoard[currentAttempt.attempt][currentAttempt.letterIndex-1] = "";
      setBoard(currentBoard)
      setCurrentAttempt({attempt: currentAttempt.attempt , letterIndex :currentAttempt.letterIndex-1})
    } else if (currentAttempt.letterIndex === 0){
      return null;
    }
  }

  return (
    <div className="App">
      <nav><h1>WORDLE</h1></nav>

      <AppContext.Provider 
        value={{
          board, setBoard,
          currentAttempt, setCurrentAttempt, 
          onSelect, onEnter, onDelete, 
          correctWord, 
          disabledLetter, setDisabledLetter, 
          gameOver, setGameOver}}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>


    </div>
  );
}

export default App;
