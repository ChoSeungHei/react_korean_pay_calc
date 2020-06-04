import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/css/font.css';

const CalcContainer = () => {
  const [aActive,setA] = useState(true);
  const [mActive,setM] = useState(false);

  const switchAnM = (value,e) => {
    if(value==='a')
    {
      setA(true);
      setM(false);
    }
    else
    {
      setM(true);
      setA(false);
    }
    console.log(value);
  }

  return (

    <div className="container">
      <div className="row">
        <div className="col text-center m-5">
          <h1>A small salary 💰</h1>
        </div>
      </div>
      <div className="row">
      <div className="col col-4 text-center">
      <div className="btn-group btn-group-toggle " data-toggle="buttons">
        <label className={`btn btn-secondary ${aActive ? "active" : ""}`}>
          <input type="radio" name="options" id="option1" onClick={(e)=> switchAnM('a',e)}/> 연봉
        </label>
        <label className={`btn btn-secondary ${mActive ? "active" : ""}`}>
          <input type="radio" name="options" id="option2" onClick={(e)=> switchAnM('m',e)}/> 월급
        </label>
      </div>
      </div>
      <div className="col col-8 text-center">
        <input type="text" className="form-control" placeholder="Text input"/>
      </div>
      </div>
    </div>
  );
}

export default CalcContainer;