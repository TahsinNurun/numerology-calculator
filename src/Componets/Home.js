import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Home = () => {

    var textStyle={border:"3px solid skyBlue", borderRadius: "10px", color:"Azure", backgroundColor:"skyBlue"};

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [givenName, setGivenName] = useState('');
    const onSubmit = data => {
        setGivenName(data);
    };

    const providedName = (data) => {
        var x = {
            A: 1, J: 1, S: 1, B: 2, K: 2, T: 2, C: 3, L: 3, U: 3, D: 4,
            M: 4, V: 4, E: 5, N: 5, W: 5, F: 6, O: 6, X: 6, G: 7, P: 7, Y: 7, H: 8,
            Q: 8, Z: 8, I: 9, R: 9
        };
        var name = data.example.replace(/\s/g, '').toUpperCase();
        var nameScore = 0;
        for (var i = 0; i < name.length; i++) {
            var curChar = name.charAt(i);
            var curValue = x[curChar];
            nameScore = nameScore + curValue;
        }
        // return nameScore;
        var output = [];
        var sNum = nameScore.toString();
        for(var i = 0; i < sNum.length; i++) {
            output.push(+sNum.charAt(i));
        }
        for (var i = 0, sum = 0; i < output.length; sum += output[i++]);
        return sum;
    }

    const soulNum = (data, params) => {
        var strVow = '';
        var str = data.example.replace(/\s/g, '').toUpperCase();
        for (var i = 0; i < str.length; i++) {
            if (str[i] === 'A' || str[i] === 'E' || str[i] === 'I' || str[i] === 'O' || str[i] === 'U') {
                strVow += str[i];
            }
        }
        var desireNum = params({ example: strVow });
        return desireNum;
    }

    const perNum = (proName, soulName, data) => {
        return Math.abs(soulName(data) - proName(data, soulName));
    }

    return (
        <div>
            <h3 className="m-3">WELCOME, LET'S FIND YOUR LUCKY NUMBERS</h3>
            <h4 className="m-3">Please type your name</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" id="your-name" type="text" {...register("example")} className="m-3" />
                {errors.exampleRequired && <span>This field is required</span>}
                <br />
                <input className="btn-warning m-3" style={{ borderRadius: "10px" }} type="submit" />
            </form>
            {givenName && <h3  className="m-3" style={textStyle}>Your Compound number is: {providedName(givenName)+soulNum(givenName,providedName)+perNum(soulNum,providedName,givenName)} </h3>}
            {givenName && <h3 className="m-3" style={textStyle}>Your Destiny number is: {providedName(givenName)}</h3>}
            {givenName && <h3  className="m-3" style={textStyle}>Your Soul number is: {soulNum(givenName, providedName)}</h3>}
            {givenName && <h3  className="m-3" style={textStyle}>Your Personality number is: {perNum(soulNum, providedName, givenName)} </h3>}    
        </div>
    );
};

export default Home;