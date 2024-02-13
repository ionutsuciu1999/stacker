import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {


  return (
    <div className="menuContainer">
      <div>
        <Link to='/settings'>SETTINGS</Link>
      </div>
      <div>
        <Link to='/play'>PLAY</Link>
      </div>
    </div>
  );
};

export default Menu;
