import React from 'react';
import PropTypes from 'prop-types';

const CurrentTemp = ({temp, feelsLike}) => (

    <div className="currentTemp">
      <h1>{temp} &#176;</h1>
      <p className="feelsLike">Feels like: {feelsLike} &#176; F</p>

    </div>
)

CurrentTemp.propTypes = {
  temp: PropTypes.number.isRequired,
  feelsLike: PropTypes.string.isRequired
}

export default CurrentTemp;
