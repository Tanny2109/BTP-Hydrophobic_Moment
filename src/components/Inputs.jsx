import React from 'react';
import { useLocation } from 'react-router-dom';
import { F, E } from './Scales';

const Takeinputs = () => {
    let location = useLocation();
    let arr = location.state.arr;
    
    return (
    <>
        { 
            arr.map((a, i) =>
                <div key={i}>{a}</div>
            )
        }
    </>
    )
}

export default Takeinputs;