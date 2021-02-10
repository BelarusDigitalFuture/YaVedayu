import React from 'react';
import { Map, YMaps } from 'react-yandex-maps';

import './Main.css';
import { Informer } from '../../components/Informer/Informer';


export const Main = ({}) => {
  return (
    <div className={'main'}>
      <YMaps
        query={{ lang: 'ru_RU' }}
        apikey={'ee89beff-0989-4039-8c8c-87f25e0ad746'}
      >
        <Map
          className={'main__map'}
          defaultState={{ center: [53.918162, 27.603702], zoom: 14 }}
        />
      </YMaps>

      <Informer/>
    </div>
  );
};