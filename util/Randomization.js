var validBoxes = {
  upperNA: {
    weight: 8,
    ul: {lat: 70.4419, lng: -167.1368},
    ur: {lat: 70.4419, lng: -52.1458},
    ll: {lat: 49.4694, lng: -167.1368},
    lr: {lat: 49.4694, lng: -52.1458}
  },

  lowerNA: {
    weight: 16,
    ul: {lat: 49.0442, lng: -125.4404},
    ur: {lat: 49.0442, lng: -60.1268},
    ll: {lat: 8.1959, lng: -125.4404},
    lr: {lat: 8.1959, lng: -60.1268}
  },

  SA: {
    weight: 28,
    ul: {lat: 10.4459, lng: -81.4636},
    ur: {lat: 10.4459, lng: -34.718},
    ll: {lat: -55.5085, lng: -81.4636},
    lr: {lat: -55.5085, lng: -34.718}
  },

  mainEurope: {
    weight: 40,
    ul: {lat: 58.8191, lng: -11.4555},
    ur: {lat: 58.8191, lng: 45.937},
    ll: {lat: 35.3975, lng: -11.4555},
    lr: {lat: 35.3975, lng: 45.937}
  },

  scand: {
    weight: 44,
    ul: {lat: 71.2387, lng: 1.5522},
    ur: {lat: 71.2387, lng: 42.4343},
    ll: {lat: 58.2547, lng: 1.5522},
    lr: {lat: 58.2547, lng: 42.4343}
  },

  asia: {
    weight: 72,
    ul: {lat: 72.4457, lng: 41.7982},
    ur: {lat: 72.4457, lng: 145.509},
    ll: {lat: 4.2048, lng: 41.7982},
    lr: {lat: 4.2048, lng: 145.509}
  },

  oceania: {
    weight: 79,
    ul: {lat: 5.7807, lng: 95.0599},
    ur: {lat: 5.7807, lng: 145.7162},
    ll: {lat: -39.1038, lng: 95.0599},
    lr: {lat: -39.1038, lng: 145.7162}
  },

  NZ: {
    weight: 80,
    ul: {lat: -33.8423, lng: 164.1855},
    ur: {lat: -33.8423, lng: 179.1273},
    ll: {lat: -47.4345, lng: 164.1855},
    lr: {lat: -47.4345, lng: 179.1273}
  },

  nAfrica: {
    weight: 92,
    ul: {lat: 32.9817, lng: -18.2749},
    ur: {lat: 32.9817, lng: 46.2367},
    ll: {lat: 4.38, lng: -18.2749},
    lr: {lat: 4.38, lng: 46.2367}
  },

  sAfrica: {
    weight: 100,
    ul: {lat: 3.8541, lng: 7.7406},
    ur: {lat: 3.8541, lng: 41.6664},
    ll: {lat: -35.3256, lng: 7.7406},
    lr: {lat: -35.3256, lng: 41.6664}
  }
};

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

function weightedRandomBox() {
  var roll = Math.random() * 100;
  var boxNames = Object.keys(validBoxes);
  for(var i = 0; i < boxNames.length; i++) {
    var boxName = boxNames[i];
    var box = validBoxes[boxName];

    if (roll < box.weight) {
      return box;
    }
  }
  alert('weighted random box is not working! roll was ' + roll);
  return null;
}

var GeoRandom = {
  randomLatlng: function () {

    // pick a random box
    // var boxNames = Object.keys(validBoxes);
    // var randBoxIdx = Math.floor(Math.random() * boxNames.length);
    // var randomBox = boxNames[randBoxIdx];
    var randomBox = weightedRandomBox();

    // pick a random point within the box
    var rLat = randRange(randomBox.ll.lat, randomBox.ul.lat);
    var rLng = randRange(randomBox.ul.lng, randomBox.ur.lng);

    return {
      lat: rLat,
      lng: rLng
    };
  }
}

module.exports = GeoRandom;
