import React, { useCallback, useEffect, useState } from 'react';
import { Map, Placemark, ZoomControl } from 'react-yandex-maps';

import { Informer } from '../../components/Informer/Informer';
import { Autosuggest } from '../../components/Autosuggest/Autosuggest';
import { Logo } from '../../components/Logo/Logo';
import { getAddressContent, getAddressContentById } from '../../api/api';
import { useContent } from '../../providers/ContentProvider';

import './Main.css';


export const Main = ({}) => {
  const [coords, setCoords] = useState([53.91823800088732, 27.585849216796873]);
  const [maps, setMaps] = useState(null);
  const { updateContent, updateAddress, address } = useContent();

  useEffect(() => {
    const query = new URLSearchParams(document.location.search);
    const streetId = query.get('id');

    if (streetId) {
      getAddressContentById(streetId)
      .then(({ name, ...content }) => {
        updateAddress(name);
        updateContent(content);
      })
    }
  }, []);

  const prepareAddress = useCallback((coords) => {
    if (!maps) {
      return null;
    }

    maps.geocode(coords).then((res) => {
      const address = res.geoObjects.get(0).getThoroughfare();
      updateAddress(address)
      getAddressContent(address).then(content => {
        updateContent(content[0] || {});
      });
    });
  }, [maps]);

  useEffect(() => {
    prepareAddress(coords);
  }, [maps]);

  const handleClick = useCallback((e) => {
    if (!maps) {
      return null;
    }

    const coords = e.get('coords');
    setCoords(coords);
    // placemarkRef.current.geometry.setCoordinates(coords);
    prepareAddress(coords)
  }, [prepareAddress, maps]);

  return (
    <div className={'main'}>
      <Map
        className={'main__map'}
        defaultState={{ center: coords, zoom: 14 }}
        modules={['geolocation', 'geocode']}
        onClick={handleClick}
        onLoad={(ymaps) => {
          setMaps(ymaps);
          prepareAddress(coords);
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
      <Logo />
      <Autosuggest />
      <Informer />
    </div>
  );
};