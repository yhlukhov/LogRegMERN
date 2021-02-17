import { useState } from "react"
import axios from 'axios'
axios.defaults.withCredentials=true

export function Register(){
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const submit = () => {
        axios.post("http://localhost:3001/register", {
          username: usernameReg,
          password: passwordReg
        }).then(res => console.log(res))
  }

  return(
    <div>
      <label htmlFor="">Username</label>
      <input type="text" onChange={(e)=>setUsernameReg(e.target.value)}/><br/>
      <label htmlFor="">Password</label>
      <input type="password" onChange={(e)=>setPasswordReg(e.target.value)} /><br/>
      <button onClick={submit}>Register</button>
    </div>
  )
}