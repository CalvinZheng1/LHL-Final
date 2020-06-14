import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import Locate from './Locate';
import {Paper, IconButton, Tooltip} from '@material-ui/core';
import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab';
import  ClearIcon from '@material-ui/icons/Clear';
import  CheckIcon from '@material-ui/icons/Check';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import axios from 'axios';
import useToggleArray from '../hooks/useToggleArray';

import Search from './Search';

const libraries = ["places"];

const containerStyle = {
  width: '100%',
  height: '100%',
  display: 'inline-block',
  // 'borderRadius': '15px',
  // 'boxShadow': '5px 10px #888888'

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

const markerClustererOptions = { imagePath: '/markerClusterer/m'};

function MapContainer() {

  
  interface IMarker {
    [index: string]: string | number;
    id: number;
    name: string;
    google_place_id: string;
    type: string;
    lat: number;
    lng: number;
    tp_stock: string;
    hs_stock: string;
    mask_stock: string;
  }

  interface IMarkerDictionary {
    [index: string]: IMarker;

  }

  const {isLoaded, loadError} = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries});
  const [markers, setMarkers] = React.useState<IMarkerDictionary>({});
  const [selected, setSelected] = React.useState<IMarker | null>(null);
  const [filters, setFilters] = useToggleArray([]);
  

  const filterResults = function () {
    let results = Object.keys(markers);

    if(filters.includes("tp")) {
      results = applyFilter(results, 'tp');
    }
    if(filters.includes("hs")) {
      results = applyFilter(results, "hs");
    }
    if(filters.includes("mask")){
      results = applyFilter(results, "mask");
    }
    return results;
  }

  const applyFilter = function(markerKeys:string[], filter: string) {
    const result = [];

    for(const key of markerKeys) {
      if(markers[key][filter+'_stock'] === "In Stock") {
        result.push(key);
      }
    }
    return result;
  }

  const selectMarker = async function(placeId: string, address: string, result: any)  {
    
    if(markers[placeId]) {
      setSelected(markers[placeId]);
    } else {
      const marker: IMarker= {
        id: 0, 
        name: address.split(',')[0],
        google_place_id: placeId,
        type: result.types.find((e:string) => e.includes('pharmacy')) ? 'pharmacy' : 'supermarket', // TODO get it detecting pharmacy
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
        tp_stock: "Unknown",
        hs_stock: "Unknown",
        mask_stock: "Unknown"
      };
      const res = await axios.post('/api/markers', {name: marker.name, google_place_id: marker.google_place_id, lat: marker.lat, lng: marker.lng, type: marker.type });
      marker.id = res.data.id;
      setMarkers({...markers, [placeId]: marker});
      setSelected(marker);
      
    }
  }

  React.useEffect( () => {
    axios.get("/api/markers")
    .then( data =>  setMarkers(data.data.data));
  }, [])
  //for controlling pan of map
  const mapRef : React.MutableRefObject<GoogleMap | undefined> = React.useRef();
  const onMapLoad = React.useCallback((map) => {mapRef.current = map;}, []);
  const panTo = React.useCallback(({lat,lng}) => {
    if (mapRef.current) {
      mapRef.current.panTo({lat, lng});
      (mapRef.current as any).setZoom(16); //horrible hack but setZoom is undefined on GoogleMap types - though it still works! 
    }
  }, [])

  //for setting stock on click
  const setStock = function(commodity: string, inStock?: boolean) {
    if(selected){
      if(inStock) {
        setMarkers({...markers, [selected.google_place_id]:{...selected, [commodity]: "In Stock" } });
        selected[commodity] = "In Stock";
        axios.post(`/api/markers/stockUpdate/${selected.id}`, {[commodity]: "In Stock"});
      } else if (inStock === undefined) {
        setMarkers({...markers, [selected.google_place_id]:{...selected, [commodity]: "Unknown" } });
        selected[commodity] = "Unknown";
        axios.post(`/api/markers/stockUpdate/${selected.id}`, {[commodity]: "Unknown"});
      } else {
        setMarkers({...markers, [selected.google_place_id]:{...selected, [commodity]: "Out of Stock" } });
        selected[commodity] = "Out of Stock";
        axios.post(`/api/markers/stockUpdate/${selected.id}`, {[commodity]: "Out of Stock"});
      }
    }
  }


  if (loadError) return <div> "Error loading maps" </div>;
  if (!isLoaded) return <div>"Loading"</div>;
   
  return (
    <Paper className="map-wrapper" elevation={3}>
      <Locate panTo={panTo}/>
      <Search panTo={panTo} selectMarker={selectMarker}/>
      <Tooltip title={<React.Fragment>
        <h2>Filter stores with stock</h2>
      </React.Fragment>} placement="right" arrow>
        <ToggleButtonGroup className="filters" aria-label="filters" orientation="vertical">
          <ToggleButton value="tp" onClick={() => setFilters("tp")} selected={filters.includes("tp")} aria-label="has-toilet-paper">
            <img src="/tp.svg" alt="toilet paper" className="icon"/>
          </ToggleButton>
          <ToggleButton value="hs" onClick={() => setFilters("hs")} selected={filters.includes("hs")} aria-label="has-hand-sanitizer">
            <img src="/hand-sanitizer.svg" alt="hand sanitizer" className="icon"/>
          </ToggleButton>
          <ToggleButton value="mask" onClick={() => setFilters("mask")} selected={filters.includes("mask")} aria-label="has-masks">
            <img src="/mask.svg" alt="masks" className="icon"/>
          </ToggleButton>
        </ToggleButtonGroup>
      </Tooltip>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={mapOptions}
        onLoad = {onMapLoad}
      >


        <MarkerClusterer options={markerClustererOptions}>
          {clusterer =>
            filterResults().map(markerKey => (
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
                  <h3>{selected.name}</h3>
                  
                  <table>
                    <tbody>
                    <Tooltip title={<h3>Update stock levels</h3>} placement="right" arrow> 
                      <tr>
                        <td><img className="icon" src="/tp.svg" alt="toilet paper icon" /> </td>
                        <td>{selected.tp_stock}</td>
                        <td><IconButton aria-label='in-stock' onClick={(event) => setStock('tp_stock', true)}>
                            <CheckIcon/>
                        </IconButton></td>
                        <td><IconButton aria-label='out-of-stock' onClick={(event) => setStock('tp_stock', false)}><ClearIcon/></IconButton></td>
                        <td><IconButton aria-label='unknown' onClick={(event) => setStock('tp_stock')}><HelpOutlineIcon/></IconButton></td>
                      </tr>
                      </Tooltip> 
                      <Tooltip title={<h3>Update stock levels</h3>} placement="right" arrow>
                      <tr>
                        <td><img className="icon" src="/hand-sanitizer.svg" alt="hand sanitizer icon"/></td>
                        <td>{selected.hs_stock}</td>
                        <td><IconButton aria-label='in-stock'onClick={(event) => setStock('hs_stock', true)}><CheckIcon/></IconButton></td>
                        <td><IconButton aria-label='out-of-stock' onClick={(event) => setStock('hs_stock', false)}><ClearIcon/></IconButton></td>
                        <td><IconButton aria-label='unknown' onClick={(event) => setStock('hs_stock')}><HelpOutlineIcon/></IconButton></td>
                      </tr>
                      </Tooltip> 
                      <Tooltip title={<h3>Update stock levels</h3>} placement="right" arrow>
                      <tr>
                        <td><img className="icon" src="/mask.svg" alt="mask icon"/></td>
                        <td>{selected.mask_stock}</td>  
                        <td><IconButton aria-label='in-stock'onClick={(event) => setStock('mask_stock', true)}><CheckIcon/></IconButton></td>
                        <td><IconButton aria-label='out-of-stock'onClick={(event) => setStock('mask_stock', false)}><ClearIcon/></IconButton></td>  
                        <td><IconButton aria-label='unknown' onClick={(event) => setStock('mask_stock')}><HelpOutlineIcon/></IconButton></td>
                      </tr>
                      </Tooltip>   
                    </tbody>
                  </table>
                </div>
            </InfoWindow>
          
           ) : null}
        
      </GoogleMap>
    </Paper>
  )
}

export default React.memo(MapContainer)
