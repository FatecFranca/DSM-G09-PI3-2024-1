import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Link } from 'react-router-dom';

function HomeRoteiros() {   
    return (
        <div className="container" id= "base">
            <div className="content" id='card'>
                <Link to="/roteiro">
                    <div className='card-roteiro'>
                        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
                    </div>
                </Link>
                <h2>Cidade</h2>
            </div>
            <div className="content" id='card'>
                <Link to="/roteiro">
                    <div className='card-roteiro'>
                        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
                    </div>
                </Link>
                <h2>Cidade</h2>
            </div>
            <div className="content" id='card'>
                <Link to="/roteiro">
                    <div className='card-roteiro'>
                        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
                    </div>
                </Link>
                <h2>Cidade</h2>
            </div>
            <div className="content" id='card'>
                <Link to="/roteiro">
                    <div className='card-roteiro'>
                        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
                    </div>
                </Link>
                <h2>Cidade</h2>
            </div>
            <div className="content" id='card'>
                <Link to="/roteiro">
                    <div className='card-roteiro'>
                        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
                    </div>
                </Link>
                <h2>Cidade</h2>
            </div>
            <div className="content button" id='card'>
                <button className="btn create"><Link to="/roteiro"><i class="bi bi-plus"></i></Link></button>
            </div>
        </div>
    );
}

export default HomeRoteiros