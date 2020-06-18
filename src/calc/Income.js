import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/css/font.css';
import '../style/css/style.css';
import data from '../data/income.json';



const Income = props => {
    const member = props.depend + props.youth;

    
    const list = data.map((v)=>(
        (props.salary>=v.over && props.salary < v.under) ? (
            (member === 1) ? ( <div>{v.one}</div>):
            (member === 2) ? ( <div>{v.two}</div>):
            (member === 3) ? ( <div>{v.three}</div>):
            (member === 4) ? ( <div>{v.four}</div>):
            (member === 5) ? ( <div>{v.five}</div>):
            (member === 6) ? ( <div>{v.six}</div>):
            (member === 7) ? ( <div>{v.seven}</div>):
            (member === 8) ? ( <div>{v.eight}</div>):
            (member === 9) ? ( <div>{v.nine}</div>):
            (member === 9) ? ( <div>{v.ten}</div>):
            (member === 9) ? ( <div>{v.eleven}</div>):
            null
        ):null
    ))

    return (
        <div>
            {list}
        </div>
    )
}

export default Income;