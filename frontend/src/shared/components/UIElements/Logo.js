import React from 'react';

import './Logo.css';

import mimiPcLogo from '../../../assets/images/logo512.png';

const Logo = props => {
  return (
    <div className="logo" style={{ height: props.height }}>
      <img src={mimiPcLogo} alt="MimiPC-Logo" />
    </div>
  );
};

export default Logo;
