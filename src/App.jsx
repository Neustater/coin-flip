import { useRef, useEffect, useState } from "react";
import './App.css'

export default function CoinToss() {
  const [result, setResult] = useState('?');
  const coinRef = useRef(null);

  useEffect(() => {
    const coinElement = coinRef.current;
    //Display outcome of coin flip
    const handleAnimationEnd = () => {
      setResult(Math.random() < 0.5 ? 'H' : 'T');
    };

    //Reset coin to '?' when animation starts
    const handleAnimationStart = () => {
      setResult('?');
    };

    if (coinElement) {
      coinElement.addEventListener('animationend', handleAnimationEnd);
      coinElement.addEventListener('animationstart', handleAnimationStart);
    }

    return () => {
      if (coinElement) {
        coinElement.removeEventListener('animationend', handleAnimationEnd);
        coinElement.removeEventListener('animationstart', handleAnimationStart);
      }
    };
  }, []);


  return (
    <div className='container'>
      <div className='coin-container'>
        <div className='coin-bounds'>
          <input type='checkbox'></input>
          <div className='coin' ref={coinRef}>
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