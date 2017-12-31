import React from 'react';


const Location = ({city, state}) =>   (
      <h2>
      {city}, {state}
      </h2>

  );

  Location.propTypes = {
    city: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired
}

export default Location;
