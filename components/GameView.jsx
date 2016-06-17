var React = require('react'),
    MiniMap = require('./MiniMap'),
    GeoRandom = require('../util/Randomization');

var GameView = module.exports = React.createClass({
  componentDidMount: function () {
    var viewDOMNode = this.refs.view;
    var viewOptions = {
      position: { lat: 0, lng: 0 },
      disableDefaultUI: true,
      linksControl: false,
      panControl: false,
      zoomControl: true,
      clickToGo: true
    };

    this.view = new google.maps.StreetViewPanorama(viewDOMNode, viewOptions);

    this.setPositionRandomly(function (latlng) {
      this.view.setPosition(latlng);
    }.bind(this));
  },

  setPositionRandomly: function (successCallback) {

    var latlng = GeoRandom.randomLatlng();

    var sv = new google.maps.StreetViewService();
    sv.getPanorama(
      {
        location: latlng,
        radius: 1000
      },

      function (data, status) {
        if (status === google.maps.StreetViewStatus.OK) {
          successCallback(data.location.latLng);
        } else {
          this.setPositionRandomly(successCallback);
        }
      }.bind(this)
    );
  },

  getCurrentPosition: function () {
    return this.view.getPosition();
  },

  submitGuess: function (guessedMarker) {
    var guessedPosition = guessedMarker.position;
    var realPosition = this.getCurrentPosition();

    function radiansOf(num) { return num * Math.PI / 180; }

    // returns distance in meters between two GPS coordinates
    function haversineDistance(crd1, crd2) {
      var R = 3959; // miles
      var lat1 = crd1.lat();
      var lat2 = crd2.lat();
      var lng1 = crd1.lng();
      var lng2 = crd2.lng();
      var phi1 = radiansOf(lat1);
      var phi2 = radiansOf(lat2);
      var deltaPhi = radiansOf(lat2 - lat1);
      var deltaLambda = radiansOf(lng2 - lng1);

      var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    }

    var distance = haversineDistance(realPosition, guessedPosition);
    var score = Math.floor((10000000 / (distance + 1)) - 1);

    console.log(distance);
    this.props.setRoundResult({
      distance: Math.floor(distance),
      guessedPosition: guessedPosition,
      realPosition: realPosition,
      points: score
    });
  },

  render: function () {
    return(
      <div className="game-view">
        <div className="view" ref="view" />
        < MiniMap submitGuess={this.submitGuess} />
      </div>
    );
  }
});
