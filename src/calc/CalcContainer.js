import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/css/font.css';

const CalcContainer = () => {
  const [cate,setCate] = useState('annual');
  const [salary,setSalary] = useState('');
  const [kor,setKor] = useState('');

  const switchAnM = (e) => {      //annual or monthly 
    setCate(e.target.value);
    console.log(cate);
  }

  const uncomma = value => {    //delete comma from numbers
    return value.replace(/[^\d]+/g, '');
  }

  const viewKorean = number => {
    var inputNumber  = number < 0 ? false : number;
    var unitWords    = ['', '만', '억', '조', '경'];
    var splitUnit    = 10000;
    var splitCount   = unitWords.length;
    var resultArray  = [];
    var resultString = '';

    for (var i = 0; i < splitCount; i++){
         var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    if(resultString === '')
    {
      setKor('');
    }
    else
    {
      setKor(resultString + "원");
    }

  }
  const handleSalary = (e) => {   //make comma and print korean number
    const re = /^[0-9\b]+$/;

    if (e.target.value !== '' || re.test(e.target.value)) {
      var temp = e.target.value;
      
      temp = uncomma(temp);
      viewKorean(temp);

      temp = Number(temp)
      temp = temp.toLocaleString('en');

      setSalary(temp);

     
    }
    else if(e.target.value === '')
    {
      temp = e.target.value;
      viewKorean(temp);
      setSalary(temp);
    }

  }

  return (

    <div className="container">
      <div className="row">
        <div className="col text-center m-5">
          <h1>A small salary 💰</h1>
        </div>
      </div>

      <div className="row">
        <div className="col col-2 text-center">

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

        <div className="col col-2 text-center">
          {kor}
        </div>

      </div>

      <div className="row">
        <div className="col col-3 m-3">
          비과세액
        </div>
        <div className="col col-3 m-3">
          부양 가족 수
        </div>
        <div className="col col-3 m-3">
          20세 이하 자녀 수
        </div>
      </div>
    </div>
  );
}

export default CalcContainer;