import React, { Fragment } from 'react';

import { useContent } from '../../providers/ContentProvider';
import './Informer.css';

const DEFAULT_TITLE = 'ЯВедаю';
const DEFAULT_SUBTITLE = 'Подскажем историю улиц вашего города';
const DEFAULT_CONTENT = 'Используйте поиск или выберите улицу на карте.';

export const Informer = ({}) => {
  const { address, content: info } = useContent();
  const { content, images = [], wiki_link } = info;

  const mainImageUrl = images.length ? images[0].url : null;
  const description = content ? content.trim() : '';

  return (
    <div className="informer">
      <div className="informer-header">
        <div className={`informer-header__icon ${address ? 'address-icon' : 'initial-icon'}`} />
        <div>
          <p className="informer-header__title">{address || DEFAULT_TITLE}</p>
          <p className="informer-header__subtitle">{address ? 'Минск' : DEFAULT_SUBTITLE}</p>
        </div>
      </div>
      <div className="informer-separator" />
      <div className="informer-content">
        {address ? (
          <Fragment>
            <img alt={address} className="informer-content__img" src={mainImageUrl} />
            <div>
              {description || (
                <Fragment>
                  <span>К сожалению, сейчас не можем тебе подсказать, давай поищем вместе </span>
                  <a href={wiki_link} rel="noopener noreferrer" target="_blank">здесь</a>
                </Fragment>
              )}
            </div>
          </Fragment>
        ) : DEFAULT_CONTENT}
      </div>
    </div>
  );
};
