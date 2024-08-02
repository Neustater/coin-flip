import { useState } from "react";
import './App.css'

export default function CoinToss() {
  const [animation, setAnimation] = useState(' idle');
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('?');

  async function spin(){
    if (isSpinning){ 
      console.log("Busy spinning"); 
      return;
    }
    setIsSpinning(true);

    // Reset the animation state
    
    setAnimation(' reset-animation');

    // Force a re-render before setting the next animation state with small delay to accomodate firefox
    await new Promise((resolve) => setTimeout(() => {
      setAnimation(' spin');
      console.log('Is spinning');
      setResult('?');
      resolve();
    }, 1)); 

    //Promise to prevent new spin
    // Delay of 1980 milliseconds then re-render
    await new Promise((resolve) => setTimeout(() => {
      console.log('Finished Spin');
      setResult(Math.random() < 0.5 ? 'H' : 'T');
      resolve();
    }, 1980));

    // Delay of 5000 milliseconds then re-render
    await new Promise((resolve) => setTimeout(() => {
      setAnimation(' idle');
      setResult('?');
      console.log('Idle restarted');
      setIsSpinning(false);
      resolve()
    }, 5000));
  }

  return (
    <div className='container'>
      <div className='coin-container'>
        <div className='coin-bounds'>
          <div className={'coin' + animation} onClick={spin}>
            <div className='back'><p>{result}</p></div>
            <div className='edge-front'></div>
            <div className='center'></div>
            <div className='edge-back'></div>
            <div className='front'><p>{result}</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}