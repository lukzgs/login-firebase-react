import React, { useContext } from "react"
import { Navigate } from "react-router-dom";
import { LoginForm } from "../../components/loginForm/LoginForm";
import { Context } from "../../context/context"

export const Login = () => {
  const { signed } = useContext(Context);

  return (
    <div className="login-page h-screen w-screen">
      <div className="login-form">
        <LoginForm />
        { !signed ? null : <Navigate to='/home' /> }    
      </div>
    </div>
  )
}
