import React, { useState } from 'react';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import {IsDevProvider} from "./components/IsDevContext"
import Div100vh from 'react-div-100vh'
import {BrowserRouter as Router} from "react-router-dom"
 
function Root() {

	//Used with ContextAPI, providing this value to the entire App
	const [isDev] = useState(true)

	return (
    	<CookiesProvider>
	    	<Div100vh style={{minHeight: '100rvh'}}>
		    		<IsDevProvider value={isDev}>
		    			<Router>
  							<App />
  						</Router>
				    </IsDevProvider>
			</Div100vh>
		</CookiesProvider>	
  	)
}

export default Root