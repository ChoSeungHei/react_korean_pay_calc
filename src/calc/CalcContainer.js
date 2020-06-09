import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/css/font.css';
import '../style/css/style.css';
import {BsArrowCounterclockwise} from 'react-icons/bs';

const CalcContainer = () => {
  const [cate,setCate] = useState('annual');
  const [salary,setSalary] = useState('');
  const [kor,setKor] = useState('');
  const [nontax,setNontex] = useState('100,000');
  const [depend,setDepend] = useState(1);
  const [youth,setYouth] = useState(0);
  const [result,setResult] = useState(true)
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

  const handleNontax = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value !== '' || re.test(e.target.value)) {
      var temp = e.target.value;
      
      temp = uncomma(temp);

      temp = Number(temp)
      temp = temp.toLocaleString('en');

      setNontex(temp);

     
    }
    else if(e.target.value === '')
    {
      temp = e.target.value;
      setNontex(temp);
    }
  }

  const handleDepend = (e)=> {
    var temp = e.target.value;
    setDepend(temp);
  }

  const handleYouth = (e)=> {
    var temp = e.target.value;
    setYouth(temp)
    console.log(temp)
  }

  const handleReset = () => {
    setCate('annual');
    setSalary('');
    setKor('');
    setNontex('100,000');
    setDepend(1);
    setYouth(0);
  }
  return (
  <div>
    <div className="container">
      <div className="row">
        <div className="col text-center m-5">
          {/* <h1>A small salary 💰</h1> */}
          <h1>A secret 💰</h1>
        </div>
      </div>

      <div className="row center_layer">
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
        <div className="col col-7 text-center ml-2">
          <input type="text" className="form-control" placeholder="금액을 입력하세요."
            value={salary}
            onChange={handleSalary}
          />
        </div>

      </div>
      <div className = "row center_layer">
      <div className="col col-2 text-center"></div>
      
        <div className="col col-7 ml-2 pt-2 bold">
          <b>{kor}</b>
        </div>
      </div>

      <div className="row center_layer">
        <div className="col col-3 ml-2 pt-3">
          비과세액
        </div>
        <div className="col col-3 pt-3">
          부양가족 수
        </div>
        <div className="col col-3 pt-3">
          20세 이하 자녀 수
        </div>
      </div>
      <div className="row center_layer">
        <div className="col col-3 ml-2 pt-2">
          <input type="text" className="form-control" placeholder="최대 월 10만원"
          value={nontax}
          onChange={handleNontax}
          />
        </div>
        <div className="col col-3 pt-2">
          <input type="text" className="form-control" placeholder="본인 포함"
            value={depend}
            onChange={handleDepend}
          />
        </div>
        <div className="col col-3 pt-2">
          <input type="text" className="form-control" placeholder="부양가족 수 미만"
            value={youth}
            onChange={handleYouth}
          />
        </div>
      </div>
      {
        result ? (
          <div className="row center_layer card_layer">
        <div className="col col-12 ml-2 pt-3">
          <div className="card">
            <div className="card-body">
              This is some text within a card body.
            </div>
          </div>
        </div>
      </div>
        ):null
      }
    </div>
    
    <div className="col text-center pt-5">
      <button className="btn btn-secondary mr-2" onClick={handleReset}>
        <BsArrowCounterclockwise/> 초기화
      </button>

      <button className="btn btn-info">
        계산하기
      </button>
      
    </div>  
  </div>
  );
}

export default CalcContainer;