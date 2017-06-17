export default class Timer{
  constructor(){
    this.startTime = 0;
    this.endTime = 0;
    this.running = false;
    this.timeout = 250;
    this.timeRemaining = 0;
  }

  start = (seconds) => {
    this.startTime = seconds * 1000;
    this.running = true;
    this.timeRemaining = seconds * 1000;
    this.updateTimer();
  }

  updateTimer = () => {
    if(this.startTime - this.timeout > this.endTime){
      setTimeout(this.updateTimer, this.timeout);
    }

    if(this.running) {
      this.timeRemaining -= this.timeout;
      this.startTime -= this.timeout;
      if(this.startTime <= this.endTime){
        this.stop();
      }
    }
  }

  pause = () => {
    this.running = false;
  }

  resume = () => {
    this.running = true;
  }

  stop = () => {
    this.running = false;
    this.startTime = 0;
  }

}