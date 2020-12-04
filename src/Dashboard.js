import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import TabPanel from "./components/TabPanel"

import TextField from '@material-ui/core/TextField'

import "./styles/Dashboard.css"

import firebase from 'firebase/app'

import LineGraph from "./components/LineGraph"
import _ from "lodash"
import contacts from "./db/contacts"
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import {Helmet} from 'react-helmet'
import axios from 'axios'


function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

class Dashboard extends React.Component{

	constructor(){
		super()
		this.state={
			value: 0,
			Name: "",
			City: "",
			PhoneNumber: "",
			showMyAlert:false,
			isDataFetched: false,
			MonthlyViews:[],

			hasError: false,
			ErrorMessage: "",
		}
		this.handlePhoneChange = this.handlePhoneChange.bind(this)
		this.handleCityChange = this.handleCityChange.bind(this)
		this.saveChanges = this.saveChanges.bind(this)
		this.hideAlert = this.hideAlert.bind(this)
	}


	componentDidMount(){

		const userId = firebase.auth().currentUser.uid

		const user = _.find(contacts, {UserUID: userId})

		//Get Contact details based on logged Contact. Only Contacts can login
		this.setState({
			Name: user.Name,
			City: user.City,
			PhoneNumber: user.PhoneNumber,
			UserUID: userId,
			isDataFetched: true,
			MonthlyViews: user.Views
		})

	}

  	handlePhoneChange(event){
		this.setState({
			PhoneNumber:event.target.value,
		}, () =>{
			const isValidPhone = isMobilePhone(this.state.PhoneNumber,'pt-PT')
			if(!isValidPhone){
				this.setState({
					hasError: true,
					ErrorMessage: "Nº telefone inválido"
				})
			}
			else{
				this.setState({
					hasError:false,
					ErrorMessage: ""
				})
			}
		})
  	}

  	handleCityChange(event){
		this.setState({
			City:event.target.value,
		})
  	}

  	async saveChanges(event){
  		event.preventDefault()

		const userId = firebase.auth().currentUser.uid

		await axios.post("http://localhost:3001/api/setProfile", {
	    	userId: userId,
	    	PhoneNumber: this.state.PhoneNumber,
	    	City: this.state.City
	    })
	    .then(response =>{
			this.setState({
				showMyAlert:true,
			})
	    })
	    .catch(error => {
	    	console.log("Error API: ", error)
	    })

  	}

  	hideAlert(){
  		this.setState({
  			showMyAlert:false,
  		})
	}

	render(){

		const handleChange = (event, newValue) => {
			this.setState({
				value:newValue,
			})
	  	}

		return(
			<>
			<Helmet>
	    		<title>Dashboard</title>
    		</Helmet>
			{this.state.isDataFetched &&
			<div className="container-md dashboardDiv">

				{ this.state.showMyAlert &&
				<div className="alert alert-success alert-dismissible fade show" role="alert">
						<span>Your profile was changed successfully</span>
						<button type="button" className="close" onClick={() => this.hideAlert()} data-dismiss="alert" aria-label="Close">
						<span ariaHidden="true">&times;</span>
						</button>
				</div>
				}

				<div className="mt-3" style={{display:'flex'}}>
					<h2>Welcome {this.state.Name}</h2>
				</div>

				<AppBar position="static" color="default" className="mt-4 AppBar">
					<Paper square>
				      	<Tabs
					        value={this.state.value}
					        variant="scrollable"
          					scrollButtons="on"
					        indicatorColor="primary"
					        textColor="primary"
					        onChange={handleChange}
					        aria-label="tabs"
				      	>
					      	<Tab label="Graph" {...a11yProps(0)}/>
					      	<Tab label="About Me" {...a11yProps(1)}/>
					    </Tabs>
					</Paper>
				</AppBar>

				<TabPanel value={this.state.value} index={0}>
					<LineGraph MonthlyViews={this.state.MonthlyViews}/>
	      		</TabPanel>
	      		<TabPanel value={this.state.value} index={1} className="TabContent">
	      			<form className="mt-4">
	      				<div className="col ml-2">
	      					<div className="row">
			      				<div className="pt-3 pr-5 form-group">
					       			<TextField
					       				variant="outlined"
					       				labelId="phoneLabel"
					       				label="City"
					       				onChange={this.handleCityChange}
					       				defaultValue={this.state.City}
					       			/>
					          	</div>

					          	<div className="pt-3 form-group">
					          		<TextField
					          			id="outlined-basic"
					          			defaultValue={this.state.PhoneNumber}
					          			onChange={this.handlePhoneChange}
					          			label="Phone Number"
					          			variant="outlined"
					          			minLength="9"
					          			helperText={this.state.ErrorMessage}
					          			error={this.state.hasError}
					          		/>
					          	</div>
					        </div>

				      	</div>

				        <div className="pt-4">
				      		<button className="btn btn-primary" disabled={this.state.hasError} onClick={this.saveChanges}> Save Changes </button>
				      	</div>
				      	
		      		</form>
	      		</TabPanel>
			</div>
			}
			</>
		)
	}
}

export default Dashboard