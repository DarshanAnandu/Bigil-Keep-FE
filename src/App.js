import React, { useEffect, useState } from 'react'
import Mainpage from './components/pages/MainPage2';
import Signup from './components/pages/Signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('setIsLoggedIn') || false);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('setIsLoggedIn') || false)
  }, [])
  return (
    <div>
      {isLoggedIn ? <Mainpage /> : <Signup />}
    </div>
  )
}

export default App
