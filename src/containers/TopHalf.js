import React from 'react';
import axios from 'axios';

const apiKey = 'f67b93e533d6313a';
class TopHalf extends React.Component {

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
    const data = this.state.forecast
    console.log(data)

    return (
      <div>
        <div className="row"></div>
      </div>
    );
  }

}

export default TopHalf;
