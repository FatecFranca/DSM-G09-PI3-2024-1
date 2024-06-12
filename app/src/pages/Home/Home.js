import './Home.css';
import React from 'react';


function Home() {

return (
    <div className="container text-center">
      <div className="row mt-5">
        <div className="col">
          <img src="/home-image.png" alt="Airplane" className="img-fluid" />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <h1 className="text-primary">Bem vindo!</h1>
          <p>Conheça o nosso site:</p>
          <p>
            O nosso site tem como foco ajudar viajantes a encontrar o melhor e mais barato lugar, para ter a melhor viagem. Para isso, temos a opção de anotar como foi sua viagem ou como fazer ela e outra opção é pesquisar e observar as publicações.
          </p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <button className="btn btn-outline-primary btn-block">Crie seu roteiro de viagens ou anote.</button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-outline-primary btn-block">Faça seu primeiro post ou pesquise nas publicações</button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <h2>Wanderlust</h2>
          <p>Publique e procure a viagem perfeita.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;



/* 
    <div>
      {/* Seção Hero }
      <section className="hero">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2>Wanderlust</h2>
              <p>Descubra o mundo com a gente!</p>
              <Button variant="primary" size="lg">Comece sua jornada</Button>
            </Col>
            <Col md={6}>
              <img src="" alt="Imagem Hero" fluid />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Seção Sobre }
      <section className="sobre">
        <Container>
          <h2>Sobre nós</h2>
          <p>
            Somos apaixonados por viagens e queremos ajudar você a ter a melhor experiência possível. 
            Oferecemos dicas, roteiros e informações sobre destinos incríveis para que você possa planejar sua viagem dos sonhos.
          </p>
          <p>
            Nosso site oferece diversas ferramentas para te ajudar:
          </p>
          <ul>
            <li>Crie seu roteiro de viagens e anote suas experiências</li>
            <li>Pesquise e observe as publicações de outros viajantes</li>
            <li>Publique suas próprias fotos e dicas</li>
          </ul>
        </Container>
      </section>

      {/* Seção Destinos }
      <section className="destinos">
        <Container>
          <h2>Destinos populares</h2>
          <Row>
            {/* Insira Cards de Destinos aqui/}
            <Col md={4}>
              <div className="card">
                <Image src="imagem-destino1.jpg" alt="Imagem Destino 1" />
                <h3>Nome do Destino 1</h3>
                <p>Descrição do Destino 1</p>
              </div>
            </Col>
            {/* ... }
          </Row>
        </Container>
      </section>

      {/* Seção Blog }
      <section className="blog">
        <Container>
          <h2>Blog</h2>
          <Row>
            {/* Insira Cards de Posts de Blog aqui }
            <Col md={4}>
              <div className="card">
                <Image src="imagem-post1.jpg" alt="Imagem Post 1" />
                <h3>Título do Post 1</h3>
                <p>Descrição do Post 1</p>
              </div>
            </Col>
            {/* ... }
          </Row>
        </Container>
      </section>

      {/* Seção Contato }
      <section className="contato">
        <Container>
          <h2>Contato</h2>
          <p>Entre em contato conosco</p>
          <form>
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Mensagem" />
            <button type="submit">Enviar</button>
          </form>
        </Container>
      </section>
    </div>
  ); */