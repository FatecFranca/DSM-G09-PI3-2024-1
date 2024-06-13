import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar se as senhas coincidem
        if (password !== confirmPassword) {
            console.error('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    nome: name,
                    email,
                    data_nascimento: date,
                    telefone: phone,
                    cpf,
                    senha: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Cadastro bem-sucedido:', data);
                navigate('/login');
            } else {
                console.error('Erro ao fazer cadastro:', data);
                // Exibir mensagem de erro específica para o usuário
                alert('Erro ao fazer cadastro. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            // Exibir mensagem de erro genérica para o usuário
            alert('Erro na requisição. Tente novamente mais tarde.');
        }
    };

    return (
        <div className='container'>
            <div className='content' id='signup'>
                <button className='btn return'>
                    <Link to="/"><i className="bi bi-chevron-left"></i>Voltar</Link>
                </button>
                <h1>Crie sua conta</h1>
                <div className='main'>
                    <div className='title-message'>
                        <h2 className='name-site'><Link to="/">Wanderlust</Link></h2>
                        <p>Publique e procure a viagem perfeita.</p>
                    </div>
                    <div className='form-message'>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='form-group'>    
                                <label htmlFor="name">Nome:</label>
                                <input 
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Digite seu nome e sobrenome"
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="email">E-mail:</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Digite seu e-mail"
                                    required
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="date">Data de nascimento:</label>
                                <input 
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="phone">Telefone:</label>
                                <input 
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Digite seu número de telefone"
                                    required
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="cpf">CPF:</label>
                                <input 
                                    type="text"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    placeholder="Digite o CPF sem pontos e traço"
                                    required
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="password">Senha:</label>
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Digite sua senha"
                                    required
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="confirmPassword">Confirmar senha:</label>
                                <input 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Digite sua senha novamente"
                                    required
                                />
                            </div>
                            <button type="submit" className='btn login'>Cadastrar</button>
                        </form>
                        <p> ou faça seu <Link to="/login">login aqui</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
