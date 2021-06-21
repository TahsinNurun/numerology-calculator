import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [givenName, setGivenName] = useState('')
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
        return nameScore;
    }

    const soulNum = (data, params) => {
        var strVow = '';
        var str = data.example.replace(/\s/g, '').toUpperCase();
        for(var i =0; i < str.length; i++){
            if(str[i] === 'A' || str[i] === 'E' || str[i] === 'I' ||  str[i] === 'O' ||  str[i] === 'U'){
                strVow += str[i] ;
            }
        }
        var testData = {example: strVow};
        var desireNum = params(testData);
        return desireNum;
    }   
    const perNum = (proName, soulName, data) => {
       return soulName(data) - proName(data,soulName);
    }  
    return (
        <div>
            <h2>Please type your name</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" id="your-name" type="text" {...register("example")} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input type="submit" />
            </form>
            {givenName && <h3>Your Destiny number is: {providedName(givenName)}</h3>}
            {givenName && <h3>Your Desire number is: {soulNum(givenName,providedName)}</h3>}
            {givenName && <h3>Your Personality number is: {perNum(soulNum,providedName,givenName)} </h3>}
        </div>
    );
};

export default Home;