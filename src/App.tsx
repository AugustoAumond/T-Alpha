
import { useEffect, useState } from 'react'
import './App.css'

import { UserRegistration } from './assets/componentes/userRegistration/useRegistration'
import MainPage from './assets/componentes/mainPage/mainPage'

function App() {
  const [token, setToken] = useState<any>()

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  })

  return (
    <div className='flex w-full min-h-full p-2 bg-primaryColor '>

      {token === null ? 
        <UserRegistration setToken={setToken}/> :
        <MainPage />
      }


    </div>
  )
}

export default App
