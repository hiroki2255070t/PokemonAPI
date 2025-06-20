import { useState } from "react"
import axios from "axios"
import { Move, newMove } from "../domains/move/entity"


export const useMoves = ({ID}: {ID: number | string | undefined | null}) => {

    /* // moveIDの型をnumberに変換
    const pokemonID = typeof(ID) === "number" ? ID : typeof(ID) === "string" ? parseInt(ID, 10) : 1 */

    const [moves, setMoves] = useState<Move[]>()


    const getMovesByPokemonID = async ({pokemonID}: {pokemonID: number}) => {
        const cookies = document.cookie.split(";").map(cookie => cookie.trim())
        const jwtCookie = cookies.find(cookie => cookie.startsWith("jwtToken"))
        if (jwtCookie) {
            const token = jwtCookie.split("=")[1]
            try {
                const config = {
                    params: {
                        pokemonID: pokemonID
                    },
                    headers: {}
                }

                if (token) {
                    config.headers = {
                        'Authorization': token
                    }
                }

                const URL = "http://localhost:8080/move/byPokemonID/"
                const response = await axios.get(URL, config)
                const data = response.data
                setMoves(data)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const getAllMoves = async () => {
        const cookies = document.cookie.split(";").map(cookie => cookie.trim())
        const jwtCookie = cookies.find(cookie => cookie.startsWith("jwtToken"))
        if (jwtCookie) {
            const token = jwtCookie.split("=")[1]
            try {
                const config = {
                    params: {
                    },
                    headers: {}
                }

                if (token) {
                    config.headers = {
                        'Authorization': token
                    }
                }

                const URL = "http://localhost:8080/move/all/"
                const response = await axios.get(URL, config)
                const data = response.data
                setMoves(data)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const getMovesByKeyWord = async ({keyWord}: {keyWord: string}) => {
        const cookies = document.cookie.split(";").map(cookie => cookie.trim())
        const jwtCookie = cookies.find(cookie => cookie.startsWith("jwtToken"))
        if (jwtCookie) {
            const token = jwtCookie.split("=")[1]
            try {
                const config = {
                    params: {
                        KeyWord: keyWord
                    },
                    headers: {}
                }

                if (token) {
                    config.headers = {
                        'Authorization': token
                    }
                }

                const URL = "http://localhost:8080/move/byKeyWord/"
                const response = await axios.get(URL, config)
                const data = response.data
                data ? setMoves(data.map((move: Move) => move)) : setMoves([newMove()])
            } catch (error) {
                console.error(error)
            }
        }
    }

    return {moves, setMoves, getMovesByPokemonID, getAllMoves, getMovesByKeyWord}
}