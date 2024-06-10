import './Roteiro.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Link } from 'react-router-dom';

function Roteiros() {
    return (
        <div className='container base'>
            <div className='content' id='roteiro'>
                <button className='btn return'>
                    <Link to="/homeroteiros"><i className="bi bi-chevron-left"></i>Voltar</Link>
                </button>
                <h1>Cidade</h1>
                <img id='img-roteiro' src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
                <div className='main-roteiro'>
                    <h2 id='header-roteiro'>Planejamento de Viagem</h2>
                    <h2 id='header-roteiro'>Destino</h2>
                    <h2 id='header-roteiro'>Data</h2>
                    <p id='body-roteiro'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                </div>
                <div className='lista-gastos'>
                    <h2 id='header-gastos'>Lista de Gastos</h2>
                    <ul id='body-gastos'>
                        <li>Gasto 1</li>
                        <li>Gasto 2</li>
                        <li>Gasto 3</li>
                        <li>Gasto 4</li>
                        <li>Gasto 5</li>
                        <li>Gasto 6</li>
                        <li>Gasto 7</li>
                        <li>Gasto 8</li>
                        <li>Gasto 9</li>
                        <li>Gasto 10</li>
                        <li>Gasto 11</li>
                        <li>Gasto 12</li>
                        <li>Gasto 13</li>
                        <li>Gasto 14</li>
                        <li>Gasto 15</li>
                        <li>Gasto 16</li>
                        <li>Gasto 17</li>
                        <li>Gasto 18</li>
                        <li>Gasto 19</li>
                        <li>Gasto 20</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Roteiros;
