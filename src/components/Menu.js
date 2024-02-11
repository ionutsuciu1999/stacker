import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {


  return (
    <nav>
      <ul>
        <li>
          <Link to='/settings'>SETTINGS</Link>
        </li>
        <li>
          <Link to='/play'>PLAY</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
