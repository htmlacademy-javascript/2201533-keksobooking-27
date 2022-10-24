import {mapCenter, MAP_ZOOM} from './setings.js';
import {fillAddress} from './forms.js';

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  mapCenter,
  {
    draggable: true,
    icon: mainPinIcon
  }
);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderAds = (data)=>{
  data.forEach((ad)=>{
    const marker = L.marker(
      ad.location,
      {
        icon: pinIcon
      }
    );
    marker.addTo(map);
  });
};

document.addEventListener('dataIsLoaded',(evt)=>{
  renderAds(evt.detail);
  document.dispatchEvent(new Event('renderAds'));
});

map.on('load', ()=>{
  document.dispatchEvent(new Event('mapIsLoaded'));
})
  .setView(mapCenter, MAP_ZOOM);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  fillAddress(evt.target.getLatLng());
});
