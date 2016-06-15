var React = require('react'),
    MiniMap = require('./MiniMap');

var GameView = module.exports = React.createClass({
  componentDidMount: function () {

    var viewDOMNode = this.refs.view;
    var viewOptions = {
      position: { lat: 0, lng: 0 },
      addressControl: false,
      linksControl: false,
      panControl: true,
      enableCloseButton: false,
      zoomControl: true,
    };

    this.view = new google.maps.StreetViewPanorama(viewDOMNode, viewOptions);

    this.setPositionRandomly(function (latlng) {
      this.view.setPosition(latlng);
    }.bind(this));

  },

  setPositionRandomly: function (successCallback) {
    function randomCoord() {
      return (Math.random() * 360) - 180;
    }

    var latlng = {
      lat: randomCoord(),
      lng: randomCoord()
    };
    console.log(latlng);

    var sv = new google.maps.StreetViewService();
    sv.getPanorama(
      {
        location: latlng,
        radius: 10000
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

  submitGuess: function (marker) {
    console.log(marker);
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
