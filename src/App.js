import {useCallback, useEffect, useRef, useState} from 'react';
import './App.css';

function App() {
  const [length,setLength]=useState(8);
  const [anumber,setAnumber] = useState(false);
  const [acharacter,setAcharacter] = useState(false);
  const [passward,setPassward] = useState("");
  // use Ref hook
  const passwardRef = useRef(null)
  const passwardGenerator = useCallback(()=>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(anumber) str+="0123456789";
        if(acharacter) str+="!@#$%^&*()_+";
        
        for(let i=1;i<=length;i++){
          let char = Math.floor(Math.random()*str.length+1);
          pass += str.charAt(char);
        }
        setPassward(pass);

  },[length,anumber,acharacter,setPassward])
 
  const copyPasswardToClip = useCallback(()=>{
    passwardRef.current?.select()
    passwardRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(passward)
  },[passward])


  useEffect(()=>{
    passwardGenerator()
  },[length,anumber,acharacter,passwardGenerator])
  return (
    <> 
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Passward generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={passward}
        className='outline-none w-full py-1 px-3'
        placeholder='passward'
        readOnly
        ref={passwardRef}
        />
        <button onClick={copyPasswardToClip}
        className='outline-none bg-blue-700 text-white px-3 py-05 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
        <label> Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={anumber}
          id="numberInput"
          onChange={()=>{setAnumber((prev) => !prev)}}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={acharacter}
          id="numberInput"
          onChange={()=>{setAcharacter((prev) => !prev)}}
          />
          <label htmlFor="numberInput">Characters</label>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
