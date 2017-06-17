import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ProgressBar from './ProgressBar';
import Timer from './Timer'
const timer = new Timer();

export default class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      startButtonText: 'Start',
      timerLimit: 0,
      timerRunning: false,
      type: 'Welcome to High Intensity Interval Training!'
    }
  }

  startTimer = (limit, type) => {
    this.setState({ timerRunning: true, startButtonText: 'Pause', timerLimit: limit, type });
    timer.start(limit);
  }

  stopTimer = () => {
    this.setState({ timerRunning: false, startButtonText: 'Start', timerLimit: 0, type: 'Welcome to High Intensity Interval Training!' });
  }

  pauseTimer = () => {
    this.setState({ timerRunning: false, startButtonText: 'Resume' });
  }

  timerFinish = () => {
    this.setState({ timerRunning: false, startButtonText: 'Start', timerLimit: 0, type: 'Welcome to High Intensity Interval Training!' });
    console.log('finish:', this.state.timerRunning);
  }

  startIntervalWorkout = () => {
    console.log("start workout")
    this.startTimer(10, 'Rest');
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
        <Text style={styles.welcome}>{this.state.type}</Text>
        <Button
          onPress={!this.state.timerRunning ? this.startIntervalWorkout : this.pauseTimer}
          title={this.state.startButtonText}
          color="#0909ea"
        />
        <Button
          onPress={this.stopTimer}
          title="Stop"
          color="#841584"
        />
        {displayProgressBar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
