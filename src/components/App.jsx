// import logo from './logo.svg';
// import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const submitFunc = (e) => {
    e.preventDefault();
    let sequence = document.getElementById('seq').value;
    let sc = document.getElementById('scale').value;
    let type = document.getElementById('type').value;

    try {
      navigate(
        '/check', {
        replace: true,
        state: {
          sequence: sequence,
          scale: sc,
          type: type,
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    <form>
    <div className="App" style={{textAlign: "center"}}>
      
      <h1>Hydrophobic Moment of an Amino Acid Chain</h1>
    
      <div style={{ paddingTop: 50, paddingBottom: 50}}>
        <label for="seq">Enter the AA sequence</label>
        <div>
          <input type="text" id="seq" style={{width: 500}}/>
        </div>
      </div>
      
      <div style={{paddingBottom: 50}}>
        <label for="scale">Enter Hydrophobicity scale:</label>
        <div>
          <input type="text" id="scale" placeholder="E-Eisenberg, F-Fauchere Pilska" style={{width: 200}}/>
        </div>
      </div>

      <div style={{paddingBottom: 50}}>
        <label for="scale">Enter type of amino acid chain:</label>
        <div>
          <input type="text" id="type" placeholder="alpha, beta, 3-10" style={{width: 200}}/>
        </div>
      </div>    
      
      <div style={{paddingBottom: 50}}>
        <input type="submit" value="submit" onClick={submitFunc}/>
      </div>
    </div>
    </form>    
    </>
  );
}

export default App;
