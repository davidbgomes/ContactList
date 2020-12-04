import React from 'react'
import "./styles/SignIn.css"
import { withRouter, Link } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import {Helmet} from 'react-helmet'

import firebase from "firebase"

class SignIn extends React.Component{

	constructor(){
		super()
		this.state={
			email:"",
			password:"",
			error:"",
			showMyAlert: false,
		}
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.hideAlert = this.hideAlert.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	login = () => {
        this.props.login()
    }

	async handleSubmit (event){
		event.preventDefault()
   		const email = this.state.email
   		const password = this.state.password

   		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>{

		return firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
			this.setState({
				error:"",
			},this.login)

			this.props.history.push('/Dashboard')
     	})
     	.catch((error) => {
     		var errorCode = error.code
       		this.setState({
       			showMyAlert:true,
       		}, () => {
       			if (errorCode === 'auth/invalid-email'){
       				this.setState({
       					error:"Invalid Email"
       				})
       				//alert("Email inválido")
       			}
       			else if(errorCode === 'auth/user-disabled'){
       				this.setState({
       					error:"User Disabled"
       				})
       				//alert("Utilizador desabilitado.")
       			}
       			else if(errorCode === 'auth/user-not-found'){
       				this.setState({
       					error:"No user exists with given Email"
       				})
       				//alert("Não existe utilizador com o Email introduzido")
       			}
       			else if(errorCode === 'auth/wrong-password'){
       				this.setState({
       					error:"Wrong Password"
       				})
       				//alert("Password inválida")
       			}
       		})
     	})
    })

 	}

	handleEmailChange(event) {
    	this.setState({
    		email: event.target.value,
    	})
  	}

  	handlePasswordChange(event) {
    	this.setState({
    		password: event.target.value,
    	})
  	}

  	hideAlert(){
  		this.setState({
  			showMyAlert:false,
  		})
  	}

	render(){

/*		console.log("myalert",this.state.error)
		console.log("showMyAlert",this.state.showMyAlert)*/

		return (
			<React.Fragment>
				<Helmet>
	    			<title>Sign In</title>
    			</Helmet>
				{ this.props.authenticated === false ?
					<div className="container-md mt-4 signInDiv">

						{ this.state.showMyAlert &&
							<div className="alert alert-danger alert-dismissible fade show" role="alert">
		  						<span>{this.state.error}</span>
		  						<button type="button" className="close" onClick={() => this.hideAlert()} datadismiss="alert" aria-label="Close">
		    						<span aria-hidden="true">&times;</span>
		  						</button>
							</div>

						}


						<h2 className="pb-3 text-center">Sign In</h2>
						<form className="border">
							<div className="form-group pb-3">
								<TextField
									required
									id="email"
									onChange={this.handleEmailChange}
									label="Email" variant="outlined"
									InputProps={{
							        	startAdornment: (
							            	<InputAdornment position="start">
							              		<MailOutlineOutlinedIcon/>
							            	</InputAdornment>
							          	),
							        }}
								/>
							</div>
							<div className="form-group mb-1">
								<TextField
									required
									type="password"
									autoComplete="current-password"
									id="password"
									onChange={this.handlePasswordChange}
									label="Password"
									variant="outlined"
									minLength="5"
									InputProps={{
							        	startAdornment: (
							            	<InputAdornment position="start">
							              		<LockOutlinedIcon/>
							            	</InputAdornment>
							          	),
							        }}
								/>
							</div>
							<div>
								<Link to="/RecoverPassword">
									<small>Forgot my password</small>
								</Link>
							</div>
							
								<button type="submit" onClick={this.handleSubmit} className="btn btn-primary mb-2 mt-3">Sign In</button>
							
						</form>
					</div>

				: this.props.history.push('/')
				}
			</React.Fragment>
		)
	}
}

export default withRouter(SignIn)