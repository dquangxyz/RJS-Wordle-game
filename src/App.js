import './App.css';
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { boardDefault, generateWordSet } from './Words';
import GameOver from './components/GameOver';
import Instruction from './components/Instruction';
import $ from 'jquery';


import {createContext, useEffect, useState} from 'react'
export const AppContext = createContext()


function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterIndex: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetter, setDisabledLetter] = useState([])
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  const [showInstruction, setShowInstruction] = useState(false)

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
      // if (wordSet.has(currentWord.toLowerCase())){
      //   setCurrentAttempt({attempt: currentAttempt.attempt+1, letterIndex: 0})
      //   //check if finish
      //   if (currentWord.toUpperCase() === correctWord.toUpperCase()){
      //     setGameOver({gameOver: true, guessedWord: true})
      //   } else {
      //     if  (currentAttempt.attempt === 5){
      //       setGameOver({gameOver: true, guessedWord: false})
      //     }
      //   } 
      // } else {
      //   alert(currentWord + " has no meaning!")
      // }

      //check if the current word is in the dictionary or not
      const url = "https://api.wordnik.com/v4/word.json/" + currentWord.toLowerCase() + "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"; 
      $.ajax({
          type: "GET",
          url: url
      }).done(() => { //if yes, go to new row
        setCurrentAttempt({attempt: currentAttempt.attempt+1, letterIndex: 0})
        if (currentWord.toUpperCase() === correctWord.toUpperCase()){
          setGameOver({gameOver: true, guessedWord: true})
        } else {
          if  (currentAttempt.attempt === 5){
            setGameOver({gameOver: true, guessedWord: false})
          }
        }
      }).fail(() => { //if no, raise alert
          alert(currentWord + " has no meaning!")
      });      
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
      <div>
        <h2 class="how-to-play" onClick={()=> setShowInstruction(!showInstruction)}>How to play</h2>
        {showInstruction ? <Instruction /> : null}
      </div>      
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
