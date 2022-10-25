import {MAIN_PIN_ICON, MAP_ZOOM, MAP_CENTER, PIN_ICON} from './setings.js';
import {fillAddress, adForm, filterForm, changeState} from './forms.js';
import {createData} from './data.js';
import {createCard} from './cards-render.js';

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarker = L.marker(
  MAP_CENTER,
  {
    draggable: true,
    icon: MAIN_PIN_ICON
  }
);

const adLayer = L.layerGroup().addTo(map);

const createMarker = (ad)=>{
  const marker = L.marker(
    ad.location,
    {
      icon: PIN_ICON
    }
  );
  marker
    .addTo(adLayer)
    .bindPopup(createCard(ad));
};

const renderAds = (data)=>data.forEach((ad)=>createMarker(ad));

map.on('load', ()=>{
  changeState(adForm, true);
  renderAds(createData());
  changeState(filterForm, true);
})
  .setView(MAP_CENTER, MAP_ZOOM);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  fillAddress(evt.target.getLatLng());
});
