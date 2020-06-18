import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/css/font.css';
import '../style/css/style.css';
import {BsArrowCounterclockwise} from 'react-icons/bs';
import Income from './Income';

const CalcContainer = () => {
  const [cate,setCate] = useState('annual');
  const [salary,setSalary] = useState('');
  const [kor,setKor] = useState('');
  const [nontax,setNontex] = useState('1,200,000');
  const [depend,setDepend] = useState(1);
  const [youth,setYouth] = useState(0);
  const [result,setResult] = useState(false);

  const [tax,setTax] = useState([]);

  const switchAnM = (e) => {      //annual or monthly 
    setCate(e.target.value);
    if(e.target.value === 'monthly')
    {
      setNontex('100,000')
    }
    else
    {
      setNontex('1,200,000')
    }
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
    setResult(false)
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
    setResult(false)
  }

  const handleDepend = (e)=> {
    var temp = e.target.value;
    setDepend(temp);
    setResult(false)
  }

  const handleYouth = (e)=> {
    var temp = e.target.value;
    setYouth(temp)
    console.log(temp)
    setResult(false)
  }

  const handleReset = () => {
    setCate('annual');
    setSalary('');
    setKor('');
    setNontex('1,200,000');
    setDepend(1);
    setYouth(0);

    setResult(false);
  }

  const underZero = (num) => {
    if(num<0)
      return 0;
    else
      return num;
  }

  const handleSubmit = () => {
    var number = uncomma(salary) - uncomma(nontax);

    if(cate === 'annual')
    {
      var nation = number * 0.045 / 12;   //국민연금
      var health = number * 0.03335 / 12;   //건보료
      var insurance = number * 0.008 / 12;  //고용보험
      var recup = health * 0.1025;    //요양보험
    }
    else
    {
      var nation = number * 0.045;   //국민연금
      var health = number * 0.03335;   //건보료
      var insurance = number * 0.008; //고용보험
      var recup = health * 0.1025;  //요양보험
    }

    health = Math.floor(health);
    nation = Math.floor(nation);
    insurance = Math.floor(insurance);
    recup = Math.floor(recup);

    var last = recup %10;
    recup = recup - last;

    last = insurance %10;
    insurance = insurance - last;

    last = nation %10;
    nation = nation - last;

    last = health %10;
    health = health - last;

    health = underZero(health);
    insurance = underZero(insurance);
    recup = underZero(recup);

    if(nation < 13500)    //국민연금 하한액
    {
      nation = 13500;
    }
    else if(nation>218700)    //국민연금 상한액
    {
      nation = 218700;
    }

    if(cate === 'annual')
    {
      number = number / 12;
    }
    number = number / 1000;
    number = Math.floor(number);
    setTax([
      {
        id: tax.length,
        value: nation.toLocaleString('en') + ' 원',
        value2: health.toLocaleString('en') + ' 원',
        value3: recup.toLocaleString('en')+ ' 원',
        value4 : insurance.toLocaleString('en') + ' 원',
        salary : number
      }
    ]);

    setResult(true);
  }

  return (
  <div>
    <div className="container">
      <div className="row">
        <div className="col text-center m-5">
          {/* <h1>A small salary 💰</h1> */}
          <h1>A secret <span role="img" aria-label="money">💰</span> </h1>
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
              국민연금(4.5%): {tax[0].value}
              <br/>
              건강보험(3.335%): {tax[0].value2}
              <br/>
              <div className="gray_font">&nbsp;&nbsp;└요양보험(10.25%): {tax[0].value3}</div>
              고용보험(0.8%): {tax[0].value4}
              <Income salary={tax[0].salary} depend={depend} youth={youth} />
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

      <button className="btn btn-info" onClick={handleSubmit}>
        계산하기
      </button>
      
    </div>  
  </div>
  );
}

export default CalcContainer;