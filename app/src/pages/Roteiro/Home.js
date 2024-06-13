import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeRoteiros() {
    const [roteiros, setRoteiros] = useState([]);
    const userId = '6668d4938fda09009426c1e5';  // Defina o ID do usuário autenticado

    useEffect(() => {
        const fetchRoteiros = async () => {
            try {
                const response = await axios.get('http://localhost:5000/roteiros/', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        usuario: userId
                    }
                });
                const sortedRoteiros = response.data.sort((a, b) => new Date(b.data) - new Date(a.data));
                setRoteiros(sortedRoteiros);
            } catch (error) {
                console.error('Erro ao buscar roteiros:', error);
            }
        };

        fetchRoteiros();
    }, [userId]);

    return (
        <div className="container" id="base">
            <div className="content button" id='card'>
                <button className="btn create">
                    <Link to="/roteiro"><i className="bi bi-plus"></i></Link>
                </button>
            </div>
            <div className="content" id='card'>
                {roteiros.map((roteiro, index) => (
                    <div key={index} id="card">
                        <Link to={`/roteiro/${roteiro._id}`}>
                            <div className='card-roteiro roteiro'>
                                <img src={roteiro.img} alt={roteiro.cidade}></img>
                            </div>
                        </Link>
                        <h2>{roteiro.cidade}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeRoteiros;
