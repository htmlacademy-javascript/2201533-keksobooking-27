import {MAIN_PIN_ICON, MAP_ZOOM, MAP_CENTER, PIN_ICON, MAX_ADS} from './setings.js';
import {fillAddress, changeStateAdForm} from './forms.js';
import {changeStateFilterForm} from './filters.js';
import {createCard} from './cards-render.js';
import {loadData, getData} from './real-data.js';
import {compareData} from './filters.js';

const map = L.map('map-canvas');
let currentMarker = null;

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
    .on('popupopen', (evt)=>{
      currentMarker = evt.target;
    })
    .on('popupclose', (evt)=>{
      if (evt.target === currentMarker){
        currentMarker = null;
      }
    });
};

const closePopup = ()=>{
  if (currentMarker){
    currentMarker.closePopup();
  }
};

const renderAds = ()=>{
  closePopup();
  adLayer.clearLayers();
  getData().filter(compareData).slice(0, MAX_ADS).forEach(createMarker);
};

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  fillAddress(evt.target.getLatLng());
});

map.on('load', ()=>{
  changeStateAdForm(true);
  loadData()
    .then(()=>{
      changeStateFilterForm(true);
      renderAds();
    });
})
  .setView(MAP_CENTER, MAP_ZOOM);

const setDefaultMap = ()=>{
  map.setView(MAP_CENTER, MAP_ZOOM);
  mainMarker.setLatLng(MAP_CENTER);
};

export {renderAds};
export {setDefaultMap};
