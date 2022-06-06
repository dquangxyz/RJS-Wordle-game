import React, {useContext, useEffect} from 'react'
import {AppContext} from '../App'

function Letter({letterPosition, attempValue}) {
  const {board, currentAttempt, correctWord, disabledLetter, setDisabledLetter}= useContext(AppContext)
  const letter = board[attempValue][letterPosition];


  let letterState =""
  if (currentAttempt.attempt>attempValue){
    if (letter === correctWord.toUpperCase().charAt(letterPosition)){
      letterState = "correct";
    } else if (correctWord.toUpperCase().includes(letter) && letter !== ""){
      letterState = "almost";
    } else if (letter !== ""){
      letterState= "error";   
    }   
  }

  useEffect(() => {
    if (letter !== ""){
      setDisabledLetter((prev) => [...prev, letter])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentAttempt.attempt])  



  return <div className="letter" id={letterState}>{letter}</div>
}

export default Letter