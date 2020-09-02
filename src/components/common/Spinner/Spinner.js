import React from 'react';
import './spiner.css';

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCircle: 20,
      firstCircleFlow: 'down',
      secondCircle: 10,
    };
  }

  componentDidMount() {
    this.spinnerInterval = setInterval(() => {
      const firstCircleFlow = this.state.firstCircleFlow;
      switch (firstCircleFlow) {
        case 'down':
          this.setState({
            firstCircle: this.state.firstCircle !== 10 ? this.state.firstCircle - 2 : 10,
            secondCircle: this.state.secondCircle !== 20 ? this.state.secondCircle + 2 : 20,
            firstCircleFlow: this.state.firstCircle === 10 ? 'up' : 'down',
          });
          break;

        case 'up':
          this.setState({
            firstCircle: this.state.firstCircle !== 20 ? this.state.firstCircle + 2 : 20,
            secondCircle: this.state.secondCircle !== 10 ? this.state.secondCircle - 2 : 10,
            firstCircleFlow: this.state.firstCircle === 20 ? 'down' : 'up',
          });
      }
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.spinnerInterval);
  }

  render() {
    const firstCircle = (diameter1, diameter2) => {
      return (
        <div className={'spinner'}>
          <div
            className={'firstCircle'}
            style={{
              height: diameter1,
              width: diameter1,
              borderRadius: '30px',
              border: `2px solid rgba(0, 140, 255, 1)`,
              boxShadow: '0 0 10px rgba(0, 140, 255, 0.7)',
            }}
          />
          <div
            className={'firstCircle'}
            style={{
              height: diameter2,
              width: diameter2,
              borderRadius: '30px',
              background: 'rgba(0, 140, 255, 1)',
              boxShadow: '0 0 10px rgba(0, 140, 255, 0.7)',
            }}
          />
          <div
            className={'firstCircle'}
            style={{
              height: diameter1,
              width: diameter1,
              borderRadius: '30px',
              border: '2px solid rgba(0, 140, 255, 1)',
              boxShadow: '0 0 10px rgba(0, 140, 255, 0.7)',
            }}
          />
        </div>
      );
    };

    return <div>{firstCircle(this.state.firstCircle, this.state.secondCircle)}</div>;
  }
}

export default Spinner;
