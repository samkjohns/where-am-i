var React = require('react');

var GameOverView = module.exports = React.createClass({
  componentDidMount: function () {
    var mapDOMNode = this.refs.gameOverView;
    var mapOptions = {
      zoom: 2,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false,
      center: {lat: 20, lng: 0}
    }

    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    this.props.results.forEach(function (result) {
      var actualMarker = new google.maps.Marker({
        position: result.realPosition,
        map: this.map
      });

      var guessedMarker = new google.maps.Marker({
        position: result.guessedPosition,
        map: this.map
      });

      var line = new google.maps.Polyline({
        path: [
          result.realPosition,
          result.guessedPosition
        ],
        strokeColor: '#000',
        strokeOpacity: .8,
        strokeWeight: 5
      });
      line.setMap(this.map);
    }.bind(this));
  },

  total: function () {
    return this.props.results.reduce(function (accum, result) {
      return accum + result.points;
    }, 0);
  },

  avgDistance: function () {
    var totalDistance =
    this.props.results.reduce(function (accum, result) {
      return accum + result.distance;
    }, 0);

    return Math.floor(totalDistance / this.props.results.length);
  },

  render: function () {
    return(
      <div className="over-pane">
        <div ref="gameOverView" className="over-view"/>
        <div className="result-stats-pane">
          <p>You were an average of {this.avgDistance()} miles away.</p>
          <button className="phase-button" onClick={this.props.newGame}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }
});
