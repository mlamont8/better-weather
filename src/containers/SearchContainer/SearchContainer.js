import React from 'react'
import { Navbar, FormGroup } from 'react-bootstrap';
import Autocomplete from 'react-autocomplete';
import jsonp from 'jsonp';


class SearchContainer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      retrieving: true,
      value: '',
      autocompleteData: []
    }
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  };

  retrieveData(searchText) {
    // Retrieve data for autocomplete.  Only if
    //searchterm is greater than 2
    let _this = this;
    if (searchText.length > 2) {
      jsonp('https://autocomplete.wunderground.com/aq?query=' + searchText + '&c=US&param=cb', { param: 'cb' }, function (err, data) {
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

  onChange(e) {
    this.setState({
      value: e.target.value
    });
    this.retrieveData(e.target.value);
  }


  onSelect(val, item) {
    //When an item is selected, sets the new
    //lat and longitute
    console.log(item);
    this.props.onSearch(item.lat, item.lon);
    this.setState({
      value: item.name
    })
  }

  renderItem(item, isHighlighted) {
   
    return (
      <div className="itemResult" style={{ background: isHighlighted ? 'lightgray' : 'black' }}>
        {item.name}
      </div>
    );
  }

  getItemValue(item) {
// Shows Item names in the form

    return `${item.name}`;
  }


  render() {
    return (

      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Better Weather</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <FormGroup>
              <Autocomplete
                getItemValue={this.getItemValue}
                items={this.state.autocompleteData}
                renderItem={this.renderItem}
                value={this.state.value}
                onChange={this.onChange}
                onSelect={this.onSelect}
                menuStyle={{ zIndex: '1', position: 'absolute' }}
              />
            </FormGroup>{' '}
          </Navbar.Form>
        </Navbar.Collapse>

        <div>


        </div>
      </Navbar>

    )
  }
}

export default SearchContainer;
