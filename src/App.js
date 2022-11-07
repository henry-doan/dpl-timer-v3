import { useState } from 'react';
import Moment from 'react-moment';

const App = () => {
  const [timerDisplay, setTimerDisplay] = useState(null)
  const [mtnEndTime, setMtnEndTime] = useState(null)
  const [pacficEndTime, setPacificEndTime] = useState(null)
  const [easternEndTime, setEasternEndTime] = useState(null)
  const [centralEndTime, setCentralEndTime] = useState(null)
  const [alaskaEndTime, setAlaskaEndTime] = useState(null)
  const [mins, setMins] = useState(null)
  const [prevTimer, setPrevTimer] = useState(null);
  
  const timer = (seconds) => {
    let countdown;
    clearInterval(countdown);
    countdown = undefined;
    setTimerDisplay(null)
    setMtnEndTime(null)
    
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    clearInterval(prevTimer);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);
      setPrevTimer(countdown)

      if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  const displayTimeLeft = (seconds) => {
    const min = Math.floor(seconds / 60);
    const remainderSecs = seconds % 60;
    const display = `${min}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
    document.title = display;
    setTimerDisplay(display);
  }

  const displayEndTime = (timestamp) => {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const min = end.getMinutes();
    
    setPacificEndTime(`${adjustedHour - 1}:${min < 10 ? '0' : ''}${min} Pacific`);
    setAlaskaEndTime(`${adjustedHour - 2}:${min < 10 ? '0' : ''}${min} Alaska`);
    setMtnEndTime(`Be Back At ${adjustedHour}:${min < 10 ? '0' : ''}${min} Mountain`);
    setCentralEndTime(`${adjustedHour + 1}:${min < 10 ? '0' : ''}${min} Central`);
    setEasternEndTime(`${adjustedHour + 2}:${min < 10 ? '0' : ''}${min} Eastern`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
  }

  return (
    <>
      <div>
        <div>
          <button
            onClick={() => timer(300)}
          >
            Take 5
          </button>
          <button 
            onClick={() => timer(600)}
          >
            Break 10
          </button>
          <button 
            onClick={() => timer(900)}
          >
            Quick 15
          </button>
          <button 
            onClick={() => timer(1200)}
          >
            Breather 20
          </button>
          <button 
            onClick={() => timer(3600)}
          >
            Lunch Break
          </button>
          <form onSubmit={handleSubmit}>
            <input 
              type="number" 
              name="minutes" 
              value={mins}
              placeholder="Enter Minutes" 
              onClick={(e) => setMins(e.target.value)}
            />
          </form>
        </div>
        <div>
          <h1>
            {timerDisplay}
          </h1>
          <p>
            {pacficEndTime} <br />
            {alaskaEndTime} <br />
            {mtnEndTime} <br />
            {centralEndTime} <br />
            {easternEndTime}
          </p>
        </div>
      </div>
      <a href="http://www.devpointlabs.com/" target="_blank" rel="noreferrer"><img src="Beaker.png" className="watermark" /></a>
    </>
  )
}

export default App;
