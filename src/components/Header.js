import React from 'react'
import { Link } from "react-router-dom"
import "../styles/Header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


function Header(props){

	return(
		<nav className="navbar navbar-expand-lg nav-style navbar-light bg-light header">


        	<button className="navbar-toggler" type="button" data-toggle="collapse" onClick={() => props.toggleMenu()} data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

		    <div className={props.isHamburgerOpen ? "collapse navbar-collapse show" : "collapse navbar-collapse collapse"} id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">

			   		<li className="nav-link m-2 menu-item nav-active">
						<Link to="/" className="nav-link menuItem" onClick={() => props.toggleMenu()}>Home</Link>
					</li>
					{props.authenticated &&

					<li className="nav-link m-2 menu-item nav-active">
						<Link to="/Dashboard" className="nav-link menuItem" onClick={() => props.toggleMenu()}>Dashboard</Link>
					</li>
					
					}

				</ul>

				{!props.authenticated ?

				<ul className="navbar-nav">
					<li className="nav-link m-2 menu-item nav-active signIn">
						<Link to="/SignIn" className="nav-link menuItem" onClick={() => props.toggleMenu()}>
							<span className="mr-2">Sign In</span>
							<FontAwesomeIcon className="fa-2x" icon={faSignInAlt} />
						</Link>
					</li>
				</ul>

				:

				<ul className="navbar-nav">
					<li className="nav-link m-2 menu-item nav-active signIn">
						<Link to="/" className="nav-link menuItem" onClick={props.logout}>
							<span className="order-md-2 mr-2">Logout</span>
							<FontAwesomeIcon className="fa-2x" icon={faSignOutAlt} />
						</Link>
					</li>
				</ul>

				}
				
		    </div>

	    </nav>
	)
}

export default Header