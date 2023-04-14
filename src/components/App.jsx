// import logo from './logo.svg';
// import './App.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function App() {

  const navigate = useNavigate();
  
  const formik = useFormik({
      initialValues: {
        sequence: "",
        scale: "Fauchere-Pilska",
        type: "alpha",
      },
    });

  const submitFunc = (e) => {
    e.preventDefault();
    // let sequence = document.getElementById('seq').value;
    let sequence = formik.values.sequence;
    // let sc = document.getElementById('scale').value;
    let scale = formik.values.scale;
    // let type = document.getElementById('type').value;
    let type = formik.values.type;

    console.log([sequence, scale, type]);
    
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
            
            <h1 className='text-2xl pb-2 text-center font-mono'>Hydrophobic Moment of an Amino Acid Chain</h1>   
            
            <div className='mt-6'>

              {/*div for sequence */}
              <div className='pb-4'>
                <label htmlFor="sequence" className='block text-lg pb-2 font-mono'>Enter the Amino Acid sequence</label>
                <input
                  type="text"
                  placeholder='Enter Sequence'
                  name="sequence"
                  value={formik.values.sequence}
                  onChange={formik.handleChange}
                  className='border-2 border-gray-500 p-2 rounded-md w-3/4 outline-none focus:border-teal-500'
                />
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
                <label htmlFor="type" className='block text-lg pb-2 font-mono'>Enter type of amino acid chain:</label>
                <div>
                  <select
                    name="type"
                    id="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    className='border-2 border-gray-500 p-2 rounded-md w-fit outline-none focus:border-teal-500'
                  >
                    <option>alpha</option>
                    <option>beta</option>
                    <option>3-10</option>
                  </select>
                </div>
              </div>   
            </div>
            {/*div for submit button */}
            <div className=' flex flex-col font-mono items-center'>
                {/* <input type="submit" value="submit" onClick={submitFunc} className='bg-black text-white'/> */}
                <button className='border-2 border-gray-500 p-2 rounded-md w-1/4 outline-none hover:bg-teal-400'>Submit</button>
            </div>
          </div>
          
        </form>
        
      </main>
     
    </>
  );
}

export default App;
