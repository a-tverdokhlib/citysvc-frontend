import React from 'react'
import LoginOne from '../login-1'
import { useHistory } from "react-router-dom";
const Login = () => {
	let history = useHistory();
	function onForgotPassword() {
		history.push("/auth/forgot-password")
	}
	return (
		<LoginOne allowRedirect={true} otherSignIn={false} showForgetPassword={true} onForgetPasswordClick={onForgotPassword} />
	)
}

export default Login
