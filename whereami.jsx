var React = require('react'),
    ReactDOM = require('react-dom'),
    GameView = require('./components/GameView'),
    RoundResultView = require('./components/RoundResultView'),
    GameOverView = require('./components/GameOverView');

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

    switch (this.state.phase) {
      case 'START':
        newPhase = 'PLAYING';
        newRound = 0;
        break;

      case "PLAYING":
        newPhase = this.state.round === 5 ? 'GAME OVER' : 'ROUND OVER';
        newRound = this.state.round;
        break;

      case "ROUND OVER":
        newPhase = 'PLAYING';
        newRound = this.state.round + 1;
        break;

      case 'GAME OVER':
        newPhase = 'START';
        newRound = 0;
        break;
    }

    this.setState({
      phase: newPhase,
      round: newRound
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
          <div className="start-pane">
            <button className="phase-button" onClick={this.incrementPhase}>
              START
            </button>
          </div>
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
