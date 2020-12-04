import React , { Suspense, lazy } from 'react'
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom"
import ProtectedRoute from './ProtectedRoute'
import './styles/App.css'
import LoadIndicatorWithDelay from "./components/LoadIndicatorWithDelay"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ContactDetail from "./ContactDetail"
import firebase from "./config/initFirebase"
import _ from "lodash"
import contacts from "./db/contacts"

const Home = lazy(() => import('./Home'))
const SignIn = lazy(() => import('./SignIn'))
const Dashboard = lazy(() => import('./Dashboard'))
const RecoverPassword = lazy(() => import('./RecoverPassword'))
const TermsAndConditions = lazy(() => import('./TermsAndConditions'))
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy'))

class App extends React.Component {
	constructor(){
		super()
		this.state = {
			isDataFetched: false,
			isHamburgerOpen: false,
			CityOptions: [],
   			NationalityOptions: [],
   			InterestOptions: [],
			Contacts: [],
			activeFilters: {},
			FilteredContacts: [],
			MainContacts: [],
			authenticated: null,
			dropdownCity_selected: 'All',
			dropdownNationality_selected: 'All',
			dropdownInterest_selected: [],

			isUserAuthSet:false,

		}
		this.toggleMenu = this.toggleMenu.bind(this)
		this.OnSelectCity = this.OnSelectCity.bind(this)
		this.OnSelectNationality = this.OnSelectNationality.bind(this)
		this.OnSelectInterest = this.OnSelectInterest.bind(this)
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
		this.shuffleAllContacts = this.shuffleAllContacts.bind(this)
		this.shuffleMainContacts = this.shuffleMainContacts.bind(this)
	}


	// FIRESTORE
	async componentDidMount(){

		// SET AUTHENTICATED BASED ON LOGIN
		firebase.auth().onAuthStateChanged((authenticated) => {

     		if(authenticated){
     			this.setState({
           			authenticated: true,
           			isUserAuthSet: true
         		})
         	}
         	else{
       			this.setState({
           			authenticated: false,
           			isUserAuthSet: true
         		})
         	}
   		})

   		let CityOptions = ["All"]
   		let NationalityOptions = ["All"]
   		let InterestOptions = []

   		for(let i = 0; i < contacts.length; i++){
   			CityOptions.push(contacts[i].City)
   			NationalityOptions.push(contacts[i].Nationality)
   			InterestOptions.push.apply(InterestOptions, contacts[i].Interests)
   		}

   		this.setState({
   			Contacts: contacts,
   			FilteredContacts: contacts,
   			MainContacts: _.filter(contacts,{IsMainContact:true}),
	   		CityOptions: _.uniq(CityOptions),
   			NationalityOptions: _.uniq(NationalityOptions),
   			InterestOptions: _.uniq(InterestOptions),
   			isDataFetched: true
   		}, this.shuffleAllContacts)

	}

	shuffleMainContacts(){
		const Contacts = this.state.MainContacts
		for(let i = Contacts.length - 1; i > 0; i--){
			const j = Math.floor(Math.random() * i)
			const temp = Contacts[i]
			Contacts[i] = Contacts[j]
			Contacts[j] = temp
		}

		this.setState({
			MainContacts: Contacts
		})
	}

	shuffleAllContacts(){
		const Contacts = this.state.FilteredContacts
		for(let i = Contacts.length - 1; i > 0; i--){
			const j = Math.floor(Math.random() * i)
			const temp = Contacts[i]
			Contacts[i] = Contacts[j]
			Contacts[j] = temp
		}

		this.setState({
			FilteredContacts: Contacts
		})
	}

	toggleMenu(){
		this.setState(prevState =>{
			return{
				isHamburgerOpen: !prevState.isHamburgerOpen
			}
		})
	}

	login(){
		this.setState({
			authenticated:true,
		})
	}

	logout(){
		firebase.auth().signOut()
		window.location.replace("/")
	}

	OnSelectCity(event){
		var filters = this.state.activeFilters

			if(! filters.hasOwnProperty('City') && event.target.value !== "All"){
				Object.assign(filters, {'City':event.target.value})
			}
			else{
				if(event.target.value === "All"){
					delete filters.City
				}
				else{
					filters.City = event.target.value
				}
			}

		this.setState({
			dropdownCity_selected: event.target.value,
		}, this.filter)
	}

