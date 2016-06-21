var React = require('react');

var StartView = module.exports = React.createClass({
  getInitialState: function () {
    return {
      degrees: 0
    };
  },

  componentDidMount: function () {
    this.interval = setInterval(this.rotate, 100)
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },

  rotate: function () {
    var rotationDegrees = this.state.degrees + 15;
    if (rotationDegrees >= 360) {
      rotationDegrees = 0;
    }
    this.setState({degrees: rotationDegrees});
  },

  render: function () {
    var rotationString = 'rotateY(' + this.state.degrees + 'deg)';
    var styles = {
      transform: 'perspective(1200px) ' + rotationString
    };

    return(
      <div className="start-pane">
        <h1 className="logo" style={styles}>WHERE AM I</h1>

        <button className="phase-button" onClick={this.props.incrementPhase}>
          START
        </button>

        <ul className="portfolio-links">
          <a href="http://skjohns.com">Portfolio</a>
          <a href="http://github.com/samkjohns">Github</a>
          <a href="https://www.linkedin.com/in/sam-johns-07249876">Linkedin</a>
          <a href="https://angel.co/samuel-johns">Angel List</a>
        </ul>
      </div>
    );
  }
});
