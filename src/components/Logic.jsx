import React from 'react';
import { useLocation } from 'react-router-dom';
// import { F, E } from './Scales';



function Calculate() {
    // let hv = {};
    let hv = [];
//Object not allowing to store same keys
    let moment= 0.0;
    // const [moment, setMoment] = useState(0.0);
    let angle;
    // const [angle, setAngle] = useState(0);
    let mean_hydrophobicity = 0.0;
    // const [meanH, setMeanH] = useState(0.0);

    const location = useLocation();
    let sequence = location.state.sequence;
    let scale = location.state.scale;
    let values = location.state.values;
    let type = location.state.type;

    function get_hydrophobicity(sequence)
    {
        for (let s of sequence)
        {
            let c = s;
            let val = values[c];

            // if (val!=NaN) {
            //     // hv[c] = val;
            //     hv.push(val);
            // }
            hv.push(val);
        }
    }
    
    function get_moment(li, angle)
    {
        let sum_sin = 0.0, sum_cos = 0.0;
        let k = sequence.split("");
        // console.log('k: ', k);
        // console.log("li: ", li);
        console.log('angle: ', angle);

        for (let i = 0; i < k.length; i++) {
            let rad = ((i + 1) * angle * 3.14) / 180.0;
            // sum_sin += obj[k[i]] * Math.sin(rad);
            // sum_cos += obj[k[i]] * Math.cos(rad);
            sum_sin += li[i] * Math.sin(rad);
            sum_cos += li[i] * Math.cos(rad);

        }

        moment = Math.sqrt(Math.pow(sum_sin, 2) + Math.pow(sum_cos, 2)) / k.length;
        moment = moment.toPrecision(3);
        // let Mval = Math.sqrt(Math.pow(sum_sin, 2) + Math.pow(sum_cos, 2)) / k.length
        // Mval = Mval.toPrecision(3);

        // return Mval;
    }
    
    function DoMath() {

        switch (type) {
            case 'alpha':
                angle = 100;
                // setAngle(100);
                break;
            case 'beta':
                angle = 180;
                // setAngle(180);
                break;
            case 'Polyproline-I':
                angle = 360/(3.3);
                // setAngle(120);
                break;
            case 'Polyproline-II':
                angle = 120;
                // setAngle(120);
                break;
            default:
                break;
        }

        get_hydrophobicity(sequence);
        // const sum = Object.values(hv).reduce((a, b) => a + b, 0);
        const sum = hv.reduce((a, b) => a + b, 0);
        // console.log("hv: ",hv);
        // console.log("sum: ", sum);
        mean_hydrophobicity = sum / hv.length;
        // let Hval = sum / Object.keys(hv).length;
        // let Hval = sum / hv.length;
        mean_hydrophobicity = mean_hydrophobicity.toPrecision(3);
        // Hval = Hval.toPrecision(3);
        // let Mval = get_moment(hv, angle);
        get_moment(hv, angle);
        // return [Mval, Hval];
    }

    DoMath();
    // const [Mval, Hval] = DoMath();
    // console.log(Mval, Hval);

    // useEffect(() => {
    //     setMoment(Mval);
    //     setMeanH(Hval);
    // }, []);

    return (
        <>
            <main className='h-screen flex items-center justify-center'>
                <div className='bg-white rounded-lg flex w-1/2'>
                    <div className='flex-1 p-2'>
                        <div className='mt-6 text-center'>
                            <p className='block text-lg pb-2 font-mono'>Entered Sequence is: {sequence}</p>
                            <p className='block text-lg pb-2 font-mono'>Entered scale is: {scale}</p>
                            <p className='block text-lg pb-2 font-mono'>Mean Hydrophobicity is: {mean_hydrophobicity}</p>
                            <p className='block text-lg pb-2 font-mono'>Hydrophobic Moment is: {moment}</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Calculate;