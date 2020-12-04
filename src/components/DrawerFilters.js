import React, { useState } from 'react'
import "../styles/DrawerFilters.css"

import { SwipeableDrawer } from '@material-ui/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

function DrawerFilters(props){

	const [isOpen, setIsOpen] = useState(false)


	const toggleDrawer = (event) => {
    	if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      		return;
    	}

    	setIsOpen(!isOpen)
  	}

    const MenuProps = {
            variant:'menu',
            style:{
                top:"52px"
            }
        }


	const list = () => (
		<div className="drawer">
			<div className="row ml-2 mt-4">
                <h4 className="ml-3 font-italic">Filter by:</h4>
                <hr style={{margin:0, width:"200px", marginLeft:"15px", marginBottom:"40px"}}></hr>
                <div className="col-md mb-4">
                	<InputLabel id="City">City:</InputLabel>
                    <Select
                        labelId="City"
                        onChange={props.OnSelectCity}
                        defaultValue={props.selectedCity}
                    >
                    {
                        props.CityOptions.map((item, i) => {
                            return(
                                <MenuItem value={item} key={i}>{item}</MenuItem>
                            )
                        })
                    }
                    </Select>
                </div>

                <div className="col-md mb-4">
                    <InputLabel id="Nationality">Nationality:</InputLabel>
                    <Select
                        labelId="Nationality"
                        onChange={props.OnSelectNationality}
                        defaultValue={props.selectedNationality}
                    >
                    {
                        props.NationalityOptions.map((item, i) => {
                            return(
                                <MenuItem value={item} key={i}>{item}</MenuItem>
                            )
                        })
                    }
                    </Select>
                </div>

                <div className="col-md mb-4">
                    <InputLabel id="Interest">Interests:</InputLabel>
                    <Select
                        labelId="Interest"
                        onChange={props.OnSelectInterest}
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
                        props.InterestOptions.map((item, i) => {
                            return(
                                <MenuItem value={item} key={i}>
                                    <Checkbox color="primary" checked={props.selectedInterest.indexOf(item) > -1} />
                                    <ListItemText primary={item} />
                                </MenuItem>
                            )
                        })
                    }
                    </Select>
                </div>
            </div>
		</div>
	)

	return(
		<div className="container buttonDiv pt-1">
			<React.Fragment>
			    <button className="btn btn-secondary" onClick={() => toggleDrawer()}>
			    	<FontAwesomeIcon icon={faFilter} />
			    	<span>  Show Filters</span>
			    </button>
			    <SwipeableDrawer
			    	anchor="left"
			    	open={isOpen}
			    	onClose={() => setIsOpen(false)}
			    	onOpen={() => setIsOpen(true)}
			    >
			    {list()}
			    </SwipeableDrawer>
			</React.Fragment>
		</div>
	)
}

export default DrawerFilters