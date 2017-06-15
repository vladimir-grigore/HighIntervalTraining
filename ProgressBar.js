import ProgressBarComponent from 'ProgressBarAndroid';
import React, {Component} from 'react';
import Text from 'react-native';

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
      // console.log('progress bar', currentTime / this.props.maxTime);
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
      <ProgressBarComponent progress={this.state.progress} styleAttr="Horizontal" indeterminate={false} />
    )
  }
}

export default ProgressBar;