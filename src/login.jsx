import axios from "axios"
import { useRef, useState, useEffect } from "react"

axios.defaults.withCredentials = true

export function Login() {
  let [user, setUser] = useState(null)
  let [loginStatus, setLoginStatus] = useState(false)
  let [loginMessage, setLoginMessage] = useState('')

  let login = useRef()
  let passw = useRef()

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if(response.data.loggedIn)
        setLoginStatus(response.data.user.username)
    })
  }, [])

  const onLogin = () => {
    axios
      .post("http://localhost:3001/login", {
        username: login.current.value,
        password: passw.current.value,
      })
      .then((response) => {
        console.log(response.data)
        if(response.data.user) {
          setUser(response.data.user)
          setLoginStatus(response.data.auth)
          setLoginMessage('')
          localStorage.setItem("x-access-token", response.data.token) //? Read about Bearer token
        } else {
          setLoginStatus(response.data.auth)
          setLoginMessage(response.data.message)
        }
      })
  }

  const userAuthenticated = () => {
    const token = localStorage.getItem("x-access-token")
    console.log('token from local storage: ', token)
    axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": token
      }
    }).then(response => {
      console.log(response)
    })
  }

  const closeConnection = () => {
    axios.get("http://localhost:3001/closeConnection").then(response => console.log(response.data.message)).catch(err => console.log(err.data.message))
  }
  const createConnection = () => {
    axios.get("http://localhost:3001/createConnection").then(response => console.log(response.data.message)).catch(err => console.log(err.data.message))
  }

  return (
    <div>
      {loginStatus && <div>Logged in: <span style={{fontWeight:'bold'}}>{user.username}</span></div>}
      <label htmlFor="">Username</label>
      <input type="text" ref={login} />
      <br />
      <label htmlFor="">Password</label>
      <input type="password" ref={passw} />
      <br />
      <button onClick={onLogin}>Login</button>
      {loginStatus && <button onClick={userAuthenticated}>Check if authenticated</button> }
      {loginMessage}
      <div>{}</div>
      <button onClick={createConnection}>Create connection</button>
      <button onClick={closeConnection}>Close connection</button>
    </div>
  )
}
