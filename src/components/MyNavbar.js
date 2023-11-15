import React, { useState } from 'react';

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const people = ['Login', 'Signout'];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          MyApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggle}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isOpen ? 'show' : ''} collapse navbar-collapse`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {people.map((person, index) => (
              <li className="nav-item" key={index}>
                <a className="nav-link" href={`#${person.toLowerCase()}`}>
                  {person}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
