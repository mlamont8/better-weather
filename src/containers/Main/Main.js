import React from 'react';
import SearchContainer from '../SearchContainer/SearchContainer';
import CurrentContainer from '../CurrentContainer/CurrentContainer';
import ForecastContainer from '../ForecastContainer/ForecastContainer';




class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      retrieving: true,
      lat: 0,
      long: 0
    }
    this.onSearch = this.onSearch.bind(this);
  };

onSearch(lat, long){
// Updated from search container when a new city is selected
  this.setState({
    lat: lat,
    long: long
  })
}



  componentDidMount() {
// Retrieve lat and long using browser for user...defaults to GSO, NC
      var that = this
      function useGeoData(data){
        that.setState(
          {
            lat: data.coords.latitude,
            long: data.coords.longitude,
            retrieving: false
          }
        )
        };
        if (navigator.geolocation)
        {
        navigator.geolocation.getCurrentPosition(useGeoData);
      }else{
        this.setState(
          {
            lat: 36.070000,
            long: -79.769997,
            retrieving: false
          }
        )
      }

  }




  render() {
    const { retrieving } = this.state;


    return retrieving === true
    ? <p>Loading</p>
    :
    <div className="main">
      <SearchContainer
        onSearch={this.onSearch}/>


      <div className="container-fluid contentContainer">
        <div className="row">
            <CurrentContainer
              lat={this.state.lat}
              long={this.state.long}
          />
            <ForecastContainer
              lat={this.state.lat}
              long={this.state.long}
          />
          </div>
      </div>
    </div>

  }

}



export default Main;
