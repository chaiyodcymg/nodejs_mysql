

function _getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371000; // Radius of the earth in meters
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in M
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  
  
  
  // Point 1: 15.008809, 78.659096
  // Point 2: 13.90457539, 78.5855514
  
  var _lat1 = 16.508811742638855;
  var _lon1 =   102.83149134332773;
  
  var _lat2 = 16.48402460090647;
  var _lon2 =  102.81490930923215;
  
  // precise value
  var _d = "Precise value: " + _getDistanceFromLatLonInM(_lat1, _lon1, _lat2, _lon2);
  console.log(_d); // alert(_d);
  
  
  // round value
  _d = "Round value: " +Math.round(_getDistanceFromLatLonInM(_lat1, _lon1, _lat2, _lon2) )  + " m";
  console.log(_d); // alert(_d);