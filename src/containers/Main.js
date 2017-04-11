import React from 'react';
import Header from './Header';
import TopHalf from './TopHalf';
import BottomHalf from './BottomHalf';
import axios from 'axios';




class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: 0,
      lon: 0,
      retrieving: true
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


  render() {
    return this.state.retrieving === true
    ? <p>Loading</p>
    :
      <div>
        <Header />
        <TopHalf
          city={this.state.city}
          state={this.state.state}

      />
        <BottomHalf
          city={this.state.city}
          state={this.state.state}
      />
    </div>

  }

}



export default Main;
