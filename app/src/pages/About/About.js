import './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function About() {
    return (
        <div className='container base'>
            <div className='content' id='about'>
                <h1>Sobre o projeto</h1>
                <p>Uma aplicação web para viagens, onde o usuário poderá se planejar, documentar, registrar os gastos, 
                    compartilhar momentos e trocar experiências. O objetivo é tornar o processo de viagem mais fácil, 
                    reunindo em um só lugar atividades como escolher o destino, descobrir as melhores rotas, realizar 
                    estimativas de custos, ver dicas, criar anotações e publicar sobre os lugares. Queremos criar uma 
                    comunidade de viajantes, onde todos possam compartilhar dicas e histórias sobre suas viagens. A 
                    aplicação é gratuita para todos os usuários e o sistema de monetização se dará através de parcerias 
                    e propagandas. Viajar está cada vez mais popular e muitas pessoas precisam desse tipo de ajuda!
                </p>
            </div>
        </div>
    );
}

export default About;
