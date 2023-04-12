import { useState } from "react";
import { F, E } from './Scales';

const Home = () => {
    const [inputs, setInputs] = useState();
    const [seq, setSeq] = useState('')
    const [angle, setAngle] = useState('')
    const [scale, setScale] = useState('')
    const handleSumbit = (e) => {
        e.preventDefault();
        console.log(seq, angle, scale);
        let usedScale = (scale=='F')? F:E;
        console.log(usedScale)
        // setInputs()
    }

    return (
        <div>
            <form>
                <div className="App" style={{textAlign: "center"}}>
                
                <h1>Hydrophobic Moment of an Amino Acid Chain</h1>
                
                <div style={{ paddingTop: 50, paddingBottom: 50}}>
                    <label for="seq">Enter the AA sequence</label>
                    <div>
                            <input type="text" id="seq" style={{ width: 500 }} onChange={e => setSeq(e.target.value)} />
                    </div>
                </div>
                
                <div style={{paddingBottom: 50}}>
                    <label for="scale">Enter Hydrophobicity scale:</label>
                    <div>
                            <input type="text" id="scale" placeholder="E-Eisenberg, F-Fauchere Pilska" style={{ width: 200 }}
                                onChange={e => setScale(e.target.value)} />
                    </div>
                </div>

                <div style={{paddingBottom: 50}}>
                    <label for="scale">Enter type of amino acid chain:</label>
                    <div>
                    <input type="text" id="type" placeholder="alpha, beta, 3-10" style={{width: 200}} onChange={e=>setAngle(e.target.value)}/>
                    </div>
                </div>    
                
                <div style={{paddingBottom: 50}}>
                    <input type="submit" value="submit" onClick={handleSumbit}/>
                </div>
                </div>
                </form>    
        </div>
    )
}
export default Home;