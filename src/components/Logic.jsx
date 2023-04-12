import React from 'react';
import { useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { F, E } from './Scales';



function Calculate() {
    // let hv = {};
    let hv = [];
//Object not allowing to store same keys
    // let moment= 0.0;
    const [moment, setMoment] = useState(0.0);
    // let angle;
    const [angle, setAngle] = useState(0);
    // let mean_hydrophobicity = 0.0;
    const [meanH, setMeanH] = useState(0.0);

    const location = useLocation();
    let sequence = location.state.sequence;
    sequence = sequence.toUpperCase();
    let scale = location.state.scale;
    let values = location.state.values;
    let type = location.state.type;

    function get_hydrophobicity(sequence, scale)
    {
        for (let s of sequence)
        {
            let c = s;
            let val = values[c];

            if (val) {
                // hv[c] = val;
                hv.push(val);
            }
        }
    }
    
    function get_moment(li, angle)
    {
        let sum_sin = 0.0, sum_cos = 0.0;
        let k = sequence.split("");
        console.log('k: ',k);

        for (let i = 0; i < k.length; i++) {
            let rad = ((i + 1) * angle * 3.14) / 180.0;
            // sum_sin += obj[k[i]] * Math.sin(rad);
            // sum_cos += obj[k[i]] * Math.cos(rad);
            sum_sin += li[i] * Math.sin(rad);
            sum_cos += li[i] * Math.cos(rad);

        }

        // moment = Math.sqrt(Math.pow(sum_sin, 2) + Math.pow(sum_cos, 2)) / k.length;
        let Mval = Math.sqrt(Math.pow(sum_sin, 2) + Math.pow(sum_cos, 2)) / k.length
        Mval = Mval.toPrecision(3);

        return Mval;
    }
    
    function DoMath() {

        switch (type) {
            case 'alpha':
                setAngle(100);
                break;
            case 'beta':
                setAngle(180);
                break;
            case '3-10':
                setAngle(120);
                break;
            default:
                break;
        }

        get_hydrophobicity(sequence, scale);
        // const sum = Object.values(hv).reduce((a, b) => a + b, 0);
        const sum = hv.reduce((a, b) => a + b, 0);
        // console.log(sum);
        // mean_hydrophobicity = sum / Object.keys(hv).length;
        // let Hval = sum / Object.keys(hv).length;
        let Hval = sum / hv.length;
        // mean_hydrophobicity = mean_hydrophobicity.toPrecision(3);
        Hval = Hval.toPrecision(3);
        let Mval = get_moment(hv, angle);

        return [Mval, Hval];
    }

    const [Mval, Hval] = DoMath();
    console.log(Mval, Hval);

    useEffect(() => {
        setMoment(Mval);
        setMeanH(Hval);
    }, []);

    return (
        <>
            <div className="result">
                <p>Entered Sequence is: {sequence}</p>
                <p>Entered scale is: {scale}</p>
                <p>Mean Hydrophobicity is: {meanH}</p>
                <p>Hydrophobic Moment is: {moment}</p>
            </div>
        </>
    );
}

export default Calculate;