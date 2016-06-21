var React = require('react');

var MiniMap = module.exports = React.createClass({

  getInitialState: function () {
    return {
      marker: null
    };
  },

  componentDidMount: function () {
    var mapDOMNode = this.refs.miniMap;
    var mapOptions = {
      center: {lat: 0, lng: 0},
      zoom: 2,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      draggableCursor: 'crosshair'
    };
    this.minimap = new google.maps.Map(mapDOMNode, mapOptions);
    this.minimap.addListener('click', this.placeMarker);
  },

  placeMarker: function (evnt) {
    var pos = {
      lat: evnt.latLng.lat(),
      lng: evnt.latLng.lng()
    };

    // just to be safe, remove the marker before calling setState
    this.state.marker && this.state.marker.setMap(null);
    var mark = "http://i.imgur.com/lVk6vQz.png";
    this.setState({
      marker: new google.maps.Marker({
        position: pos,
        map: this.minimap,
        draggable: true,
        icon: mark
      })
    });
  },

  submitGuess: function (evnt) {
    evnt.preventDefault();
    this.state.marker && this.props.submitGuess(this.state.marker);
  },

  render: function () {
    var submitButton;
    if (this.state.marker) {
      submitButton = (
        <button className="make-guess" onClick={this.submitGuess}>
          MAKE GUESS
        </button>
      );
    } else {
      submitButton = (
        <button className="make-guess" onClick={function (evnt) {evnt.preventDefault();}}>
          CLICK ON MINIMAP TO GUESS
        </button>
      );
    }

    return(
      <div className="mini-map-pane">
        <div ref="miniMap" className="mini-map"/>
        {submitButton}
      </div>
    );
  }
});
