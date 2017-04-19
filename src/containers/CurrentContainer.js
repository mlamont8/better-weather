import React from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import Location from '../components/location';
import CurrentTemp from '../components/currentTemp';
import Wind  from '../components/wind';
import PropTypes from 'prop-types';


const apiKey = 'f67b93e533d6313a';

class CurrentContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      icon: '',
      cityState: '',
      city: '',
      state: '',
      date: '',
      temp: 0,
      condition: '',
      windDir: '',
      windSp: '',
      retrieving: true

    }
  }

  getCurrentInfo(lat, long){
    axios.get('https://api.wunderground.com/api/' + apiKey + '/conditions/q/' + lat + ',' + long + '.json')
    .then ((data) => {
      this.setState(
        {

          icon: data.data.current_observation.icon,
          city: data.data.current_observation.display_location.city,
          temp: Math.trunc(data.data.current_observation.temp_f),
          condition: data.data.current_observation.weather,
          windDir: data.data.current_observation.wind_dir,
          windSp: data.data.current_observation.wind_mph,
          usState: data.data.current_observation.display_location.state,
          feelsLike: Math.trunc(data.data.current_observation.feelslike_f),
          visibility: data.data.current_observation.visibility_mi,
          precip: data.data.current_observation.precip_today_in,
          retrieving: false
        }
      )

      })
  }

  componentDidMount() {
    const lat = this.props.lat
    const long = this.props.long
    this.getCurrentInfo(lat, long)
  }

  componentWillReceiveProps(nextProps){
  // Check if lat actually changed
  if(JSON.stringify(this.props.lat) !== JSON.stringify(nextProps.lat))
    {
      const lat = nextProps.lat
      const long = nextProps.long
      this.getCurrentInfo(lat, long)
     }
}

  render() {
    return this.state.retrieving === true ?
    <div> Loading...</div> :
    (
      <div className='halfcontainer jumbotron currentContainer'>
          <Location
            city={this.state.city}
            state={this.state.usState}
          />
        <div className="row">

          <div className="col-md-2 currentCondition text-center">
            <h3>
              {this.state.condition}
            </h3>
            <Image src={'https://icons.wxug.com/i/c/i/' + this.state.icon + '.gif'}></Image>
          </div>

          <div className="col-md-4 col-md-offset-2 text-center">

          <CurrentTemp
            temp={this.state.temp}
            feelsLike={this.state.feelsLike}
          />
        </div>
        <Wind
          windSp={this.state.windSp}
          windDir={this.state.windDir}
        />

        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3   text-center">
            <h4>Precipitation Today: {this.state.precip} inches</h4>
            <h4>Visibility: {this.state.visibility} miles</h4>
          </div>
        </div>

      </div>
    );
  }

}

CurrentContainer.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
}


export default CurrentContainer;
