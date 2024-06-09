import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login bem-sucedido:', data);
            } else {
                console.error('Erro ao fazer login:', data);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <div className='container base'>
            <div className='content' id='signin'>
                <button className='btn return'>
                    <Link to="/"><i className="bi bi-chevron-left"></i>Voltar</Link>
                </button>
                <h1>Bem vindo de volta!</h1>
                <div className='main'>
                    <div className='title-message'>
                        <h2 className='name-site'><Link to="/">Wanderlust</Link></h2>
                        <p>Publique e procure a viagem perfeita.</p>
                    </div>
                    <div className='form-message'>
                        <form className='form' onSubmit={handleSubmit}>
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
                                <label htmlFor="password">Senha:</label>
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Digite sua senha"
                                />
                            </div>
                            <div className='form-forgot'>
                                <p><Link to="/forgot">Esqueci minha senha</Link></p>
                            </div>
                            <button type="submit" className='btn login'>Login</button>
                        </form>
                        <p>Não tem uma conta? Faça seu <Link to="/signup">cadastro aqui</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
