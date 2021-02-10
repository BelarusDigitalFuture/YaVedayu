import React from 'react';
import ReactDOM from 'react-dom';
import { YMaps } from 'react-yandex-maps';

import 'normalize.css/normalize.css';
import './index.css';
import { Main } from './pages/Main/Main';
import { ContentProvider } from './providers/ContentProvider';

ReactDOM.render(
  <YMaps
    query={{
      lang: 'ru_RU',
      apikey: 'ee89beff-0989-4039-8c8c-87f25e0ad746',
    }}
  >
    <ContentProvider>
      <Main/>
    </ContentProvider>
  </YMaps>,
  document.getElementById('root'),
);
