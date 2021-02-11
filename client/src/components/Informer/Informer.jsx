import React, { Fragment } from 'react';

import { useContent } from '../../providers/ContentProvider';
import './Informer.css';

const DEFAULT_TITLE = 'ЯВедаю';
const DEFAULT_SUBTITLE = 'Подскажем историю улиц вашего города';
const DEFAULT_CONTENT = 'Используйте поиск или выберите улицу на карте.';

export const Informer = ({}) => {
  const { address, content } = useContent();

  return (
    <div className="informer">
      <div>
        <p className="informer-header__title">{address || DEFAULT_TITLE}</p>
        <p className="informer-header__subtitle">{address ? 'Минск' : DEFAULT_SUBTITLE}</p>
      </div>
      <hr className="informer-separator" />
      <div className="informer-content">
        {address ? (
          <Fragment>
            <div className="informer-content__img" />
            <div>{content || 'Wiki link..'}</div>
          </Fragment>
        ) : DEFAULT_CONTENT}
      </div>
    </div>
  );
};
