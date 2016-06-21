var React = require('react'),
    ReactDOM = require('react-dom'),
    GameView = require('./GameView'),
    RoundResultView = require('./RoundResultView'),
    GameOverView = require('./GameOverView'),
    StartView = require('./StartView');

var App = React.createClass({
  getInitialState: function () {
    return {
      phase: "START",
      round: 0,
      roundResults: []
    };
  },

  incrementPhase: function () {
    var newPhase, newRound;
    var results = this.state.roundResults;

    switch (this.state.phase) {
      case 'START':
        newPhase = 'PLAYING';
        newRound = 0;
        break;

      case "PLAYING":
        newPhase = this.state.round === 4 ? 'GAME OVER' : 'ROUND OVER';
        newRound = this.state.round;
        break;

      case "ROUND OVER":
        newPhase = 'PLAYING';
        newRound = this.state.round + 1;
        break;

      case 'GAME OVER':
        newPhase = 'START';
        newRound = 0;
        results = [];
        break;
    }

    this.setState({
      phase: newPhase,
      round: newRound,
      roundResults: results
    });
  },

  setRoundResult: function (results) {
    this.incrementPhase();
    this.setState({ roundResults: this.state.roundResults.concat(results) });
  },

  lastResult: function () {
    lastIdx = this.state.roundResults.length - 1;
    return this.state.roundResults[lastIdx];
  },

  render: function () {
    switch (this.state.phase) {
      case "PLAYING":
        return < GameView setRoundResult={this.setRoundResult} />;

      case 'ROUND OVER':
        return (
          < RoundResultView
            result={this.lastResult()}
            nextRound={this.incrementPhase}
          />
        );

      case 'GAME OVER':
        return(
          < GameOverView
            results={this.state.roundResults}
            newGame={this.incrementPhase}
          />
        );

      case 'START':
        return(
          < StartView incrementPhase={this.incrementPhase} />
        );
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
