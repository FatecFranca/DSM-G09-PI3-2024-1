import { Link } from 'react-router-dom';
import './SignIn.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function SignIn() {
    return (
        <div className='container base'>
            <div className='content'>
                <button className='btn return'><Link to="/"><i className="bi bi-chevron-left"></i>Voltar</Link></button>
                <h1>Bem vindo de volta!</h1>
                <div className='container main'>
                    <div className='title-message'>
                        <h2 className='name-site'><Link to="/">Wanderlust</Link></h2>
                        <p>Publique e procure a viagem perfeita.</p>
                    </div>
                    <div className='form-message'>
                        <form className='form' method='post'> 
                            <div className='form-group'>
                                <label htmlFor="email">E-mail:</label>
                                <input type="email" placeholder="Digite seu e-mail"/>
                            </div>
                            <div className='form-group'>    
                                <label htmlFor="password">Senha:</label>
                                <input type="password" placeholder="Digite sua senha"/>
                            </div>
                            <div className='form-forgot'>
                                <p><Link to="/forgot">Esqueci minha senha</Link></p>
                            </div>
                            <button type="submit" className='btn login'>Login</button>
                        </form>
                        <p>Não tem uma conta? Faça seu <Link to="/signup">cadastro aqui</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;