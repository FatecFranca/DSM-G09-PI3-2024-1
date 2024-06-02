import { Link } from 'react-router-dom';
import './SignIn.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function SignIn() {
    return (
        <div className='container text-center'>
            <div className='content d-flex flex-column '>
                <button className='btn  text-start my-2'><i className="bi bi-chevron-left"></i>Voltar</button>
                <h1>Bem vindo de volta!</h1>
                <div >
                    <div>
                        <h2>Wanderlust</h2>
                        <p>Publique e procure a viagem perfeita.</p>
                    </div>
                    <div>
                        <form>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" placeholder="Digite seu e-mail"/>
                            <label htmlFor="password">Senha:</label>
                            <input type="password" placeholder="Password"/>
                            <button>Sign In</button>
                        </form>
                        <p>Não tem uma conta? Faça seu cadastro <Link to="/signup">aqui</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;