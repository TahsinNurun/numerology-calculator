import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Home = () => {

    var textStyle = { border: "3px solid skyBlue", borderRadius: "10px", color: "Azure", backgroundColor: "skyBlue" };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [givenName, setGivenName] = useState('');
    const onSubmit = data => {
        setGivenName(data);
    };

    const providedName = (data) => {
        var x = {
            A: 1, I: 1, J: 1, Q: 1, Y: 1, B: 2, K: 2, R: 2, C: 3, G: 3, L: 3, S: 3, D: 4, M: 4, T: 4, E: 5, H: 5, N: 5, X: 5, U: 6, V: 6, W: 6,
            O: 7, Z: 7, F: 8, P: 8
        };
        var name = data.example.replace(/\s/g, '').toUpperCase();
        var nameScore = 0;
        for (var i = 0; i < name.length; i++) {
            var curChar = name.charAt(i);
            var curValue = x[curChar];
            nameScore = nameScore + curValue;
            console.log(nameScore);
        }
        return nameScore;
    }

    function getSinDig(n) {
        if(n < 10 || n === 11 ){
            return n;
        }
        const lastDig = n % 10;
        const remainNum = Math.floor(n / 10);
        return getSinDig(lastDig + getSinDig(remainNum));
    }

    const destNum = (data) => {
        const resNameScore = providedName(data);
            var dNum = getSinDig(resNameScore);
            console.log(dNum);
            return (dNum); 
    }

    const soulNum = (data, params) => {
        var strVow = '';
        var str = data.example.replace(/\s/g, '').toUpperCase();
        for (var i = 0; i < str.length; i++) {
            if (str[i] === 'A' || str[i] === 'E' || str[i] === 'I' || str[i] === 'O' || str[i] === 'U') {
                strVow += str[i];
            }
            console.log(strVow)
        }
        var desireNum = params({ example: strVow });
            var dNum = getSinDig(desireNum);
            console.log(dNum);
            return (dNum);
    }

    const personNum = (data, params) => {
        var strCon = '';
        var str = data.example.replace(/\s/g, '').toUpperCase();
        for (var i = 0; i < str.length; i++) {
            if (str[i] !== 'A' && str[i] !== 'E' && str[i] !== 'I' && str[i] !== 'O' && str[i] !== 'U') {
                strCon += str[i];
            }
            console.log(strCon)
        }
        var desireNum = params({ example: strCon });
            var dNum = getSinDig(desireNum);
            console.log(dNum);
            return (dNum);
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
            {givenName && <h3 className="m-3" style={textStyle}>Your Compound number is: {providedName(givenName)}</h3>}
            {givenName && <h3 className="m-3" style={textStyle}>Your Destiny number is: {destNum(givenName)}</h3>}
            {givenName && <h3 className="m-3" style={textStyle}>Your Soul number is: {soulNum(givenName, providedName)}</h3>}
            {givenName && <h3 className="m-3" style={textStyle}>Your Personality number is: {personNum(givenName, providedName)} </h3>}
        </div>
    );
};

export default Home;