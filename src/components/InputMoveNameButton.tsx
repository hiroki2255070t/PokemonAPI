import { useState } from "react"
import { useMoves } from "../hooks/useMoves"


export const InputNameButton = ({handleClick, getMoveByID}: {handleClick: (name: string) => void, getMoveByID: ({ moveID }: {moveID: number}) => Promise<void>}) => {
    const [variable, setVariable] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const {moves, setMoves, getMovesByKeyWord} = useMoves({ID: 1})


    return (
        <div className="relative">
            <input  
                type="text"
                value={variable} 
                onChange={(event) => {
                    setVariable(event.target.value)
                    isFocus ? getMovesByKeyWord({keyWord: event.target.value}) : () => {}
                }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setIsFocus(false)
                    }, 1000)
                }}
                className="w-64 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                placeholder="名前を入力!"
            />
            <button 
                onClick={() => {
                    handleClick(variable)
                    setVariable("")
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
                検索
            </button>
            {(moves !== undefined) && (moves.length > 0) && isFocus &&
                <ul className="bg-gray-200 p-1 rounded absolute z-10">
                    {moves.map((move) => {
                        return (
                            <li className="border-2 border-gray-300 hover:bg-gray-400" onClick={() => {
                                getMoveByID({moveID: move.ID})
                                setVariable("")
                                setMoves(undefined)
                                }}>
                                {move.ID}&nbsp;{move.Name}
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}