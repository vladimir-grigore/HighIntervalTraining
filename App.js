import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ProgressBar from './ProgressBar';

export default class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      startButtonText: 'Start',
      timerLimit: 0,
      timerRunning: false
    }
  }

  startTimer = () => {
    this.setState({ timerRunning: true, startButtonText: 'Pause', timerLimit: 10 });
  }

  stopTimer = () => {
    this.setState({ timerRunning: false, startButtonText: 'Start', timerLimit: 0 });
  }

  pauseTimer = () => {
    this.setState({ timerRunning: false, startButtonText: 'Resume' });
  }

  timerFinish = () => {
    console.log("FINISH")
    this.setState({ timerRunning: false, startButtonText: 'Start', timerLimit: 0  });
  }

  render() {
    displayProgressBar = () => {
      if(this.state.timerRunning){
        return <ProgressBar maxTime={this.state.timerLimit} timerFinish={this.timerFinish}/>
      } else {
        return null;
      }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to High Intensity Interval Training!
        </Text>
        <Button
          onPress={!this.state.timerRunning ? this.startTimer : this.pauseTimer}
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
