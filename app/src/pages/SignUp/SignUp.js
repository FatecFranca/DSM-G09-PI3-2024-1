import { useState } from 'react';
import { Link } from 'react-router-dom';
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    name,
                    email,
                    date,
                    phone,
                    cpf,
                    password,
                    confirmPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Cadastro bem-sucedido:', data);
            } else {
                console.error('Erro ao fazer cadastro:', data);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
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
                                <label htmlFor="password">Nome:</label>
                                <input 
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Digite seu nome e sobrenome"
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="email">E-mail:</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Digite seu e-mail"
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="password">Data de nascimento:</label>
                                <input 
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="password">Telefone:</label>
                                <input 
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Digite seu número de telefone"
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="password">CPF:</label>
                                <input 
                                    type="text"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    placeholder="Digite o CPF sem pontos e traço"
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="password">Senha:</label>
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Digite sua senha"
                                />
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="password">Confirmar senha:</label>
                                <input 
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Digite sua senha novamente"
                                />
                            </div><br></br>
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
