# Where Am I

[Live](http://skjohns.com/where-am-i)

**Where Am I** is a clone of [GeoGuessr](https://geoguessr.com/), a game that places the player in a random spot in the world via Google Street View and expects them to guess where they are. The player is then informed how close they were to the actual location. After 5 rounds, the game is over, and the player is informed of their average distance.

## React.js

Rendering and game logic are handled by React components. There is essentially a component for every view / game stage: `StartView`, `GameView`, `MiniMap`, `RoundResultView`, and `GameOverView`.

Switching between views and internal game phases are handled inside the `App` component.

## Google Maps API

**Where Am I** uses the Google Maps API to display the various views. A map is created with `new google.maps.Map(mapDOMNode, mapOptions)`. In the `GameView`, the `mapOptions` are particularly important, because the player is meant to be shown no information that displays their location, only being allowed to move around inside the StreetView. The options that achieve this are:

```
  disableDefaultUI: true,
  zoomControl: true,
  clickToGo: true
```

Various other components render other maps: there is also a `MiniMap` which allows the player to guess their location; a `RoundResultView` which displays the player's guessed location and actual location on a world map; and a `GameOverView`, which displays the results of each of the past 5 rounds.

### Random locations

One of the most important aspects of the game, of course, is how it places the player in a random location. The problem with simply generating a random pair of latitude and longitude coordinates is that there isn't Google Street View data for every location on Earth.

The Google Maps API provides a way to check if there is Street View data within a certain radius of lat-lng coordinates. For example:

```
var sv = new google.map.StreetViewService();
sv.getPanorama(
  {location: {70, 40}, radius: 10000},
  function (data, status) {
    if (status === google.maps.StreetViewStatus.OK) {
      console.log("there is Street View data at " + data.location.latLng);
    } else {
      console.log("there is no Street View data within 10000 meters");
    }
  }
);
```

One solution to the problem would be to simply set the radius to a very high number (say, 1,000,000 meters, or 1,000 km). This way the program would not need to try many random coordinates before finding a panorama. However, this method turns out to be highly biased towards certain panoramas. I think the reason for this is that there are certain panoramas that are the nearest available data for most oceanic coordinates.

In any case, the radius therefore must not be too high a number. This presents a second problem: the algorithm becomes too slow: noticeably not instantaneous. There are a few ways one might solve this problem, but the choice I made was to restrict the random coordinates to only be within certain "boxes" in the world containing landmasses. This automatically throws out coordinates that we know will not work (ie, ocean coordinates).

This is the final algorithm:

```
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
}
```

(The algorithm for generating random coordinates is too long for this page because of the hard-coded coordinate boundaries.)
