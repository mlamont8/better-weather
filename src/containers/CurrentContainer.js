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
      location: '',
      date: '',
      temp: 0,
      condition: '',
      windDir: '',
      windSp: '',
      retrieving: true

    }
  }

  getCurrentInfo(state, city){
    axios.get('http://api.wunderground.com/api/' + apiKey + '/conditions/q/' + state + '/' + city + '.json')
    .then ((data) => {
      this.setState(
        {
          icon: data.data.current_observation.icon,
          location: data.data.current_observation.display_location.city,
          date: data.data.current_observation.local_time_rfc822,
          temp: Math.trunc(data.data.current_observation.temp_f),
          condition: data.data.current_observation.weather,
          windDir: data.data.current_observation.wind_dir,
          windSp: data.data.current_observation.wind_mph,
          retrieving: false
        }
      )

      })
  }

  componentDidMount() {
    const state = this.props.state
    const city = this.props.city
    this.getCurrentInfo(state, city)
  }

  componentWillReceiveProps(nextProps){
  // Check if city actually changed
  if(JSON.stringify(this.props.city) !== JSON.stringify(nextProps.city))
    {
      const city = nextProps.city
      const state = nextProps.state
      this.getCurrentInfo(state, city)
     }
}

  render() {
    return this.state.retrieving === true ?
    <div> Loading...</div> :
    (
      <div className='halfcontainer jumbotron'>
          <Location
            city={this.props.city}
            state={this.props.state}
          />
        <div className="row">
          <CurrentTemp
            temp={this.state.temp}
          />

          <div className="col-md-8 text-center">
            <h3>
              {this.state.condition}
            </h3>

          <Image src={'https://icons.wxug.com/i/c/k/' + this.state.icon + '.gif'}></Image>
        </div>
        <Wind
          windSp={this.state.windSp}
          windDir={this.state.windDir}

        />

        </div>

      </div>
    );
  }

}

CurrentContainer.propTypes = {
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
}


export default CurrentContainer;
