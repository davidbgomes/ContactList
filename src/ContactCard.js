import React from 'react'
import "./styles/ContactCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


function ContactCard(props){

	return(
		<div className="card text-white contactDiv">
			
			<img alt="Contact" src= {props.ProfilePicUrl} className="card-img"/>
			{props.IsAvailable &&
				<div className="isAvailableIcon">
					<FontAwesomeIcon icon={faCircle} />
				</div>
			}

			<div className={props.mainContact ? "card-img-overlay contactMainCardBody": "card-img-overlay ContactsecondaryCardBody"}>
				<p className={props.mainContact ? "card-text contactMainText": "card-text ContactsecondaryText"}>{props.Name}</p>
				<p className={props.mainContact ? "card-text locationMainText text-white": "card-text locationSecondaryText text-white"}>{props.CityZone}</p>
			</div>
		</div>
	)
}

export default ContactCard