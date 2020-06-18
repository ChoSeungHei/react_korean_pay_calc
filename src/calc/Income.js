import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/css/font.css';
import '../style/css/style.css';
import data from '../data/income.json';

const Income = props => {
    var member = Number(props.depend) + Number(props.youth);
    console.log(member);
    var tax = '-';
    var countryTax = 0;
    if(props.salary >=770 && props.salary <=10000)
    {
        data.forEach(element => {
            if(props.salary>=element.over && props.salary < element.under)
            {
                while(tax === '-')
                {
                    switch (member) {
                        case 1:
                            tax = element.one;
                            break;
                        case 2:
                            tax = element.two;
                            break;
                        case 3:
                            tax = element.three;
                            break;
                        case 4:
                            tax = element.four;
                            break;
                        case 5:
                            tax = element.five;
                            break;
                        case 6:
                            tax = element.six;
                            break;
                        case 7:
                            tax = element.seven;
                            break;
                        case 8:
                            tax = element.eight;
                            break;
                        case 9:
                            tax = element.nine;
                            break;
                        case 10:
                            tax = element.ten;
                            break;
                        case 11:
                            tax = element.eleven;
                            break;                                        
                        default:
                            tax = element.eleven;
                            break;
                    }
                    member = member -1;
                }
                var vtax = tax.replace(/[^\d]+/g, '');
                countryTax = vtax * 0.1;
                countryTax = Math.floor(countryTax);

                var ten = countryTax %10;
                countryTax = countryTax - ten;

                countryTax = countryTax.toLocaleString('en');
            }
        });
    }
    else if(props.salary < 770)
    {
        tax=0;
    }
    else if(props.salary > 10000)
    {
        var element = data.find(val=>val.over === 10000);
        while(tax === '-')
        {
            switch (member) {
                case 1:
                    tax = element.one;
                    break;
                case 2:
                    tax = element.two;
                    break;
                case 3:
                    tax = element.three;
                    break;
                case 4:
                    tax = element.four;
                    break;
                case 5:
                    tax = element.five;
                    break;
                case 6:
                    tax = element.six;
                    break;
                case 7:
                    tax = element.seven;
                    break;
                case 8:
                    tax = element.eight;
                    break;
                case 9:
                    tax = element.nine;
                    break;
                case 10:
                    tax = element.ten;
                    break;
                case 11:
                    tax = element.eleven;
                    break;                                        
                default:
                    tax = element.eleven;
                    break;
            }
            member = member -1;
        }
        tax = tax.replace(/[^\d]+/g, '');
        var temp = 0;
        if(props.salary>10000 &&props.salary<=14000)
        {
            var seed = props.salary - 10000;
            seed = seed * 0.98 * 0.35 * 1000;
            temp = Number(tax) + Number(seed);
        }
        else if(props.salary>14000 && props.salary <= 28000)
        {
            var seed = props.salary - 14000;
            seed = seed * 0.98 * 0.38 * 1000;
            seed = seed + 1372000;

            temp = Number(tax) + Number(seed);
        }
        else if(props.salary>28000 && props.salary <= 30000)
        {
            var seed = props.salary - 28000;
            seed = seed * 0.98 * 0.40 * 1000;
            seed = seed + 6585600;

            temp = Number(tax) + Number(seed);
        }
        else if(props.salary>30000 && props.salary <= 45000)
        {
            var seed = props.salary - 30000;
            seed = seed * 0.40 * 1000;
            seed = seed + 7385600;

            temp = Number(tax) + Number(seed);
        }
        else if(props.salary>45000)
        {
            var seed = props.salary - 45000;
            seed = seed * 0.42 * 1000;
            seed = seed + 13385600;

            temp = Number(tax) + Number(seed);
        }
        temp = Math.floor(temp);
        tax = temp;

        countryTax = tax * 0.1;
        countryTax = Math.floor(countryTax);

        var ten = countryTax %10;
        countryTax = countryTax - ten;

        countryTax = countryTax.toLocaleString('en');
        tax = tax.toLocaleString('en');
    }

    return (
        <div>
            <div>근로소득세(간이세액): {tax} 원</div>
            <div className='gray_font'>&nbsp;&nbsp;└지방소득세(10%): {countryTax} 원</div>
        </div>
    )
}

export default Income;