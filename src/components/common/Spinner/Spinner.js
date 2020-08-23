import React from 'react';
import './spiner.css';

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCircle: 20,
      firstCircleFlow: 'down',
      secondCircle: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      const firstCircleFlow = this.state.firstCircleFlow;

      switch (firstCircleFlow) {
        case 'down':
          this.setState({
            firstCircle: this.state.firstCircle !== 0 ? this.state.firstCircle - 2 : 0,
            secondCircle: this.state.secondCircle !== 20 ? this.state.secondCircle + 2 : 20,
            firstCircleFlow: this.state.firstCircle === 0 ? 'up' : 'down',
          });
          break;

        case 'up':
          this.setState({
            firstCircle: this.state.firstCircle !== 20 ? this.state.firstCircle + 2 : 20,
            secondCircle: this.state.secondCircle !== 0 ? this.state.secondCircle - 2 : 0,
            firstCircleFlow: this.state.firstCircle === 20 ? 'down' : 'up',
          });
      }
    }, 50);
  }

  componentDidUpdate() {}

  secondCircle(diameter) {}

  render() {
    const firstCircle = (diameter1, diameter2) => {
      return (
        <div className={'spinner'}>
          <div
            className={'firstCircle'}
            style={{
              height: diameter1,
              width: diameter1,
              /* borderRadius: '30px',*/
              border: '2px solid rgba(15, 107, 35, 0.5)',
              /*background: 'rgba(15, 107, 35, 1)',*/
            }}
          ></div>
          <div
            className={'firstCircle'}
            style={{
              height: diameter2,
              width: diameter2,
              /* borderRadius: '30px',*/
              background: 'rgba(15, 107, 35, 0.5)',
            }}
          ></div>
          <div
            className={'firstCircle'}
            style={{
              height: diameter1,
              width: diameter1,
              /* borderRadius: '30px',*/
              border: '2px solid rgba(15, 107, 35, 0.5)',
            }}
          ></div>
        </div>
      );
    };

    return <div>{firstCircle(this.state.firstCircle, this.state.secondCircle)}</div>;
  }
}

export default Spinner;
