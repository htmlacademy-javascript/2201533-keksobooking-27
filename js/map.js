import {MAIN_PIN_ICON, MAP_ZOOM, MAP_CENTER, PIN_ICON} from './setings.js';
import {fillAddress, changeStateFilterForm, changeStateAdForm} from './forms.js';
import {createCard} from './cards-render.js';
import {loadData} from './real-data.js';

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
    icon: L.icon(MAIN_PIN_ICON)
  }
);

const adLayer = L.layerGroup().addTo(map);

const createMarker = (ad)=>{
  const marker = L.marker(
    ad.location,
    {
      icon: L.icon(PIN_ICON)
    }
  );
  marker
    .bindPopup(createCard(ad))
    .addTo(adLayer)
    .on('click', (evt)=>{
      evt.target._popup._content = evt.target._popup._contentNode.innerHTML;
    });
};

const renderAds = (data)=>{
  data.forEach(createMarker);
  changeStateFilterForm(true);
};

map.on('load', ()=>{
  changeStateAdForm(true);
  loadData(renderAds);
})
  .setView(MAP_CENTER, MAP_ZOOM);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  fillAddress(evt.target.getLatLng());
});
