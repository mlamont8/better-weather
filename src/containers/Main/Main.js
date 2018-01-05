import React from 'react';
import SearchContainer from '../SearchContainer/SearchContainer';
import CurrentContainer from '../CurrentContainer/CurrentContainer';
import ForecastContainer from '../ForecastContainer/ForecastContainer';
// import { Navbar, FormGroup, Button } from 'react-bootstrap';
// import Autocomplete from 'react-autocomplete';
// import jsonp from 'jsonp';






class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      retrieving: true,
    }
    this.onSearch = this.onSearch.bind(this);
  };

onSearch(lat, long){
  console.log("search update", lat, long);
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
            lat: 36.0726354,
            long: -79.7919754,
            retrieving: false
          }
        )
      }

  }

// retrieveData(searchText){
//   let _this = this;
//   jsonp('https://autocomplete.wunderground.com/aq?query='+ searchText + '&c=US&param=cb' , { param: 'cb' }, function (err, data) {
//   if (err) {
//     console.error("Cannot Load Data from Remote Source");
//   } else {
//     console.log(data.RESULTS);
//     _this.setState({
//       autocompleteData: data.RESULTS
//     })
//   }
// });
// }
//
// onChange(e){
//     this.setState({
//         value: e.target.value
//     });
//
//     /**
//      * Handle the remote request with the current text !
//      */
//     this.retrieveData(e.target.value);
//
//     console.log("The Input Text has changed to ", e.target.value);
// }
//
// // Gets the lat and long when item is selected
// onSelect(val,item){
//   console.log(item);
//     this.setState({
//         lat: item.lat,
//         long: item.lon
//     });
//
//     console.log("Option selected : ", val);
// }
//
// renderItem(item, isHighlighted){
//     return (
//         <div className="itemResult" style={{ background: isHighlighted ? 'lightgray' : 'black' }}>
//             {item.name}
//         </div>
//     );
// }
//
// getItemValue(item){
//     // You can obviously only return the Label or the component you need to show
//     // In this case we are going to show the value and the label that shows in the input
//     // something like "1 - Microsoft"
//
//     return `${item.name}`;
// }



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
