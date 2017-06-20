import Progress_Bar from 'react-native-progress/Bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    }
  }

  // Normalize the timeRemaining to a value between 0 and 1 to be used as the progress bar indicator
  scaleBetween = (unscaledNum, minAllowed, maxAllowed, min, max) => {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
  }

  // Update progress until timer is finished
  componentDidMount = () => {
    this.timer = setInterval(() => {
      let progress = this.scaleBetween(this.props.timer.timeRemaining, 1, 0, 0, this.props.maxTime * 1000);
      this.setState({ progress });
      if(this.props.timer.timeRemaining <= 0){
        this.props.timerFinish();
      }
    }, 100);
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

render(){
    return(
      <View style={styles.container}>
        <Progress_Bar progress={this.state.progress} width={300} height={20}/>
        <Text style={styles.timerText}>Time remaining:</Text>
        <Text style={styles.timerText}>{this.props.timer.timeRemaining / 1000}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
  },
  timerText: {
    width: 150,
    textAlign: 'center',
    color: 'white',
    fontWeight: '200',
    fontSize: 20,
    textShadowColor: '#252525',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 15,
  }
});

export default ProgressBar;
