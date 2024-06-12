/*import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeRoteiros() { 
    const [roteiros, setRoteiros] = useState([]);

    useEffect(() => {
        const fetchRoteiros = async () => {
            try {
                const response = await axios.get('http://localhost:3000/roteiros');
                const sortedRoteiros = response.data.sort((a, b) => new Date(b.data) - new Date(a.data));
                setRoteiros(sortedRoteiros);
            } catch (error) {
                console.error('Erro ao buscar roteiros:', error);
            }
        };

        fetchRoteiros();
    }, []);

    return (
        <div className="container" id= "base">
            <div className="content button" id='card'>
                <button className="btn create"><Link to="/roteiro"><i class="bi bi-plus"></i></Link></button>
            </div>
            <div className="content" id='card'>
                {roteiros.map((roteiro, index) => (
                    <div key={index} id = "card">
                        <Link to="/roteiro">
                            <div key={index} className='card-roteiro roteiro'>
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

export default HomeRoteiros*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeRoteiros = () => {
    const [roteiros, setRoteiros] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoteiro, setSelectedRoteiro] = useState(null);
    const [changes, setChanges] = useState({
        titulo: '',
        descricao: ''
    });

    useEffect(() => {
        fetchRoteiros();
    }, []);

    const fetchRoteiros = async () => {
        try {
            // Faça a requisição para obter os roteiros do usuário logado
            const response = await axios.get('http://localhost:5000/roteiros', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Envie o token de autorização
                }
            });
            setRoteiros(response.data);
        } catch (error) {
            console.error('Erro ao buscar roteiros:', error);
        }
    };

    const handleOpenModal = (roteiro) => {
        setSelectedRoteiro(roteiro);
        setChanges({
            titulo: roteiro.titulo,
            descricao: roteiro.descricao
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRoteiro(null);
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:5000/roteiros/${selectedRoteiro._id}`, changes, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchRoteiros(); // Atualiza a lista de roteiros após salvar as alterações
            handleCloseModal(); // Fecha o modal após salvar
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChanges({ ...changes, [name]: value });
    };

    return (
        <div className="container">
            <h1>Roteiros do Usuário</h1>
            <ul>
                {roteiros.map(roteiro => (
                    <li key={roteiro._id}>
                        <h2>{roteiro.titulo}</h2>
                        <p>{roteiro.descricao}</p>
                        <Button variant="primary" onClick={() => handleOpenModal(roteiro)}>Editar</Button>
                    </li>
                ))}
            </ul>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Roteiro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" name="titulo" value={changes.titulo} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formDescricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={3} name="descricao" value={changes.descricao} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>

            <Link to="/">Voltar</Link>
        </div>
    );
};

export default HomeRoteiros;
