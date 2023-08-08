import React, {useState} from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const Register = () => {
const [email, setEmail] = useState('')
const [password, setPassWord] = useState('')

const navigate = useNavigate();

  return (
    <div>Register</div>
  )
}

export default Register