	OnSelectNationality(event){
		var filters = this.state.activeFilters

			if(! filters.hasOwnProperty('Nationality') && event.target.value !== "All"){
				Object.assign(filters, {'Nationality':event.target.value})
			}
			else{
				if(event.target.value === "All"){
					delete filters.Nationality
				}
				else{
					filters.Nationality = event.target.value
				}
			}

		this.setState({
			dropdownNationality_selected: event.target.value,
		}, this.filter)
	}

	OnSelectInterest(event){
		var filters = this.state.activeFilters

			if(! filters.hasOwnProperty('Interests') && event.target.value.length !== 0){
				Object.assign(filters, {'Interests':event.target.value})
			}
			else{
				if(event.target.value.length === 0){
					delete filters.Interests
				}
				else{
					filters.Interests = event.target.value
				}
			}

		this.setState({
			dropdownInterest_selected: event.target.value,
		}, this.filter)
	}

	async filter(){
		//IF there are filters
		if(_.size(this.state.activeFilters) > 0){

			// Promise is used so filteredContact var is filled before setting state
			const promise = new Promise((resolve,reject) =>{

				// Using lodash filter to filter Contacts through the activeFilters set
				var filteredContact = _.filter(this.state.Contacts, this.state.activeFilters)
				resolve(filteredContact)	
			})

			promise.then((response) =>{

				this.setState({
					FilteredContacts: response
				})
			})
		}
		//IF there are no filters, the filtered contacts are just all contacts.
		else{
			this.setState({
				FilteredContacts: this.state.Contacts
			})
		}
	}

	render(){

	    return(
	    	<div>
		    	<Router>
		    		{this.state.isUserAuthSet &&
		    		<Header
		    			isHamburgerOpen={this.state.isHamburgerOpen}
		    			authenticated={this.state.authenticated}
		    			toggleMenu={this.toggleMenu}
		    			logout={this.logout}
		    		/>
		    		}
	    			<Suspense fallback={<LoadIndicatorWithDelay/>}>
			    		<Switch>
					        <Route exact path="/">
					        	{this.state.isDataFetched &&
					           	<Home 
					           		MainContacts = {this.state.MainContacts}
					           		FilteredContacts = {this.state.FilteredContacts}

					           		CityOptions = {this.state.CityOptions}
					           		NationalityOptions = {this.state.NationalityOptions}
					           		InterestOptions = {this.state.InterestOptions}

						           	OnSelectCity={this.OnSelectCity}
						           	OnSelectNationality={this.OnSelectNationality}
						           	OnSelectInterest={this.OnSelectInterest}

						           	selectedCity={this.state.dropdownCity_selected}
						           	selectedNationality={this.state.dropdownNationality_selected}
						           	selectedInterest={this.state.dropdownInterest_selected}

						           	toggleIsAvailableCheckbox={this.toggleIsAvailableCheckbox}
						           	activeFilters={this.state.activeFilters}
						        />
						    	}
					        </Route>
					        <Route exact path="/RecoverPassword">
					           	<RecoverPassword authenticated={this.state.authenticated} />
					        </Route>
					        <Route exact path="/SignIn">
					           	<SignIn authenticated={this.state.authenticated} login={this.login}/>
					        </Route>
					        <ProtectedRoute authenticated={this.state.authenticated} path="/Dashboard" component={Dashboard} />
					        <Route exact path="/TermsAndConditions" component={TermsAndConditions} />
					       	<Route exact path="/PrivacyPolicy" component={PrivacyPolicy} /> 
					        <Route exact path="/:Name" component={ContactDetail} />

						</Switch>
					</Suspense>	

					{this.state.isDataFetched &&
					this.props.location.pathname !=='/SignIn' &&
					this.props.location.pathname !=='/RecoverPassword' && 
					this.props.location.pathname !=='/Confirmation' && 
					this.props.location.pathname !=='/ConfirmationMb' && 
					this.props.location.pathname !=='/Dashboard' && 
					this.props.location.pathname !=='/Subscription' && 
					<Footer />
					}
		    	</Router>
		    </div>
	    )
	}	
}

export default withRouter(App)