import './App.css';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import BookDetail from './components/BookDetail'
import Home from './components/Home';
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import EditBook from './components/EditBook';
import Nav from './components/Nav';
import Cookies from 'js-cookie';
import jwtdecode from 'jwt-decode'
import UserDetail from './components/UserDetail';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [welcome, setWelcome] = useState()
  const [count, setCount] = useState(0)
  // const [count2, setCount2] = useState(0)
  const [user, setUser] = useState()
  const cookieValue = Cookies.get('userToken');
  
  useEffect(() => {
    // console.log(`appjs ue`, count)
    setCount(count+1)
    // console.log(`appjs ue2`, count)
    if(cookieValue){
      setWelcome(jwtdecode(cookieValue).firstName + " " + jwtdecode(cookieValue).lastName)
      setUser(jwtdecode(cookieValue))
      setLoggedIn(true)
    }else{
      setWelcome("Guest")
    }
  }, []);
  // console.log(`user`, user)
  return (
    <div className="App">
      <Nav cookieValue={cookieValue} welcome={welcome} setWelcome={setWelcome} loggedIn={loggedIn} setLoggedIn={setLoggedIn} count={count}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard cookieValue={cookieValue} user={user} count={count} setCount={setCount}/>}/>
        <Route path="/login" element={<LoginForm count={count} setCount={setCount} setWelcome={setWelcome} cookieValue={cookieValue} />}/>
        <Route path="/register" element={<RegisterForm count={count} setCount={setCount}/>}/>
        <Route path="/books/:id" element={<BookDetail welcome={welcome} user={user}/>}/>
        <Route path="/users/:id" element={<UserDetail welcome={welcome} user={user}/>}/>
        <Route path="/books/:id/edit" element={<EditBook/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
