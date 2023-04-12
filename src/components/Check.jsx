import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { F, E } from './Scales';

let nc = [];

let newObj;
function Check() {
    
    const navigate = useNavigate();
    const location = useLocation();
    let sequence = location.state.sequence;
    let scale = location.state.scale;
    let type = location.state.type;
    sequence = sequence.toUpperCase();
    console.log(F)
    if (scale == 'F') newObj = Object.assign({}, F);
    else newObj= Object.assign({}, E);

    const handleOnChange = (e, c) => {
        let val = e.target.value;
        val = parseFloat(val);
        let char = c;

        newObj[char] = val;
    }

    const handleOnClick = () => {
     
        if (Object.keys(newObj).length == ( Object.keys(F).length+ nc.length)) {
            navigate(
                '/logic', {
                    replace: true,
                    state: {
                        sequence: sequence,
                        scale: scale,
                        type: type,
                        values: newObj,
                    }
                }
            )  
        } else {
            alert('Enter the values for all missing amino acids.');
        }
    }
    
    for (let s of sequence) {
        // console.log(newObj)
        let char = s;
        if (!(char in newObj) && !(nc.includes(char))) {
            nc.push(char);
        }
    }

    if (nc.length === 0) {
        try {
            navigate(
                '/logic', {
                    replace: true,
                    state: {
                        sequence: sequence,
                        scale: scale,
                        type: type,
                        values: newObj,
                    }
                }
            )  
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {
                nc.map((c, ind) => 
                    <div key={ind}>
                        <label id="char">Enter the value for the missing amino acid: {c}</label>
                        <input type="number" onChange={(e) => { handleOnChange(e,c) }}/>
                    </div>
                )
            }
            <button style={{paddingTop: 10}} onClick={handleOnClick}>Submit</button>
        </>
    )
    
}

export default Check;