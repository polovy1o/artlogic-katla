import { Outlet, NavLink } from 'react-router-dom';
import './App.css';
import React from 'react';

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                <div>
                    <NavLink className="navbar-brand" to="/">
                        <span style={{ color: "yellow", fontWeight: "bold", fontFamily: "Arial, Helvetica, sans-serif", marginRight: "0.1em", border: "yellow solid 1px", padding: "6px" }}>K</span>
                        <span style={{ marginLeft: "5px" }}>KatlaSport</span>
                    </NavLink>
                </div>
                <div className="collapse navbar-collapse" style={{ marginLeft: "100px" }} id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/hives">Hives</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Product Management</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Categories</a>
                                <a className="dropdown-item" href="#">Products</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            <Outlet />
        </div>

    )
}

export default App;
