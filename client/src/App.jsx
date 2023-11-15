import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import viteLogo from '/vite.svg'
import Components from './components/index'
import {Landing,Auth,NotFound} from './pages/index'
import { useStore, StoreProvider } from './store'


function App() {
  const {setState} = useStore()
 
  useEffect(()=>{
    const fetch = async ()=>{
      
      const res = await axios.get('/auth/authenticate')
      console.log(res.data)
      // const stuff = await res.json()
      await setState((oldstate)=>({
        ...oldstate,
        user:res.data.user
      }))
      // setisloading(false)
    }
    fetch()
  },[])

  return (
    <>
    
    <Components.Header />
      
      <Container>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path='/register' element={<Auth islogin={false} />}/>
          <Route path='/login' element={<Auth islogin={true} />}/>


          
          {/* catch all 404, must be at the bottom */}
          <Route path='*' element={<NotFound/>}/>
        </Routes>

      </Container>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        </div>
        
    </>
  )
}

export default App
