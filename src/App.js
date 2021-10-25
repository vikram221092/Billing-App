import React , { useEffect , useState } from 'react'
import Router from './components/helper/Router'
import WebFont from 'webfontloader'

const App = (props) => {

  const [isLoggedIn,setIsLoggedIn]=useState( false)

  useEffect(() => {
      WebFont.load({
              google: {
                  families: ['Roboto','sans-serif']
              }
      });
  }, []); 

  const handleLoginStatus=()=>{
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <div>
          <Router isLoggedIn={isLoggedIn} handleLoginStatus={handleLoginStatus} />
    </div>
  )
}

export default App
