import React from 'react';

 import './styles.css';

const Header: React.FC = ({ children }) => {
  return (
      <div id="header">
          <div className="input">
              {children}
          </div>
      </div>
  );
}

export default Header;