var React = require('react');

var RoundResultView = module.exports = React.createClass({
  componentDidMount: function () {
    var mapDOMNode = this.refs.roundResultMap;
    var mapOptions = {
      zoom: this.getZoomLevel(),
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: true,
      center: this.getCenter()
    }

    this.resultMap = new google.maps.Map(mapDOMNode, mapOptions);
    var actualMarker = new google.maps.Marker({
      position: this.props.result.realPosition,
      map: this.resultMap
    });

    var guessedMarker = new google.maps.Marker({
      position: this.props.result.guessedPosition,
      map: this.resultMap
    });

    var line = new google.maps.Polyline({
      path: [
        this.props.result.realPosition,
        this.props.result.guessedPosition
      ],
      strokeColor: '#000',
      strokeOpacity: .8,
      strokeWeight: 5
    });
    line.setMap(this.resultMap);
  },

  getZoomLevel: function () {
    // hardcoded for now

    if (this.props.result.distance < 200) {
      return 6;
    } else if (this.props.result.distance < 700) {
      return 5;
    } else if (this.props.result.distance < 1500) {
      return 4;
    } else if (this.props.result.distance < 3000) {
      return 3;
    } else if (this.props.result.distance < 5500) {
      return 3;
    } else if (this.props.result.distance < 6000) {
      return 3;
    } return 3;
  },

  getCenter: function () {
    var p1 = this.props.result.guessedPosition;
    var p2 = this.props.result.realPosition;

    // use the midpoint formula
    return {
      lat: (p1.lat() + p2.lat()) / 2,
      lng: (p1.lng() + p2.lng()) / 2
    };
  },

  render: function () {
    return(
      <div className="result-pane">
        <div ref="roundResultMap" className="view result-map" />
        <div className="result-stats-pane">
          <p>Your guess was {this.props.result.distance} miles from the location</p>
          <p>You scored {this.props.result.points} points</p>
          <button className="phase-button" onClick={this.props.nextRound}>
            PLAY NEXT ROUND
          </button>
        </div>
      </div>
    );
  }
});
