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
      this.setState(
        {
          city: data.data.city,
          state: data.data.region,
          retrieving: false
        },
      )
    }
  )
  }


// Updates lat and long after new search selection
onSuggestSelection(suggest) {
  console.log(suggest.gmaps)
  this.setState(
    {
      city: suggest.gmaps.address_components[0].long_name,
      state: suggest.gmaps.address_components[2].short_name
    }
  )

}


  render() {

    const { retrieving } = this.state;


    return retrieving === true
    ? <p>Loading</p>
    :
      <div className="container main">
        <Navbar>
       <Navbar.Header>
         <Navbar.Brand>
           <a href="#">Brand</a>
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
      />
        <ForecastContainer
          city={this.state.city}
          state={this.state.state}
      />
    </div>

  }

}



export default Main;
