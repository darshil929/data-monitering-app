import * as React from 'react';
import { SocketContext } from '../App';
import { useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
import config from './config.json';

const a = Object.values(config.databases);
console.log(a, "Object");

const Testing = forwardRef((props, ref) => {
  const evenIndices = a.filter((_, index) => index % 2 === 0);
  console.log(evenIndices,'evenindices')

  return (
    <>
      {evenIndices.map((item, index) => (
        <div key={index}>
            {item} 
        </div>
      ))}
    </>
  );
});

export default Testing;
