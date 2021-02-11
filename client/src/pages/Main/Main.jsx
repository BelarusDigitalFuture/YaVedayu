import React, { useCallback, useRef, useState } from 'react';
import { Map, Placemark, ZoomControl } from 'react-yandex-maps';

import { Informer } from '../../components/Informer/Informer';
import { Autosuggest } from '../../components/Autosuggest/Autosuggest';
import { getAddressContent } from '../../api/api';
import { useContent } from '../../providers/ContentProvider';

import './Main.css';


export const Main = ({}) => {
  const [coords, setCoords] = useState([53.918162, 27.603702]);
  const placemarkRef = useRef(null);
  const [maps, setMaps] = useState(null);
  const { updateContent, updateAddress, address } = useContent();


  const handleClick = useCallback((e) => {
    if (!maps) {
      return null;
    }

    const coords = e.get('coords');
    setCoords(coords);
    // placemarkRef.current.geometry.setCoordinates(coords);
    maps.geocode(coords).then((res) => {
      const address = res.geoObjects.get(0).getThoroughfare();
      updateAddress(address)
      getAddressContent(address).then(content => {
        updateContent(content[0]?.content);
      });
    });
  }, [maps]);

  return (
    <div className={'main'}>
      <Map
        className={'main__map'}
        defaultState={{ center: coords, zoom: 14 }}
        modules={['geolocation', 'geocode']}
        onClick={handleClick}
        onLoad={(ymaps) => {
          setMaps(ymaps);
        }}
      >
        <ZoomControl options={{ float: 'right' }}/>
        {/*<GeolocationControl options={{ float: 'right' }}*/}
        {/*                    onLoad={(ymaps) => getGeoLocation(ymaps)}*/}
        {/*                    instanceRef={(map) => handleClick(map)}*/}
        {/*/>*/}

        <Placemark
          // ref={placemarkRef}
          modules={["geoObject.addon.balloon"]}
          geometry={coords}
          properties={{
            balloonContentBody: address,
          }}
        />
      </Map>
      <Autosuggest />
      <Informer />
    </div>
  );
};