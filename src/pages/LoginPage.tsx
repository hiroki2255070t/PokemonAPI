import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser';
import monster_ball from './../image/monster_ball.png'


export const LoginPage = React.memo(() => {
    const {user, setUser, insertUserPassword, getUserPassword, token, getToken} = useUser()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [isLogined, setIsLogined] = useState(false)

    const handleLogin = async () => {
        //setUser({Name: name, Password: password})
        //await getToken({Name: name, Password: password})
        try {
            const correctPassword = await getUserPassword({Name: name, Password: password});
            console.log("after await")
            
            //navigate('../pokemonList')
            if (password === correctPassword) {
                //setIsLogined(true)
                navigate('../pokemonList')
            } else {
                    console.log("パスワードが正しくありません")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin2 = () => {
        navigate('../pokemonList')
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-x-sm">
                <img className="mx-auto h-10 w-auto" src={monster_ball} alt='モンスターボール' />
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Sign in to your account
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium leading-6 text-gray-900'>User Name</label>
                        <div className='mt-2'>
                            <input value={name} onChange={(event) => setName(event.target.value)} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'></input>
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
                        </div>
                        <div className='mt-2'>
                            <input value={password} onChange={(event) => setPassword(event.target.value)} type='password' className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'></input>
                        </div>
                    </div>

                    <div>
                        <button type='button' onClick={handleLogin} className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
})