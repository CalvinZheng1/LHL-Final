import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import Locate from './Locate';
import {IconButton} from '@material-ui/core';
import  ClearIcon from '@material-ui/icons/Clear';
import  CheckIcon from '@material-ui/icons/Check';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

const tmpMarkers = { '1':
{ id: 1,
  name: 'Whole Foods Market',
  google_id: 'cd921dc7e7391fca34b65852e9b47a713c6eb9ce',
  type: 'supermarket',
  lat: 49.2900848,
  lng: -123.1327018,
  tp_stock: 2,
  hs_stock: 2,
  mask_stock: 2 },
'2':
{ id: 2,
  name: 'Nesters Market',
  google_id: '742167935e870c4d8a89fe2a55d2197f9a6cd8a1',
  type: 'supermarket',
  lat: 49.2786111,
  lng: -123.1216667,
  tp_stock: 2,
  hs_stock: 1,
  mask_stock: 2 },
'3':
{ id: 3,
  name: 'Whole Foods Market',
  google_id: 'b95b9c17ee7ddcc350b292696533ceb715c3d39d',
  type: 'supermarket',
  lat: 49.2684659,
  lng: -123.157045,
  tp_stock: 0,
  hs_stock: 0,
  mask_stock: 0 },
'4':
{ id: 4,
  name: '88 Supermarket',
  google_id: 'e694dcbfa9bf3cefa9930ab15671c5cf6f79aa64',
  type: 'supermarket',
  lat: 49.2256358,
  lng: -123.0538608,
  tp_stock: 1,
  hs_stock: 2,
  mask_stock: 2 },
'5':
{ id: 5,
  name: 'Urban Fare',
  google_id: '8d5705e1979f417f2958a2237ab81590ae14e364',
  type: 'supermarket',
  lat: 49.28915780000001,
  lng: -123.1227365,
  tp_stock: 2,
  hs_stock: 0,
  mask_stock: 0 },
'6':
{ id: 6,
  name: 'Nesters Market',
  google_id: '036afc3d48af2b0dcc97da6fe26f499377ac6b31',
  type: 'supermarket',
  lat: 49.244937,
  lng: -123.1015905,
  tp_stock: 1,
  hs_stock: 2,
  mask_stock: 2 },
'7':
{ id: 7,
  name: 'Whole Foods Market',
  google_id: 'a02f8067fd3b455ed55ffcf7ca06f5f2c435e5d5',
  type: 'supermarket',
  lat: 49.264022,
  lng: -123.1152825,
  tp_stock: 2,
  hs_stock: 1,
  mask_stock: 2 },
'8':
{ id: 8,
  name: 'T&T Supermarket',
  google_id: 'f19d213a8d4cccac21b62d5e392911d5d570874f',
  type: 'supermarket',
  lat: 49.26916370000001,
  lng: -123.0463411,
  tp_stock: 1,
  hs_stock: 1,
  mask_stock: 1 },
'9':
{ id: 9,
  name: 'M&M Food Market',
  google_id: '55f1bf582ed379c80b589af3e00d945e098b23f7',
  type: 'supermarket',
  lat: 49.2447121,
  lng: -123.1540041,
  tp_stock: 1,
  hs_stock: 2,
  mask_stock: 0 },
'10':
{ id: 10,
  name: 'Greens Organic and Natural Market',
  google_id: '02aad90b5a43cede1ca6d3f430bac0ebd4af589f',
  type: 'supermarket',
  lat: 49.2635647,
  lng: -123.1498785,
  tp_stock: 2,
  hs_stock: 2,
  mask_stock: 0 },
'11':
{ id: 11,
  name: 'IGA',
  google_id: 'd6ff850604893a812d76d82b28b9ec27b5cf1221',
  type: 'supermarket',
  lat: 49.2637392,
  lng: -123.1568617,
  tp_stock: 1,
  hs_stock: 1,
  mask_stock: 0 },
'12':
{ id: 12,
  name: 'Buy-Low Foods',
  google_id: '9761a9d3bad16243bb54c7e813cd0e52ecce490b',
  type: 'supermarket',
  lat: 49.2293452,
  lng: -123.0909752,
  tp_stock: 1,
  hs_stock: 0,
  mask_stock: 0 },
'13':
{ id: 13,
  name: 'Foodness',
  google_id: '105a5080222880aa40ab9e848c9db847f76e9f15',
  type: 'supermarket',
  lat: 49.27925630000001,
  lng: -123.1213884,
  tp_stock: 1,
  hs_stock: 2,
  mask_stock: 0 },
'14':
{ id: 14,
  name: 'IGA',
  google_id: '29b46755431f22a2d7bd7470054dab1129774440',
  type: 'supermarket',
  lat: 49.2687416,
  lng: -123.1824569,
  tp_stock: 1,
  hs_stock: 2,
  mask_stock: 1 },
'15':
{ id: 15,
  name: 'Nesters Market',
  google_id: '0058d47b3329c0d7fd818a20e2a1e6bc644ddeae',
  type: 'supermarket',
  lat: 49.2825985,
  lng: -123.1071227,
  tp_stock: 2,
  hs_stock: 0,
  mask_stock: 0 },
'16':
{ id: 16,
  name: 'Buy-Low Foods',
  google_id: 'c549219250bc77acc727e869d78ef46c94745e15',
  type: 'supermarket',
  lat: 49.26238300000001,
  lng: -123.0971029,
  tp_stock: 1,
  hs_stock: 0,
  mask_stock: 1 },
'17':
{ id: 17,
  name: 'East End Food Co-op',
  google_id: '74e4eb4f998d882c6e4b52d6cdca33d47cc8faf7',
  type: 'supermarket',
  lat: 49.2752861,
  lng: -123.0693028,
  tp_stock: 1,
  hs_stock: 1,
  mask_stock: 2 },
'18':
{ id: 18,
  name: 'Whole Foods Market',
  google_id: '525f19bc8980b6c7d27e1d65af01ff3d0ebc8065',
  type: 'supermarket',
  lat: 49.325936,
  lng: -123.1430405,
  tp_stock: 1,
  hs_stock: 0,
  mask_stock: 2 },
'19':
{ id: 19,
  name: 'IGA',
  google_id: '3de03520186fbd075b268bba3e304fb5aacd61ba',
  type: 'supermarket',
  lat: 49.282204,
  lng: -123.1249559,
  tp_stock: 0,
  hs_stock: 1,
  mask_stock: 2 },
'20':
{ id: 20,
  name: 'Choices Markets',
  google_id: 'c570b43a7adb1ac2ac2bde54ae3a49ecfb4207b5',
  type: 'supermarket',
  lat: 49.2757358,
  lng: -123.1242484,
  tp_stock: 1,
  hs_stock: 0,
  mask_stock: 1 } };


