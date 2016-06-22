var React = require('react');

var MiniMap = module.exports = React.createClass({

  getInitialState: function () {
    return {
      marker: null,
      size: "small"
    };
  },

  componentDidMount: function () {
    var mapDOMNode = this.refs.miniMap;
    var mapOptions = {
      center: {lat: 0, lng: 0},
      zoom: 1,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      draggableCursor: 'crosshair'
    };
    this.minimap = new google.maps.Map(mapDOMNode, mapOptions);
    this.minimap.addListener('click', this.placeMarker);
  },

  hover: function (evnt) {
    if (this.state.size !== "large") {
      this.setState({ size: "large" });
      google.maps.event.trigger(this.minimap, 'resize');
    }
  },

  unhover: function (evnt) {
    // console.log("mouse out");
    if (this.state.size !== "small") {
      this.setState({ size: "small" });
      google.maps.event.trigger(this.minimap, 'resize');
    }
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
      <div
        className={"mini-map-pane " + this.state.size}
        onMouseOver={this.hover}
        onMouseOut={this.unhover}
      >
        <div ref="miniMap" className="mini-map"/>
        {submitButton}
      </div>
    );
  }
});
