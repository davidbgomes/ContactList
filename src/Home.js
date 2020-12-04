import React from 'react'
import { Link } from "react-router-dom"
import "./styles/Home.css"
import ContactCard from "./ContactCard"

import { isMobile } from "react-device-detect"
import DrawerFilters from "./components/DrawerFilters"
import CookieSnackbar from "./components/CookieSnackbar"
import { Carousel } from 'react-responsive-carousel'
import { withCookies } from 'react-cookie'
import {Helmet} from 'react-helmet'
import _ from "lodash"

import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemText from '@material-ui/core/ListItemText'


class Home extends React.Component{

    constructor(){
        super()

        this.state={
            acceptedCookie:false,
        }
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
    }

    componentDidMount(){

        const { cookies } = this.props

        //If has cookie, means already accepted site terms of use
        if(cookies.get('user_firstVisit') !== undefined){
            this.setState({
                acceptedCookie:true,
            })
        }
    }

    handleCloseSnackbar(){
        const { cookies } = this.props
        this.setState({
            acceptedCookie: true,
        })
        cookies.set('user_firstVisit', { path: '/' })
    }

    render(){

        const MenuProps = {
            variant:'menu',
            style:{
                top:"52px"
            }
        }

        return(

            <div className="container-md homeDiv">
                <Helmet>
                    <title>Contact List</title>
                    <meta name="description" content="Home" />
                </Helmet>
            {
            !isMobile ?

                <div className="border filterDiv">
                    <div className="row">
                        <div className="col-md">
                            <InputLabel id="City">City:</InputLabel>
                            <Select
                                labelId="City"
                                onChange={this.props.OnSelectCity}
                                value={this.props.selectedCity}
                            >
                            {
                                this.props.CityOptions.map((item, i) => {
                                    return(
                                        <MenuItem value={item} key={i}>{item}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </div>
                        <div className="col-md">
                            <InputLabel id="Nationality">Nationality:</InputLabel>
                            <Select
                                labelId="Nationality"
                                onChange={this.props.OnSelectNationality}
                                value={this.props.selectedNationality}
                            >
                            {
                                this.props.NationalityOptions.map((item, i) => {
                                    return(
                                        <MenuItem value={item} key={i}>{item}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </div>
                        <div className="col-md">
                            <InputLabel id="Interest">Interests:</InputLabel>
                            <Select
                                labelId="Interest"
                                onChange={this.props.OnSelectInterest}
                                className="selectInterest"
                                multiple
                                defaultValue={[]}
                                MenuProps={MenuProps}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <span>All</span>;
                                    }
                                    else{
                                        return(
                                            selected.join(', ')
                                        )
                                    }
                                }}
                                displayEmpty={true}
                            >
                            {
                                this.props.InterestOptions.map((item, i) => {
                                    return(
                                        <MenuItem value={item} key={i}>
                                            <Checkbox color="primary" checked={this.props.selectedInterest.indexOf(item) > -1} />
                                            <ListItemText primary={item} key={i} />
                                        </MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </div>
                    </div>
                </div>

            :
                <DrawerFilters
                    OnSelectCity={this.props.OnSelectCity}
                    OnSelectNationality={this.props.OnSelectNationality}
                    OnSelectInterest={this.props.OnSelectInterest}

                    selectedCity={this.props.selectedCity}
                    selectedNationality={this.props.selectedNationality}
                    selectedInterest={this.props.selectedInterest}

                    CityOptions = {this.props.CityOptions}
                    NationalityOptions = {this.props.NationalityOptions}
                    InterestOptions = {this.props.InterestOptions}

                    isAvailableChecked={this.props.isAvailableChecked}
                    toggleIsAvailableCheckbox={this.props.toggleIsAvailableCheckbox}
                />

            }

                <div className="homeDiv">

                    <div className={_.size(this.props.activeFilters) === 0 ? "showMainAndNewContactsDiv" : "hideMainAndNewContactsDiv"}>
                        <h1> Top Contacts </h1>

                        {/* MAIN Contacts */}
                        { !isMobile ?

                        <div className="hottestRow row">

                            {Object.keys(this.props.MainContacts).map((item, i) => (
                                <div className="allContacts col-md-4" key={this.props.MainContacts[item].Name}>
                                    <Link to={{
                                        pathname:`/${this.props.MainContacts[item].Name}`,
                                        state:this.props.MainContacts[item]
                                    }}>
                                        <ContactCard
                                            Name={this.props.MainContacts[item].Name}
                                            CityZone={this.props.MainContacts[item].CityZone}
                                            mainContact={this.props.MainContacts[item].IsMainContact}
                                            key={i}
                                            ProfilePicUrl={this.props.MainContacts[item].ProfilePicUrl}
                                        />
                                    </Link>
                                </div> 
                            ))}

                        </div>

                        :

                        <Carousel className={_.size(this.props.activeFilters) !== 0 && "allContacts col-4 hideRows"} showStatus={false} showIndicators={false} autoPlay={true} infiniteLoop={true} swipeable={false} showThumbs={false}>
                            {Object.keys(this.props.MainContacts).map((item, i) => (
                                    <div key={this.props.MainContacts[item].Name}>
                                        <Link to={{
                                            pathname:`/${this.props.MainContacts[item].Name}`,
                                            state:this.props.MainContacts[item]
                                        }}>
                                            <ContactCard
                                                Name={this.props.MainContacts[item].Name}
                                                CityZone={this.props.MainContacts[item].CityZone}
                                                mainContact={this.props.MainContacts[item].IsMainContact}
                                                IsAvailable={this.props.MainContacts[item].IsAvailable}
                                                key={i}
                                                ProfilePicUrl={this.props.MainContacts[item].ProfilePicUrl}
                                            />
                                        </Link>
                                    </div> 
                            ))}
                        </Carousel>

                        }

                        </div>

                    <h2 className="mt-3"> {_.size(this.props.activeFilters) === 0 ? "All Contacts" : "Searched Contacts"} </h2>

                    <div className="row">
                        {_.size(this.props.FilteredContacts) !== 0 ?

                            <React.Fragment>
                            
                                {Object.keys(this.props.FilteredContacts).map((item, i) => (
                                    <div className="allContacts col-md-4" key={this.props.FilteredContacts[item].Name}>
                                        <Link to={{
                                            pathname:`/${this.props.FilteredContacts[item].Name}`,
                                            state:this.props.FilteredContacts[item]
                                        }}>
                                            <ContactCard
                                                Name={this.props.FilteredContacts[item].Name}
                                                CityZone={this.props.FilteredContacts[item].CityZone}
                                                mainContact= {false}
                                                IsAvailable={this.props.FilteredContacts[item].IsAvailable}
                                                key={i}
                                                ProfilePicUrl={this.props.FilteredContacts[item].ProfilePicUrl}
                                            />
                                        </Link>
                                    </div> 
                                ))}

                            </React.Fragment>

                        :
                        <div>
                            <p className="ml-3"> No Users were found. Please change the filters and try again. </p>
                        </div>
                        }

                    </div>
                </div>
                <CookieSnackbar handleClose={this.handleCloseSnackbar} acceptedCookie={this.state.acceptedCookie}/>
            </div>
        )
    }
}


export default withCookies(Home)