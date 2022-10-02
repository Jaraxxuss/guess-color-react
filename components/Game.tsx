import type { NextPage } from "next"
import { MouseEvent, useEffect, useState } from "react"

enum Result {
    NONE,
    CORRECT,
    WRONG
}

const shuffleArray = <T,>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return [...array]
}

const generateColors = (size: number, correctColor: string) => {

    return shuffleArray(
        [
            ...Array(size - 1)
                .fill(1)
                .map(() => getColorHash(genRanHex(6))), 
            correctColor
        ]
    )

}

const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const getColorHash = (hash: string) => `#${hash}`;

const Game: NextPage = () => {

    const [correctColor, setCorrectColor] = useState('')
    const [colors, setColors] = useState<string[]>([])
    const [result, setResult] = useState<Result>(Result.NONE)

    useEffect(() => {
        initState()
    }, [setCorrectColor, setColors])

    const initState = () => {
        const color = getColorHash(genRanHex(6))
        setCorrectColor(color)
        setColors(generateColors(3, color))
    }

    const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.value === correctColor) {
            setResult(Result.CORRECT)
            initState()
        } else {
            setResult(Result.WRONG)
        }
    }

    return (
      <div>
        <div style={{backgroundColor: correctColor, height: 40, width: 40}}>

        </div>
        <div>
        {
            colors
                .map(hex => {
                    return (
                        <button key={hex} value={hex} onClick={onButtonClick}>
                            {hex}
                        </button>
                    )
                })
        } 
        </div>
        <div>
            {
                result === Result.CORRECT && 'correct'
            }
                        {
                result === Result.WRONG && 'wrong'
            }

        </div>
      </div>
    )
}
  
  export default Game
  