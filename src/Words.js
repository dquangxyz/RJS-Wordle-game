import wordBank from './wordle-bank.txt'

export const boardDefault = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
];

export const generateWordSet = async () => {
    let wordSet;
    await fetch(wordBank)
        .then((res) => res.text())
        .then((data) => {
            const wordArray = data.split("\n")
            wordSet = new Set(wordArray)         
        })
    return {wordSet}
}