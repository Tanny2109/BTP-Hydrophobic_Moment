// import logo from './logo.svg';
// import './App.css';
import './Popup.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function App() {

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const navigate = useNavigate();
  
  const formik = useFormik({
      initialValues: {
        sequence: "",
        scale: "Fauchere-Pilska",
        type: "alpha",
      },
  });
  
  const onChange = (e) => { 
        
    let latestChar = e.target.value[e.target.value.length - 1]
    // console.log(latestChar);
    if (latestChar && latestChar === latestChar.toLowerCase()) {
        setOpen(true);
    } else {
        setOpen(false);
    }

    formik.handleChange(e);
  }
  
  const submitFunc = (e) => {
    e.preventDefault();
    // let sequence = document.getElementById('seq').value;
    let sequence = formik.values.sequence;
    // let sc = document.getElementById('scale').value;
    let scale = formik.values.scale;
    // let type = document.getElementById('type').value;
    let type = formik.values.type;

    // console.log([sequence, scale, type]);
    
    if (sequence === "") {
      alert('Please enter the sequence');
    } else {
        try {
          navigate(
            '/check', {
            replace: true,
            state: {
              sequence: sequence,
              scale: scale,
              type: type,
            }
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <>
      <main className='h-screen flex items-center justify-center'>
                
        <form className='bg-white rounded-lg flex w-1/2' onSubmit={submitFunc}>

          <div className='flex-1 p-20'>
            
            <h1 className='text-2xl pb-2 text-center font-mono'>Hydrophobic Moment of a Polypeptide Chain</h1>   
            
            <div className='mt-6'>

              {/*div for sequence */}
              <div className='pb-4'>
                <label htmlFor="sequence" className='block text-lg pb-2 font-mono'>Enter the Amino Acid sequence</label>
                  <input
                    type="text"
                    placeholder='Enter Sequence'
                    name="sequence"
                    id="sequence"
                    value={formik.values.sequence}
                    // onChange={formik.handleChange}
                    onChange={onChange}
                    className='border-2 border-gray-500 p-2 rounded-md w-3/4 outline-none focus:border-teal-500'
                  />
                  <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
                      <div className="modal">
                        <button className="close" onClick={closeModal}>
                          &times;
                        </button>
                        <div className="header"> Warning!! </div>
                        <div className="content">
                          {' '}
                          Capital alphabets signify natural Amino Acids. Entering small-case alphabets will be considered
                          as unnatural amino acid and you will have to enter its hydrophobic value in next page.
                        <br />
                        <br />
                          Close this pop-up to continue.
                        </div>
                        <div className='flex justify-center'>
                          <button className='border-2 border-gray-500 p-2 rounded-md outline-none hover:bg-teal-400' onClick={closeModal}>Close</button>
                        </div>
                      </div>
                  </Popup>    
              </div>

              {/*div for scale */}
              <div className='pb-4 text-lg'>
                <label htmlFor="scale" className='block text-lg pb-2 font-mono'>Enter Hydrophobicity scale:</label>
                <div className='pt-2'>
                    <select
                      name="scale"
                      id="scale"
                      value={formik.values.scale}
                      onChange={formik.handleChange}
                      className='border-2 border-gray-500 p-2 rounded-md w-1/4 outline-none focus:border-teal-500'
                    >
                      <option>Fauchere-Pilska</option>
                      <option>Eisenberg</option>
                    </select>
                </div>
              </div>

              {/*div for type */}
              <div className='pb-4 text-lg'>
                <label htmlFor="type" className='block text-lg pb-2 font-mono'>Enter type of amino-acid chain:</label>
                <div>
                  <select
                    name="type"
                    id="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    className='border-2 border-gray-500 p-2 rounded-md w-1/4 outline-none focus:border-teal-500'
                  >
                    <option>alpha</option>
                    <option>beta</option>
                    <option>Polyproline-I</option>
                    <option>Polyproline-II</option>
                  </select>
                </div>
              </div>   
            </div>
            {/*div for submit button */}
            <div className=' flex flex-col font-mono items-center'>
                {/* <input type="submit" value="submit" onClick={submitFunc} className='bg-black text-white'/> */}
              <button
                className='border-2 border-gray-500 p-2 rounded-md w-1/4 outline-none hover:bg-teal-400'
                onSubmit={submitFunc}
              >
                Submit
              </button>
            </div>
          </div>
          
        </form>
        
      </main>
     
    </>
  );
}

export default App;
