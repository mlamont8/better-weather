import React from 'react';
import { Navbar, FormGroup, Button } from 'react-bootstrap';
import CurrentContainer from './CurrentContainer';
import ForecastContainer from './ForecastContainer';
import axios from 'axios';
import Geosuggest from 'react-geosuggest';




class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      value: '',
      retrieving: true,
      lat: 0,
      long: 0

    }
  };




  componentDidMount() {
    axios.get('http://ip-api.com/json')
    .then ((data) => {
      console.log('main', data)
      this.setState(
        {
          city: data.data.city,
          state: data.data.region,
          lat: data.data.lat,
          long: data.data.lon,
          retrieving: false
        },
      )
    }
  )
  }


// Updates lat and long after new search selection
onSuggestSelection(suggest) {
  console.log(suggest)
  this.setState(
    {
      lat: suggest.location.lat,
      long: suggest.location.lng,
      city: suggest.gmaps.address_components[0].short_name,
      state: suggest.gmaps.address_components[1].short_name
    }
  )

}


  render() {

    const { retrieving } = this.state;


    return retrieving === true
    ? <p>Loading</p>
    :
      <div className="container main">
        <Navbar inverse>
       <Navbar.Header>
         <Navbar.Brand>
           <a href="#">Better Weather</a>
         </Navbar.Brand>
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

           {' '}
           <Button type="submit">Submit</Button>
         </Navbar.Form>

       </Navbar.Collapse>
     </Navbar>
        <CurrentContainer
          city={this.state.city}
          state={this.state.state}
          lat={this.state.lat}
          long={this.state.long}
      />
        <ForecastContainer
          city={this.state.city}
          state={this.state.state}
          lat={this.state.lat}
          long={this.state.long}
      />
    </div>

  }

}



export default Main;
