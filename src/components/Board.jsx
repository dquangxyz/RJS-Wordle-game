import React, {useState} from 'react'
import Letter from './Letter'

function Board() {
    return (
        <div className="board">
            <div className="row">
                <Letter letterPosition={0} attempValue={0} />
                <Letter letterPosition={1} attempValue={0} />
                <Letter letterPosition={2} attempValue={0} />
                <Letter letterPosition={3} attempValue={0} />
                <Letter letterPosition={4} attempValue={0} />
            </div>
            <div className="row">
                <Letter letterPosition={0} attempValue={1} />
                <Letter letterPosition={1} attempValue={1} />
                <Letter letterPosition={2} attempValue={1} />
                <Letter letterPosition={3} attempValue={1} />
                <Letter letterPosition={4} attempValue={1} />
            </div>
            <div className="row">
                <Letter letterPosition={0} attempValue={2} />
                <Letter letterPosition={1} attempValue={2} />
                <Letter letterPosition={2} attempValue={2} />
                <Letter letterPosition={3} attempValue={2} />
                <Letter letterPosition={4} attempValue={2} />
            </div>
            <div className="row">
                <Letter letterPosition={0} attempValue={3} />
                <Letter letterPosition={1} attempValue={3} />
                <Letter letterPosition={2} attempValue={3} />
                <Letter letterPosition={3} attempValue={3} />
                <Letter letterPosition={4} attempValue={3} />
            </div>
            <div className="row">
                <Letter letterPosition={0} attempValue={4} />
                <Letter letterPosition={1} attempValue={4} />
                <Letter letterPosition={2} attempValue={4} />
                <Letter letterPosition={3} attempValue={4} />
                <Letter letterPosition={4} attempValue={4} />
            </div>
            <div className="row">
                <Letter letterPosition={0} attempValue={5} />
                <Letter letterPosition={1} attempValue={5} />
                <Letter letterPosition={2} attempValue={5} />
                <Letter letterPosition={3} attempValue={5} />
                <Letter letterPosition={4} attempValue={5} />
            </div>
        </div>
    )
}

export default Board