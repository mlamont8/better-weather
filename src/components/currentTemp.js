import React from 'react';

const CurrentTemp = ({temp}) => (

    <div className=" col-md-2 currentTemp text-center">
      <h1>{temp} &#176;</h1>
    </div>
)

CurrentTemp.propTypes = {
  temp: React.PropTypes.string.isRequired
}

export default CurrentTemp;
