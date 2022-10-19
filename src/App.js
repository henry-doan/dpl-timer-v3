import { useState } from 'react';

const App = () => {
  let countdown;
  const [timerDisplay, setTimerDisplay] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [mins, setMins] = useState(null)
  // const timerDisplay = document.querySelector('.display__time-left');
  // const endTime = document.querySelector('.display__end-time');
  // const buttons = document.querySelectorAll('[data-time]');

  const timer = (seconds) => {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

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
    setEndTime(`Be Back At ${adjustedHour}:${min < 10 ? '0' : ''}${min}`);
  }

  // const startTimer = () => {
  //   const seconds = parseInt(this.dataset.time);
  //   timer(seconds);
  // }

  // buttons.forEach(button => button.addEventListener('click', startTimer));
  // document.customForm.addEventListener('submit', function (e) {
  //   e.preventDefault();
  //   const mins = this.minutes.value;
  //   console.log(mins);
  //   timer(mins * 60);
  //   this.reset();
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    // const mins = this.minutes.value;
    // console.log(mins);
    timer(mins * 60);
    this.reset();
    debugger
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
            {endTime}
          </p>
        </div>
      </div>
      <a href="http://www.devpointlabs.com/" target="_blank" rel="noreferrer"><img src="Beaker.png" className="watermark" /></a>
    </>
  )
}

export default App;
