import React from 'react'
import { Navbar, FormGroup, Button } from 'react-bootstrap';
import Autocomplete from 'react-autocomplete';
import jsonp from 'jsonp';


class SearchContainer extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        cityState: '',
        retrieving: true,
        lat: 0,
        long: 0,
        value: '',
        autocompleteData: []
      }
      this.onChange = this.onChange.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.getItemValue = this.getItemValue.bind(this);
      this.renderItem = this.renderItem.bind(this);
      this.retrieveData = this.retrieveData.bind(this);
    };

  retrieveData(searchText){
    // Retrieve data for autocomplete.  Only if
    //searchterm is greater than 2
    let _this = this;
    if (searchText.length > 2) {
    jsonp('https://autocomplete.wunderground.com/aq?query='+ searchText + '&c=US&param=cb' , { param: 'cb' }, function (err, data) {
    if (err) {
      console.error("Cannot Load Data from Remote Source");
    } else {
      console.log(data.RESULTS);
      _this.setState({
        autocompleteData: data.RESULTS
      })
    }
  });
  }
  }

  onChange(e){
      this.setState({
          value: e.target.value
      });
      this.retrieveData(e.target.value);
      console.log("The Input Text has changed to ", e.target.value);
  }


  onSelect(val,item){
    //When an item is selected, sets the new
    //lat and longitute
    console.log(item);
      this.props.onSearch(item.lat, item.lon);
      console.log("Option selected : ", val);
  }

  renderItem(item, isHighlighted){
    console.log("item", item);
      return (
          <div className="itemResult" style={{ background: isHighlighted ? 'lightgray' : 'black' }}>
              {item.name}
          </div>
      );
  }

  getItemValue(item){
      // You can obviously only return the Label or the component you need to show
      // In this case we are going to show the value and the label that shows in the input
      // something like "1 - Microsoft"
      // this.setState({
      //   lat: item.lat,
      //   long: item.lon
      // })
      return `${item.name}`;
  }


  render() {
    return(

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Better Weather</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullRight>
        <FormGroup>
          <Autocomplete
              getItemValue={this.getItemValue}
              items={this.state.autocompleteData}
              renderItem={this.renderItem}
              value={this.state.value}
              onChange={this.onChange}
              onSelect={this.onSelect}
              menuStyle={{zIndex: '1', position: 'absolute'}}
          />
        </FormGroup>{' '}
        <Button type='submit'>Submit</Button>
    </Navbar.Form>

        <div>


        </div>
      </Navbar>

  )
  }
}

export default SearchContainer;
