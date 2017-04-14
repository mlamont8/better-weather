import React from 'react';

const CurrentTemp = ({temp}) => (
  <div className="col-md-6">
    <div className=" col-md-4 col-md-offset-4 currentTemp well text-center">
      <h1>{temp} &#176;</h1>
    </div>
  </div>
)

CurrentTemp.propTypes = {
  temp: React.PropTypes.string.isRequired
}

export default CurrentTemp;
