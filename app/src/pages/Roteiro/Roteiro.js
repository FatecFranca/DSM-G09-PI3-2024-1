import './Roteiro.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Roteiros() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cidade, setCidade] = useState('');
    const [destino, setDestino] = useState('');
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');
    const [gastos, setGastos] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);

    useEffect(() => {
        if (id) {
            fetchRoteiro(id);
            setModoEdicao(true);
        }
    }, [id]);

    const fetchRoteiro = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/roteiros/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const roteiro = response.data;
            setCidade(roteiro.cidade);
            setDestino(roteiro.destino);
            setData(roteiro.data);
            setDescricao(roteiro.descricao);
            setGastos(roteiro.gastos);
        } catch (error) {
            console.error('Erro ao buscar roteiro:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const roteiroData = {
                cidade,
                destino,
                data,
                descricao,
                gastos
            };

            if (modoEdicao) {
                await axios.put(`http://localhost:5000/roteiros/${id}`, roteiroData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } else {
                await axios.post('http://localhost:5000/roteiros', roteiroData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }

            navigate('/homeroteiros');
        } catch (error) {
            console.error('Erro ao salvar roteiro:', error);
            alert('Erro ao salvar roteiro. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className='container base' id="roteiro">
            <div className='content' id='roteiro'>
                <button className='btn return'>
                    <Link to="/homeroteiros"><i className="bi bi-chevron-left"></i>Voltar</Link>
                </button>
                <h1>{modoEdicao ? 'Editar Roteiro' : 'Criar Roteiro'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='cidade'>Cidade:</label>
                        <input 
                            type='text' 
                            id='cidade' 
                            value={cidade} 
                            onChange={(e) => setCidade(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='destino'>Destino:</label>
                        <input 
                            type='text' 
                            id='destino' 
                            value={destino} 
                            onChange={(e) => setDestino(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='data'>Data:</label>
                        <input 
                            type='date' 
                            id='data' 
                            value={data} 
                            onChange={(e) => setData(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='descricao'>Descrição:</label>
                        <textarea 
                            id='descricao' 
                            value={descricao} 
                            onChange={(e) => setDescricao(e.target.value)} 
                            rows='5' 
                            required 
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='gastos'>Lista de Gastos:</label>
                        <ul>
                            {gastos.map((gasto, index) => (
                                <li key={index}>{gasto}</li>
                            ))}
                        </ul>
                        <button className='btn' type='button' onClick={() => setGastos([...gastos, `Gasto ${gastos.length + 1}`])}>
                            Adicionar Gasto
                        </button>
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn'>{modoEdicao ? 'Salvar Alterações' : 'Criar Roteiro'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Roteiros;
