import React from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';


const apiKey = 'f67b93e533d6313a';

class BottomHalf extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      icon: '',
      location: '',
      date: '',
      temp: '',
      condition: '',
      windDir: '',
      windSp: '',
      retrieving: true

    }
  }

  componentDidMount() {
    axios.get('http://api.wunderground.com/api/' + apiKey + '/conditions/q/' + this.props.state + '/' + this.props.city + '.json')
    .then ((data) => {
      this.setState(
        {
          icon: data.data.current_observation.icon,
          location: data.data.current_observation.display_location.city,
          date: data.data.current_observation.local_time_rfc822,
          temp: data.data.current_observation.temp_f,
          condition: data.data.current_observation.weather,
          windDir: data.data.current_observation.wind_dir,
          windSp: data.data.current_observation.wind_mph,
          retrieving: false
        }
      )

      console.log('bottomhalf', data)
    })
  }

  render() {
    return (
      <div className='halfcontainer'>
        <div className="col-md-6">
          <Image responsive src={'https://icons.wxug.com/i/c/k/' + this.state.icon + '.gif'}></Image>


        </div>
      </div>
    );
  }

}

export default BottomHalf;