const stock = ["Unknown", "Out of Stock", "In Stock"]


const containerStyle = {
  width: '60vw',
  height: '60vh',
  display: 'inline-block',
  'borderRadius': '15px',
  'boxShadow': '5px 10px #888888'

};

const center = {
  lat: 49.282730,
  lng: -123.120735
};



const noPoi: any = [ //google types disagreement
  {
      featureType: "poi",
      stylers: [
        { visibility: "off" }
      ]   
    }
  ];

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: noPoi
}

const markerCluseterOptions = { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'};

function MapContainer() {

  interface IMarker {
    [index: string]: string | number;
    id: number;
    name: string;
    google_id: string;
    type: string;
    lat: number;
    lng: number;
    tp_stock: number;
    hs_stock: number;
    mask_stock: number;
  }

  interface IMarkerDictionary {
    [index: string]: IMarker;

  }

  const {isLoaded, loadError} = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  const [markers, setMarkers] = React.useState<IMarkerDictionary>(tmpMarkers);
  const [selected, setSelected] = React.useState<IMarker | null>(null);

  
  //for controlling pan of map
  const mapRef : React.MutableRefObject<GoogleMap | undefined> = React.useRef();
  const onMapLoad = React.useCallback((map) => {mapRef.current = map;}, []);
  const panTo = React.useCallback(({lat,lng}) => {
    if (mapRef.current) {
      mapRef.current.panTo({lat, lng});
      (mapRef.current as any).setZoom(14); //horrible hack but setZoom is undefined on GoogleMap types - though it still works! 
    }
  }, [])

  //for setting stock on click
  const setStock = function(commodity: string, inStock?: boolean) {
    if(selected){
      if(inStock) {
        setMarkers({...markers, [selected.id]:{...selected, [commodity]: 2 } });
        selected[commodity] = 2;
      } else if (inStock === undefined) {
        setMarkers({...markers, [selected.id]:{...selected, [commodity]: 0 } });
        selected[commodity] = 0;
      } else {
        setMarkers({...markers, [selected.id]:{...selected, [commodity]: 1 } });
        selected[commodity] = 1;
      }
    }
  }



  if (loadError) return <div> "Error loading maps" </div>;
  if (!isLoaded) return <div>"Loading"</div>;
   
  return (
    <div>
      <Locate panTo={panTo}/>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
        onLoad = {onMapLoad}
      >


        <MarkerClusterer options={markerCluseterOptions}>
          {clusterer =>
            Object.keys(markers).map(markerKey => (
              <Marker 
              key={markerKey} 
              position= {{lat: markers[markerKey].lat, lng: markers[markerKey].lng}} 
              icon= {{
                url: markers[markerKey].type === 'pharmacy' ? '/pharm.svg' : '/shop_cart.svg',
                scaledSize: new window.google.maps.Size(30,30),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(15,15)
              }}
              onClick={() => setSelected(markers[markerKey])} 
                clusterer={clusterer} 
                />
            ))
          }
        </MarkerClusterer>



         {selected ? (
          <InfoWindow 
            position={{lat: selected.lat, lng: selected.lng}} 
            onCloseClick={() => setSelected(null)}
          >
              <div>
                <h4>{selected.name}</h4>
                <table>
                  <tbody>
                    <tr>
                      <td><img className="icon" src="/tp.svg" alt="toilet paper icon" /> </td>
                      <td>{stock[selected.tp_stock]}</td>
                      <td><IconButton aria-label='in-stock' onClick={(event) => setStock('tp_stock', true)}>
                          <CheckIcon/>
                      </IconButton></td>
                      <td><IconButton aria-label='out-of-stock' onClick={(event) => setStock('tp_stock', false)}><ClearIcon/></IconButton></td>
                      <td><IconButton aria-label='unknown' onClick={(event) => setStock('tp_stock')}><HelpOutlineIcon/></IconButton></td>
                    </tr>
                    <tr>
                      <td><img className="icon" src="/hand-sanitizer.svg" alt="hand sanitizer icon"/></td>
                      <td>{stock[selected.hs_stock]}</td>
                      <td><IconButton aria-label='in-stock'onClick={(event) => setStock('hs_stock', true)}><CheckIcon/></IconButton></td>
                      <td><IconButton aria-label='out-of-stock' onClick={(event) => setStock('hs_stock', false)}><ClearIcon/></IconButton></td>
                      <td><IconButton aria-label='unknown' onClick={(event) => setStock('hs_stock')}><HelpOutlineIcon/></IconButton></td>
                    </tr>
                    <tr>
                      <td><img className="icon" src="/mask.svg" alt="mask icon"/></td>
                      <td>{stock[selected.mask_stock]}</td>  
                      <td><IconButton aria-label='in-stock'onClick={(event) => setStock('mask_stock', true)}><CheckIcon/></IconButton></td>
                      <td><IconButton aria-label='out-of-stock'onClick={(event) => setStock('mask_stock', false)}><ClearIcon/></IconButton></td>  
                      <td><IconButton aria-label='unknown' onClick={(event) => setStock('mask_stock')}><HelpOutlineIcon/></IconButton></td>
                    </tr>  
                  </tbody>
                </table>
              </div>
           </InfoWindow>) : null}
        
      </GoogleMap>
      </div>
  )
}

export default React.memo(MapContainer)
