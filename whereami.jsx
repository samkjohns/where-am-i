var React = require('react'),
    ReactDOM = require('react-dom'),
    GameView = require('./components/GameView');

var App = React.createClass({
  getInitialState: function () {
    return {
      phase: "PLAYING",
      round: 1
    };
  },

  render: function () {
    switch (this.state.phase) {
      case "PLAYING":
        return <GameView/>;
    }
  }
});

document.addEventListener(
  "DOMContentLoaded",
  function () {
    ReactDOM.render(
      < App />,
      document.getElementById('whereami')
    )
  }
);
