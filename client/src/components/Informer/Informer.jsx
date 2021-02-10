import React from 'react';

import './Informer.css';
import { useContent } from '../../providers/ContentProvider';


export const Informer = ({}) => {
  const { address, content } = useContent();
console.log(address, content);
  return (
    <div className={'informer'}>
      <p>{address}</p>
      {content}
    </div>
  );
};