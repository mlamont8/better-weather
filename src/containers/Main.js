import React from 'react';
import Header from './Header';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import CurrentContainer from './CurrentContainer';
import ForecastContainer from './ForecastContainer';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  }

];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength < 4 ? [] : fetchJsonp('https://autocomplete.wunderground.com/aq?query='+ inputValue, {
                                          jsonCallback: 'my_callback'
  })
                                  .then(function(response) {
                                    return response.json()
                                  }).then(function(json) {
                                    console.log(json.results)
                                  }).catch(function(ex) {
                                    console.log('autocomplete failed', ex)
                                  })


};

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);


class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      value: '',
      suggestions: [],
      retrieving: true,
      isSearching: false
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

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
// You already implemented this logic above, so just use it.
onSuggestionsFetchRequested = ({ value }) => {
  this.setState({
    suggestions: getSuggestions(value)
  });
};

// Autosuggest will call this function every time you need to clear suggestions.
onSuggestionsClearRequested = () => {
  this.setState({
    suggestions: []
  });
};


  render() {

    const { value, suggestions, isSearching } = this.state;

// Autosuggest will pass through all these props to the input element.
const inputProps = {
  placeholder: 'Type in a city',
  value,
  onChange: this.onChange
};

const status = (isSearching ? 'Checking...': 'Type for suggestions');

    return this.state.retrieving === true
    ? <p>Loading</p>
    :
      <div className="container main">
        <Navbar>
       <Navbar.Header>
         <Navbar.Brand>
           <a href="#">Brand</a>
         </Navbar.Brand>
         <Navbar.Toggle />
       </Navbar.Header>
       <Navbar.Collapse>

         <Navbar.Form pullRight>
           <FormGroup>

             {/* <FormControl
               type="text"
               placeholder="Search"
               onChange

             /> */}
             <div>
               <div className="status">
                  <strong>Status:</strong>
                  {status}
               </div>

             <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
             />
             </div>
           </FormGroup>

           {' '}
           <Button type="submit">Submit</Button>
         </Navbar.Form>

       </Navbar.Collapse>
     </Navbar>
        <CurrentContainer
          city={this.state.city}
          state={this.state.state}

      />
        <ForecastContainer
          city={this.state.city}
          state={this.state.state}
      />
    </div>

  }

}



export default Main;
