import { useState } from "react"
import { usePokemons } from "../hooks/usePokemons"


export const InputNameButton = ({handleClick, getPokemonByID}: {handleClick: (name: string) => void, getPokemonByID: ({ pokemonID }: {pokemonID: number}) => Promise<void>}) => {
    const [variable, setVariable] = useState("")
    const [isFocus, setIsFocus] = useState(false)
    const {pokemons, setPokemons, getPokemponsByKeyWord} = usePokemons()


    return (
        <div className="relative">
            <input  
                type="text"
                value={variable} 
                onChange={(event) => {
                    setVariable(event.target.value)
                    isFocus ? getPokemponsByKeyWord({keyWord: event.target.value}) : () => {}
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
            {(pokemons !== undefined) && (pokemons.length > 0) && isFocus &&
                <ul className="bg-gray-200 p-1 rounded absolute z-10">
                    {pokemons.map((pokemon) => {
                        return (
                            <li className="border-2 border-gray-300 hover:bg-gray-400" onClick={() => {
                                getPokemonByID({pokemonID: pokemon.ID})
                                setVariable("")
                                setPokemons(undefined)
                                }}>
                                {pokemon.ID}&nbsp;{pokemon.Name}
                            </li>
                        )
                    })}
                </ul>
            }
        </div>
    )
}