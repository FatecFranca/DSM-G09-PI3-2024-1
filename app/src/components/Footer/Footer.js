import './Footer.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-icons">
                <Link to='https://github.com/fatecfranca/DSM-G09-PI3-2024-1' target='_blank'><i class="bi bi-github"></i></Link>
                <Link to='https://www.youtube.com/channel/UC_MUB6G6lXqkPIQg6iA6-6A'target='_blank'><i class="bi bi-youtube"></i></Link>
            </div>
            <p className="footer-text">© 2024 Wanderlust</p>
            <Link to='/about' className="footer-text">Sobre</Link>
        </footer>
    );
}

export default Footer;