import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"

function CookieSnackbar(props){

	const TermsAndConditions = <Link key={"TermsAndConditions"} to="/TermsAndConditions">Terms and Conditions</Link>
	const PrivacyPolicy = <Link key={"PrivacyPolicy"} to="/PrivacyPolicy">Privacy Policy</Link>
	return(
		<Snackbar
	        anchorOrigin={{
	        	vertical: 'bottom',
	        	horizontal: 'left',
	        }}
	        open={!props.acceptedCookie}
	        onClose={props.handleClose}
	        message={["By using our site, you're agreeing with our ",TermsAndConditions, " e a ", PrivacyPolicy]}
	        action={
          		<React.Fragment>
	            	<Button size="large" style={{color:"deepskyblue"}} onClick={props.handleClose}>
	              		Accept
	            	</Button>
          		</React.Fragment>
        	}
      	/>
	)
}

export default CookieSnackbar