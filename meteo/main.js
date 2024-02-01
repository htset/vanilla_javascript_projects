import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { toLonLat, fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const close = document.getElementById('popup-close');

//Get temperature from API
const getTemp = async function (lat, lon) {
  try {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude='
      + lat + '&longitude=' + lon + '&current=temperature_2m';
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Error in network response");
    }
    const temp = await response.json();
    return temp.current.temperature_2m;
  }
  catch (error) {
    console.error("There has been a problem with fetch:", error);
    return null;
  }
}

//show popup on map
const handleClickOnMap = async function(event) {
  var point = map.getCoordinateFromPixel(event.pixel);
  var lonLat = toLonLat(point);

  let temp = await getTemp(lonLat[1], lonLat[0]);
  if (temp !== null) {
    content.innerHTML 
      = '<p>You clicked here:</p><code>' + lonLat
         + '</code><p>Temperature: ' + temp + '</p>';
  }
  else {
    content.innerHTML 
      = '<p>You clicked here:</p><code>' + lonLat 
      + '</code><p>There was an error with the request</p>';
  }
  overlay.setPosition(point);
}

//An overlay to anchor the popup to the map.
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

//The view object
const view = new View({
  center: [0, 0],
  zoom: 1,
});

//The map object
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  overlays: [overlay],
  view: view
});

//If we have geolocation --> we center the map to our location
// and we display the current temperature
const centerToPosition = async function(position) {

  //add marker on user's location
  var layer = new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(fromLonLat(
            [
              position.coords.longitude, 
              position.coords.latitude
            ]))
        })
      ]
    })
  });
  map.addLayer(layer);  

  //get temperature for user's location
  let temp = await getTemp(position.coords.latitude, 
    position.coords.longitude);
  if (temp !== null) {
    content.innerHTML 
      = '<p>Temperature: ' + temp + '</p>';
  }
  else {
    content.innerHTML 
      = '<p>There was an error with the request</p>';
  }

  //set position of the popup on user's location
  var point = fromLonLat([position.coords.longitude, 
    position.coords.latitude]);
  overlay.setPosition(point);

  //create a new View object with new coordinates
  // and zoom level
  const newView = new View({
    center: fromLonLat(
      [
        position.coords.longitude, 
        position.coords.latitude
      ]),
    zoom: 10,
  });

  //update map to new View
  map.setView(newView); 
}

//When we click on the map
map.on('click', handleClickOnMap);

//When the popup should be closed
close.onclick = function () {
  overlay.setPosition(undefined);
  close.blur();
  return false;
};

//Startup: we ask the user if geolocation is allowed
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(centerToPosition);
} 

