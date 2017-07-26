import React from 'react';
import { Navbar, FormGroup } from 'react-bootstrap';
import CurrentContainer from './CurrentContainer';
import ForecastContainer from './ForecastContainer';
import Geosuggest from 'react-geosuggest';




class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityState: '',
      retrieving: true,
      lat: 0,
      long: 0

    }
  };




  componentDidMount() {
// Retrieve lat and long using browser for user...defaults to GSO, NC
      var that = this
  function useGeoData(data){
    that.setState(
      {
        lat: data.coords.latitude,
        long: data.coords.longitude,
        retrieving: false
      }
    )
     };


        if (navigator.geolocation)
        {

        navigator.geolocation.getCurrentPosition(useGeoData);
      }else{
        this.setState(
          {
            lat: 36.0726354,
            long: -79.7919754,
            retrieving: false
          }
        )
      }

  }




// Updates lat and long after new search selection
onSuggestSelection(suggest) {
  console.log(suggest)
  this.setState(
    {
      lat: suggest.location.lat,
      long: suggest.location.lng,

    }
  )

}


  render() {

    const { retrieving } = this.state;


    return retrieving === true
    ? <p>Loading</p>
    :
      <div className="container-fluid main">
        <Navbar inverse>
       <Navbar.Header>
         <Navbar.Toggle />
       </Navbar.Header>
       <Navbar.Collapse>
         <Navbar.Form pullRight>

           <FormGroup>
             <div>
             <Geosuggest
               placeholder='Enter City Name'
               className='citySuggest'
               types={['(cities)']}
               onSuggestSelect={this.onSuggestSelection.bind(this)}
             />
             </div>
           </FormGroup>

         </Navbar.Form>

       </Navbar.Collapse>
     </Navbar>

        <CurrentContainer
          lat={this.state.lat}
          long={this.state.long}
      />
        <ForecastContainer
          lat={this.state.lat}
          long={this.state.long}
      />
    </div>

  }

}



export default Main;
