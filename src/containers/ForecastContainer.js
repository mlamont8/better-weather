import React from 'react';
import axios from 'axios';
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


  componentDidMount() {
    axios.get('http://api.wunderground.com/api/'+ apiKey + '/forecast/q/' + this.props.state +'/'+this.props.city+ '.json')
    .then ((data) => {
      this.setState(
        {
          forecast: data.data.forecast.simpleforecast.forecastday,
          retrieving: false
        },
      )
    }
  )
  }


    render() {

      return (
        <div className="row halfcontainer">
          {this.state.forecast.map(data => {
            return (
              <div key={data.id} className="col-md-2 col-md-offset-1 forecastBlock">
                <p>
                  {data.date.weekday}
                </p>
                <Image responsive src={'https://icons.wxug.com/i/c/k/' + data.icon + '.gif'}></Image>
                {data.conditions}
                <div className='row'>
                  <div className='col-md-6'>
                    High: {data.high.fahrenheit}
                  </div>
                  <div className='col-md-6'>
                    Low: {data.low.fahrenheit}

                  </div>

                </div>
              </div>

            )
          })}

        </div>
      );
    }

  }

  export default ForecastContainer;
