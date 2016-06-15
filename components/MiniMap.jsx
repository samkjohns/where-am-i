var React = require('react');

var MiniMap = module.exports = React.createClass({

  componentDidMount: function () {
    var mapDOMNode = this.refs.miniMap;
    var mapOptions = {
      center: {lat: 20, lng: 0},
      zoom: 0,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false
    };
    this.minimap = new google.maps.Map(mapDOMNode, mapOptions);
    this.minimap.addListener('click', this.placeMarker);
  },

  placeMarker: function (evnt) {
    var pos = {
      lat: evnt.latLng.lat(),
      lng: evnt.latLng.lng()
    };

    this.marker && this.marker.setMap(null);
    this.marker = new google.maps.Marker({
      position: pos,
      map: this.minimap
    });
  },

  render: function () {
    var submitButton = <div/>;
    if (this.marker) {
      submitButton = (
        <button className="make-guess" onClick={this.submitGuess}>Guess</button>
      );
    }

    return(
      <div className="mini-map-pane">
        <div ref="miniMap" className="mini-map"/>
      </div>
    );
  }
});
