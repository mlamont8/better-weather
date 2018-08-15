import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Loader from '../../components/loader/loader';
import { Image } from 'react-bootstrap';

const apiKey = 'f67b93e533d6313a';


class ForecastContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      retrieving: true
    }
  }
  // Get forecast data from wunderground
  getForecastData(lat, long) {
    axios.get('https://api.wunderground.com/api/' + apiKey + '/forecast/q/' + lat + ',' + long + '.json')
      .then((data) => {
        console.log(data.data.forecast);
        this.setState(
          {
            forecast: data.data.forecast.simpleforecast.forecastday,
            retrieving: false
          },
        )
      }
      )
  }

  componentDidMount() {
    const lat = this.props.lat
    const long = this.props.long
    this.getForecastData(lat, long)
  }

  componentWillReceiveProps(nextProps) {
    // Check if city actually changed
    if (JSON.stringify(this.props.lat) !== JSON.stringify(nextProps.lat)) {
      const lat = nextProps.lat
      const long = nextProps.long
      this.getForecastData(lat, long)
    }
  }


  render() {

    return this.state.retrieving === true ?
      <Loader /> :
      (
        <div className="col-md-4 forecastContainer">
          {this.state.forecast.map((data, index) => {
            return (
              <li key={index} className="col-xs-12 forecastBlock">
                <div className="forecastDate col-xs-4">
                  <p className="forecastDay">
                    {data.date.weekday}
                  </p>
                  <p className="forecastMoment">{moment().add(index, 'days').format('LL')}</p>
                </div>
                <div className="forecastIcon col-xs-4">
                  <Image responsive className="center-block" src={process.env.PUBLIC_URL + './icons/64x64/' + data.icon + '.png'}></Image>
                </div>
                <div className="forecastTemp col-xs-4">
                  <p className="highLow">
                    {data.high.fahrenheit}&#176;/
                    {data.low.fahrenheit}&#176;</p>
                  <p className="conditions">{data.conditions}</p>
                </div>

              </li>

            )
          })}

        </div>
      );
  }

}

export default ForecastContainer;
