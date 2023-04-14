import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { F, E } from './Scales';


function Check() {
    
    let nc = [];
    let newObj;

    const navigate = useNavigate();
    const location = useLocation();
    let sequence = location.state.sequence;
    let scale = location.state.scale;
    let type = location.state.type;
    sequence = sequence.toUpperCase();
    // console.log(F)
    console.log([sequence, scale, type]);

    if (scale === 'F') newObj = Object.assign({}, F);
    else newObj= Object.assign({}, E);

    const handleOnChange = (e, c) => {
        let val = e.target.value;
        val = parseFloat(val);
        let char = c;

        newObj[char] = val;
    }

    const handleOnClick = () => {
     
        if (Object.keys(newObj).length === ( Object.keys(F).length+ nc.length)) {
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

    useEffect(() => {
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            <main className='h-screen flex items-center justify-center'>
                <div className='bg-white rounded-lg flex w-1/2'>
                    <div className='flex-1'>
                        {
                            nc.map((c, ind) => 
                                <div key={ind} className='pt-5 pl-5'>
                                    <label id="char" className='text-lg font-mono'>Enter the value for the missing amino acid: {c} </label>
                                    <input
                                        className='h-8 border-2 border-gray-500 p-2 rounded-md outline-none focus:border-teal-500'
                                        type="number"
                                        onChange={(e) => { handleOnChange(e, c) }}
                                    />
                                </div>
                            )
                        }
                        <div className=' pt-10 flex flex-col font-mono items-center'>
                        {/* <input type="submit" value="submit" onClick={submitFunc} className='bg-black text-white'/> */}
                            <button
                                className='border-2 border-gray-500 p-2 rounded-md w-fit outline-none hover:bg-teal-400'
                                onClick={handleOnClick}
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
    
}

export default Check;