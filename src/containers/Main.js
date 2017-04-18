import React from 'react';
import { Navbar, FormGroup } from 'react-bootstrap';
import CurrentContainer from './CurrentContainer';
import ForecastContainer from './ForecastContainer';
import axios from 'axios';
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
    axios.get('http://ip-api.com/json')
    .then ((data) => {
      console.log('main', data)
      this.setState(
        {
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
