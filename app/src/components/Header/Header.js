import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css'; 

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                          
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/"><img src={logo} className="logo" alt="logo" /></Link>
            <div className="collapse navbar-collapse" id="navbarNav">    
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/publicacoes">Publicações</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/roteiros">Roteiro de Viagens</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sobre">Sobre</Link>
                    </li>
                </ul>
            </div>
            <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-circle"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        <li><Link className="dropdown-item" to="/">Ver Perfil</Link></li>
                        <li><Link className="dropdown-item" to="/">Sair</Link></li>
                    </ul>
            </div>
            </div>
        </nav>
    );
}

export default Header;
