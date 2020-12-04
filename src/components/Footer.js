import React from 'react'
import "../styles/Footer.css"
import { Link } from "react-router-dom"

function Footer(){
	return(
		<div className="footer">
			<div className="pt-3">
				<div>
					<Link to="/TermsAndConditions" className="text-white">Terms and Conditions</Link>
					<span> | </span>
					<Link to="/PrivacyPolicy" className="text-white">Privacy Policy</Link>
				</div>
				<div className="pt-3">
					<span> © 2020 Contact List </span>
				</div>
			</div>				
		</div>
	)
}

export default Footer