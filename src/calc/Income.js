import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/css/font.css';
import '../style/css/style.css';
import data from '../data/income.json';

const Income = props => {
    var member = Number(props.depend) + Number(props.youth);
    console.log(member);
    var tax = '-';
    var countryTax = 0;
    if(props.tax[0].number >=770 && props.tax[0].number <=10000)
    {
        data.forEach(element => {
            if(props.tax[0].number>=element.over && props.tax[0].number < element.under)
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
    else if(props.tax[0].number < 770)
    {
        tax=0;
    }
    else if(props.tax[0].number > 10000)
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
        if(props.tax[0].number>10000 &&props.tax[0].number<=14000)
        {
            var seed = props.tax[0].number - 10000;
            seed = seed * 0.98 * 0.35 * 1000;
            temp = Number(tax) + Number(seed);
        }
        else if(props.tax[0].number>14000 && props.tax[0].number <= 28000)
        {
            seed = props.tax[0].number - 14000;
            seed = seed * 0.98 * 0.38 * 1000;
            seed = seed + 1372000;

            temp = Number(tax) + Number(seed);
        }
        else if(props.tax[0].number>28000 && props.tax[0].number <= 30000)
        {
            seed = props.tax[0].number - 28000;
            seed = seed * 0.98 * 0.40 * 1000;
            seed = seed + 6585600;

            temp = Number(tax) + Number(seed);
        }
        else if(props.tax[0].number>30000 && props.tax[0].number <= 45000)
        {
            seed = props.tax[0].number - 30000;
            seed = seed * 0.40 * 1000;
            seed = seed + 7385600;

            temp = Number(tax) + Number(seed);
        }
        else if(props.tax[0].number>45000)
        {
            seed = props.tax[0].number - 45000;
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
    var n_tax = tax;
    var n_country = countryTax;

    if(tax.length>3)
    {
        n_tax = tax.replace(/[^\d]+/g, '');
        n_country = countryTax.replace(/[^\d]+/g, '');
    }
    

    var prime = props.tax[0].salary;
    if(props.tax[0].cate === 'annual')
    {
        prime = prime/12;
    }

    var montly_income = prime - props.tax[0].nation - props.tax[0].health - props.tax[0].recup - props.tax[0].insurance - n_tax - n_country;
    var annual_income = montly_income * 12;

    montly_income = Math.floor(montly_income);
    annual_income = Math.floor(annual_income);

    montly_income = montly_income.toLocaleString('en');
    annual_income = annual_income.toLocaleString('en');

    console.log(props.tax[0].cate);
    return (
        <div>
            <div>근로소득세(간이세액): {tax} 원</div>
            <div className='gray_font'>&nbsp;&nbsp;└지방소득세(10%): {countryTax} 원</div>
            <br/>
            {
                props.tax[0].cate === 'annual' ? (
                    <div>
                        <div className="red_result">연 실제 수령액: {annual_income} 원</div>
                        <div className="red">&nbsp;└월 환산 금액: {montly_income} 원</div>
                    </div>
                ): props.tax[0].cate === 'monthly' ? (
                    <div className="red_result">월 실제 수령액: {montly_income} 원</div>
                ):null
            }
        </div>
    )
}

export default Income;