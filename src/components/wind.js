import React from 'react';

const Wind = ({windSp, windDir}) => (
  <div className="col-md-2 text-center">
    <h3>WIND</h3>
    <h3>{windSp} mph {windDir} </h3>
  </div>
)

export default Wind;
