import React from 'react';


const Location = ({city, state}) =>   (
    <div className="row text-center">
      <h2>
      {city}, {state}
      </h2>
    </div>
  );

  Location.propTypes = {
    city: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired
}

export default Location;
