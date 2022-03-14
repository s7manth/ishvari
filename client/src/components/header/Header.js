import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
    return (
        <div className="header">
            <nav
                className="navbar navbar-expand-lg navbar-light
            justify-content-between align-middle"
            >
                <Link to="/" className="logo">
                    <h1
                        className="navbar-brand p-0 m-0"
                        onClick={() => window.scrollTo({ top: 0 })}
                    >
                        Ishvari
                    </h1>
                </Link>

                <div className="justify-content-between flex-row">
                    <Menu />
                    <Search />
                </div>
            </nav>
        </div>
    );
};

export default Header;
