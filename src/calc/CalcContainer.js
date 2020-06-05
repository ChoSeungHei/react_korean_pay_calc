import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/css/font.css';

const CalcContainer = () => {
  const [cate,setCate] = useState('annual');
  const [salary,setSalary] = useState('');

  const switchAnM = (e) => {
    setCate(e.target.value);
    console.log(cate);
  }

  const handleSalary = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value == '' || re.test(e.target.value)) {
      var temp = e.target.value;
      temp = temp.toLocaleString('en');
      setSalary(temp);
    }
    
    console.log(salary);

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
        <label className={`btn btn-secondary ${cate === 'annual' ? "active" : ""}`}>
          <input type="radio" value="annual" onClick={(e)=> switchAnM(e)}/> 연봉
        </label>
        <label className={`btn btn-secondary ${cate === 'monthly' ? "active" : ""}`}>
          <input type="radio" value="monthly" onClick={(e)=> switchAnM(e)}/> 월급
        </label>
      </div>
      </div>
      <div className="col col-8 text-center">
        <input type="text" className="form-control" placeholder="Text input"
          value={salary}
          onChange={handleSalary}
        />
      </div>
      </div>
    </div>
  );
}

export default CalcContainer;