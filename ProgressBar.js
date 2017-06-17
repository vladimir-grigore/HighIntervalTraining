import ProgressBarComponent from 'ProgressBarAndroid';
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
      <View>
        <ProgressBarComponent progress={this.state.progress} styleAttr="Horizontal" indeterminate={false} />
        <Text>Time remaining: {this.props.timer.timeRemaining / 1000}</Text>
      </View>
    )
  }
}

export default ProgressBar;
