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

  componentDidMount = () => {
    let currentTime = 0
    this.timer = setInterval(() => {
      let progress = currentTime / this.props.maxTime;
      this.setState({ progress });
      currentTime += 0.1;
      if(currentTime >= this.props.maxTime){
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
        <Text>{this.props.timer.timeRemaining / 1000}</Text>
      </View>
    )
  }
}

export default ProgressBar;
