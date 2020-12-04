import React from 'react'
import "./styles/RecoverPassword.css"
import {  withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Helmet} from 'react-helmet'
import firebase from "./config/initFirebase"

class RecoverPassword extends React.Component{

	constructor(){
		super()
		this.state={
			email:"",
			error:"",
			showErrorAlert: false,
			showSuccessAlert: false,
		}
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.hideErrorAlert = this.hideErrorAlert.bind(this)
		this.hideSuccessAlert = this.hideSuccessAlert.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	async handleSubmit (event){
		event.preventDefault()
   		const email = this.state.email

		firebase.auth().sendPasswordResetEmail(email).then( () => {
	 		this.setState({
				showSuccessAlert: true,
			})
		})
	    .catch(error => {
	       	this.setState({
	       		showErrorAlert:true,
	     	})
	    })
 	}

	handleEmailChange(event) {
    	this.setState({
    		email: event.target.value,
    	})
  	}

  	hideErrorAlert(){
  		this.setState({
  			showErrorAlert:false,
  		})
  	}

  	hideSuccessAlert(){
  		this.setState({
  			showSuccessAlert:false,
  		})
  	}

	render(){

		return (
			<React.Fragment>
				<Helmet>
	    			<title>Recover Password</title>
    			</Helmet>
				{ this.props.authenticated === false ?
					<div className="container-md mt-4 recoverPasswordDiv">

						{ this.state.showErrorAlert &&
							<div class="alert alert-danger alert-dismissible fade show" role="alert">
		  						<span>Error sending Email. Please verify the email introduced is correct and try again.</span>
		  						<button type="button" className="close" onClick={() => this.hideErrorAlert()} dataDismiss="alert" ariaLabel="Close">
		    						<span ariaHidden="true">&times;</span>
		  						</button>
							</div>

						}

						{ this.state.showSuccessAlert &&
							<div class="alert alert-success alert-dismissible fade show" role="alert">
		  						<span>Email sent successfully! Check your inbox to recover your account.</span>
		  						<button type="button" className="close" onClick={() => this.hideSuccessAlert()} dataDismiss="alert" ariaLabel="Close">
		    						<span ariaHidden="true">&times;</span>
		  						</button>
							</div>

						}

						<h2 className="pb-3 text-center">Recover Password</h2>
						<p className="text-center"> Enter your account Email to proceed to your password recovery.</p>
						<form className="border p-3">
							<div className="form-group">
						    	<TextField
						    		required
						    		id="outlined-basic"
						    		onChange={this.handleEmailChange}
						    		label="Email"
						    		variant="outlined"
						    		InputProps={{
							        	startAdornment: (
							            	<InputAdornment position="start">
							              		<MailOutlineOutlinedIcon/>
							            	</InputAdornment>
							          	),
							        }}
						    	/>
							</div>
							<button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submeter</button>
						</form>
					</div>

				: this.props.history.push('/')
				}
			</React.Fragment>
		)
	}
}

export default withRouter(RecoverPassword)