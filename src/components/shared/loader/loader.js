import React from 'react';
import './loader.scss';

const Loader = ({ size = 64, lineWidth = 6 }) => (
  <div
    className="lds-dual-ring"
    style={{ width: size + 16, height: size + 16 }}
  >
    <div
      className="lds-dual-ring__inner"
      style={{ width: size, height: size, borderWidth: lineWidth }}
    />
  </div>
);

export default Loader;
