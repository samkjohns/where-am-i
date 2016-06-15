var React = require('react'),
    MiniMap = require('./MiniMap');

var GameView = module.exports = React.createClass({
  componentDidMount: function () {
    var viewDOMNode = this.refs.view;
    var viewOptions = {
      position: { lat: 40.7411188, lng: -74.0015258 },
      addressControl: false,
      linksControl: false,
      panControl: true,
      enableCloseButton: false,
      zoomControl: true,
    };

    this.view = new google.maps.StreetViewPanorama(viewDOMNode, viewOptions);
  },

  render: function () {
    return(
      <div className="game-view">
        <div className="view" ref="view" />
        < MiniMap />
      </div>
    );
  }
});
