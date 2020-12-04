import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./styles/ContactDetail.css"
import "./styles/Carousel.css"

import ImageGallery from 'react-image-gallery'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import NumberFormat from 'react-number-format';
import {Helmet} from 'react-helmet'


class ContactDetail extends React.Component{


    constructor(){
        super()
        this.state={
            Name: "",
            Age: 0,
            Nationality: "",
            City: "",
            PhoneNumber: "", 
            PlaceId: "",

            IsLoading:true,
            userNotFound: false,
            isMediaFetched: false,


            showIndex: false,
            showBullets: true,
            infinite: true,
            showThumbnails: false,
            showFullscreenButton: true,
            showGalleryFullscreenButton: true,
            showPlayButton: true,
            showGalleryPlayButton: true,
            showNav: true,
            isRTL: false,
            slideDuration: 450,
            slideInterval: 2000,
            slideOnThumbnailOver: false,
            thumbnailPosition: 'bottom',
            showVideo: {},
            media: [],
        }
    }


    async componentDidMount(){

        // When page is rendered, always go to the top of the page
        window.scrollTo(0, 0)

        let media = []
        for(let i = 0; i < this.props.location.state.Images.length; i++){
            media.push({"original": this.props.location.state.Images[i]})
        }


        this.setState({
            Name: this.props.location.state.Name,
            Age: this.props.location.state.Age,
            Nationality: this.props.location.state.Nationality,
            City: this.props.location.state.City,
            CityZone: this.props.location.state.CityZone,
            IsAvailable: this.props.location.state.IsAvailable,
            IsAvailableAllDay: this.props.location.state.IsAvailableAllDay,
            AvailableFromDay: this.props.location.state.AvailableFromDay,
            AvailableToDay: this.props.location.state.AvailableToDay,
            AvailableFromHour: this.props.location.state.AvailableFromHour,
            AvailableToHour: this.props.location.state.AvailableToHour,
            IsActive: this.props.location.state.IsActive,
            ServeTo: this.props.location.state.ServeTo,
            PlaceId: this.props.location.state.PlaceId,
            PhoneNumber: this.props.location.state.PhoneNumber,
            media: media,
            IsLoading: false,
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.slideInterval !== prevState.slideInterval || this.state.slideDuration !== prevState.slideDuration) {
            // refresh setInterval
            this._imageGallery.pause();
            this._imageGallery.play();
        }
    }

    render(){

        return(
            <>
            <Helmet>
                <title>{`${this.state.Name}`}</title>
            </Helmet>
            {this.state.userNotFound === false ?
            <>
            {this.state.IsLoading === false ? 
            <div className="container-fluid detailDiv">
                <div className="row">
                    <div className="col-lg order-2 order-lg-1 ml-1">
                        <div className="row ml-1">
                            <div className="detailTitle mt-1">
                                <h1>{this.state.Name}</h1>
                            </div>
                        </div>

                        <hr style={{margin:0}}></hr>

                        <div className="specs mt-3 mb-3">
                            <p><b>Age: </b>{this.state.Age} years old</p>
                            <p><b>Nationality: </b> {this.state.Nationality}</p>
                            <p><b>City: </b>{this.state.City}</p>
                            <p><b>District: </b>{this.state.CityZone}</p>
                            <p><b>Phone Number: </b> <NumberFormat className="phoneNumber mt-4" value={this.state.PhoneNumber} displayType={'text'} format={'## ### ## ##'} /></p>

                            
                        </div>

                        <div className="mapDiv pt-4">
                            <h3> Map </h3>
                            <hr></hr>
                            <iframe
                                width={"100%"}
                                height={"400"}
                                frameBorder={0}
                                style={{border:0}}
                                src={`https://www.google.com/maps/embed/v1/place?q=place_id:${this.state.PlaceId}&zoom=14&key=AIzaSyCCPO9DuMaEO-CdPmo7mr4nlUg8HG-eaeg`}
                                title="location"
                                allowFullScreen
                            >
                            </iframe>

                        </div>
                    </div>


                    <div className="col-md-8 col-lg-9 order-1 order-lg-2">
                        <ImageGallery
                            ref={i => this._imageGallery = i}
                            items={this.state.media}
                            lazyLoad={false}
                            onSlide={this.onSlide}
                            infinite={this.state.infinite}
                            showBullets={this.state.showBullets}
                            showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                            showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                            showThumbnails={this.state.showThumbnails}
                            showIndex={this.state.showIndex}
                            showNav={this.state.showNav}
                            isRTL={this.state.isRTL}
                            thumbnailPosition={this.state.thumbnailPosition}
                            slideDuration={parseInt(this.state.slideDuration)}
                            slideInterval={parseInt(this.state.slideInterval)}
                            slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                            additionalClass="app-image-gallery"
                        />
                    </div>
                </div>
            </div>
            :
            <div className="detailDivBackdrop">
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
            }
            </>
            :
            <div className="container">
                <h3>Error 404 - Page not found</h3>
            </div>
            }
            </>
        )
    }
}

export default ContactDetail