import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Expo, { Audio } from 'expo';
import ProgressBar from './ProgressBar';
import Timer from './Timer'
const timer = new Timer();
var running = false;
const soundObject = new Expo.Audio.Sound();

export default class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      startButtonText: 'Start',
      timerLimit: 0,
      timerRunning: false,
      type: null
    }
  }

  startTimer = (limit, type, callback) => {
    this.setState({ timerRunning: true, startButtonText: 'Pause', timerLimit: limit, type });
    timer.start(limit);
    let interval = setInterval(() => {
      if(timer.timeRemaining <= 0){
        clearInterval(interval);
        this.playSound();
        callback();
      }
    }, 100);
  }

  stopTimer = () => {
    this.setState({ timerRunning: false, startButtonText: 'Start', timerLimit: 0, type: null });
    timer.stop();
  }

  pauseTimer = () => {
    this.setState({ startButtonText: 'Resume' });
    timer.pause();
  }

  resumeTimer = () => {
    this.setState({ timerRunning: true, startButtonText: 'Pause' });
    timer.resume();
  }

  timerFinish = () => {
    this.setState({ timerRunning: false, startButtonText: 'Start', timerLimit: 0, type: null });
    timer.stop();
  }

  playSound = async () => {
    try {
      const { soundObject, status } = await Expo.Audio.Sound.create(
        require('./ding.mp3'),
        { shouldPlay: true }
      );
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  startIntervalWorkout = (times) => {
    running = true;
    this.startTimer(30, "Workout", () => {
      this.startTimer(10, "Rest", () => {
        running = false;
        times -= 1;
      });
    });

    let interval = setInterval(() => {
      if(!running){
        clearInterval(interval);
        if(times > 0){
          this.startIntervalWorkout(times);
        }
        if(times === 0){
          this.startTimer(30, "Rest", () => {
            console.log("Workout finished!");
          });
        }
      }
    }, 100);
  }

  handleStartClick = () => {
    if(this.state.startButtonText === 'Start'){
      this.startIntervalWorkout(10);
    } else if(this.state.startButtonText === 'Pause'){
      this.pauseTimer();
    } else {
      this.resumeTimer();
    }
  }

  render() {
    displayProgressBar = () => {
      if(this.state.timerRunning){
        return <ProgressBar maxTime={this.state.timerLimit} timerFinish={this.timerFinish} timer={timer}/>
      } else {
        return null;
      }
    }

    return (
      <View style={styles.container}>
        <Image source={require('./img/background.jpg')} style={styles.backgroundImage}>
          <Text style={styles.header}>High Intensity Interval Training</Text>
          <Text style={styles.header}>{this.state.type}</Text>
          <View style={styles.progressBar}>
            {displayProgressBar()}
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.startButton}
              onPress={this.handleStartClick}
            >{this.state.startButtonText}</Text>
            <Text style={styles.stopButton}
              onPress={this.stopTimer}
            >Stop</Text>
            </View>
          </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    textAlignVertical: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: 66,
    fontSize: 30,
    color: 'white',
    fontWeight: '200',
    textShadowColor: '#252525',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 15,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  startButton: {
    backgroundColor: '#3f872b',
    borderRadius: 10,
    width: 100,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: '100',
    textShadowColor: '#252525',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 15,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
  },
  stopButton: {
    backgroundColor: '#c0392b',
    borderRadius: 10,
    width: 100,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: '100',
    textShadowColor: '#252525',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 15,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
  },
  backgroundImage: {
    flex: 1, 
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center'
  },
  progressBar: {
    height: 100,
  },
});
