import React from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import CurrentTemp from '../../components/currentTemp/currentTemp';
import Loader from '../../components/loader/loader';
import moment from 'moment'
import PropTypes from 'prop-types';


const apiKey = 'f67b93e533d6313a';

class CurrentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      cityState: '',
      city: '',
      state: '',
      temp: 0,
      condition: '',
      precip: '',
      retrieving: true

    }
  }

  getCurrentInfo(lat, long) {
    axios.get('https://api.wunderground.com/api/' + apiKey + '/conditions/q/' + lat + ',' + long + '.json')
      .then((data) => {
        data.data.current_observation.precip_today_in === "0.00" ?
          this.setState({
            precip: "No Precipitation"
          }) :
          this.setState({
            precip: data.data.current_observation.precip_today_in + ' inches of Precipitation'
          })
        this.setState(
          {

            icon: data.data.current_observation.icon,
            city: data.data.current_observation.display_location.city,
            temp: Math.trunc(data.data.current_observation.temp_f),
            condition: (data.data.current_observation.weather).toUpperCase(),
            windDir: data.data.current_observation.wind_dir,
            windSp: data.data.current_observation.wind_mph,
            usState: data.data.current_observation.display_location.state,
            feelsLike: Math.trunc(data.data.current_observation.feelslike_f),
            retrieving: false
          }
        )

      })
  }

  precip() {

  }

  componentDidMount() {
    const lat = this.props.lat
    const long = this.props.long
    this.getCurrentInfo(lat, long)
  }

  componentWillReceiveProps(nextProps) {
    // Check if lat actually changed
    if (JSON.stringify(this.props.lat) !== JSON.stringify(nextProps.lat)) {
      const lat = nextProps.lat
      const long = nextProps.long
      this.getCurrentInfo(lat, long)
    }
  }

  render() {
    const day = moment().format('dddd');
    const date = moment().format('MMMM Do YYYY');
    const condition = this.state.condition;
    return this.state.retrieving === true ?
      <Loader /> :
      (
        <div className='col-md-8 currentContainer'>
          <div className="col-md-6 currentIcon text-center">
            <h2 className="currentLocation">
              {this.state.city}, {this.state.usState}
            </h2>
            <Image src={process.env.PUBLIC_URL + './icons/256x256/' + this.state.icon + '.png'}></Image>
            <p>{condition}</p>
            <div>
              {this.state.precip}
            </div>
          </div>

          <div className="col-md-6 currentRight">
            <div className="currentInfo">
              <div className="currentDate">
                <p className="today">TODAY</p>
                <p className="day">{day}</p>
                <p>{date}</p>
              </div>
              <CurrentTemp
                temp={this.state.temp}
                feelsLike={this.state.feelsLike}
              />



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
