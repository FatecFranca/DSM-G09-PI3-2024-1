import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Post.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Post = () => {
  const { id } = useParams();
  const [publicacao, setPublicacao] = useState(null);
  const [show, setShow] = useState(false);
  const [changes, setChanges] = useState(null);

  useEffect(() => {
    fetchPublicacao();
  }, []);

  const fetchPublicacao = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/postagens/${id}`);
      setPublicacao(response.data);
      setChanges(response.data); // Inicializa as alterações com os dados atuais da publicação
    } catch (error) {
      console.error('Erro ao buscar publicação:', error);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSaveChanges = async () => {
    try {
      await axios.post(`http://localhost:5000/postagens/${id}`, changes);
      await fetchPublicacao(); // Atualiza os dados da publicação após salvar as alterações
      handleClose(); // Fecha o modal após a atualização
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  const handlePublish = async () => {
    try {
      await axios.post(`http://localhost:5000/postagens/${id}/publicar`);
      // Atualiza o estado da publicação para refletir que foi publicada
      setPublicacao({ ...publicacao, publicada: true });
    } catch (error) {
      console.error('Erro ao publicar:', error);
    }
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;

    // Verifica se o campo é a descrição
    if (name === 'descricao') {
      setChanges({ ...changes, descricao: value });
    } else {
      // Atualiza os outros campos diretamente no objeto de alterações
      setChanges({ ...changes, [name]: value });
    }
  };

  if (!publicacao) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container base">
      <div className='content' id='post'>
      <button className='btn return'>
        <Link to="/publicacoes"><i className="bi bi-chevron-left"></i>Voltar</Link>
      </button>
      <div className="main-post">
        <h1 className="text-center">{publicacao.local}</h1>
        <div className="text-center">
          <img src={publicacao.urls_imagem[0]} alt={publicacao.local} className="img-fluid" style={{ maxHeight: '300px' }} />
        </div>
        <h2 className="mt-4">{publicacao.titulo}</h2>
        <p className="mt-4">{publicacao.descricao}</p>
        <h2 className="mt-4">Lista de gastos</h2>
        <ul>
          {publicacao.gasto.length > 0 ? publicacao.gasto.map((gasto, index) => (
            <li key={index}>{gasto.tipoDespesa}: {gasto.valor} - {gasto.descricao}</li>
          )) : <li>Sem gastos informados</li>}
        </ul>
      </div >

      <div className="btns-post">
        <Button variant="primary" onClick={handleShow}>Alterar</Button>
        {publicacao.publicada ? null : <Button variant="success" className="mt-3" onClick={handlePublish}>Publicar</Button>}
      </div>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Publicação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='form-modal'> 
            <Form.Group controlId="formTitulo">
              <Form.Label for="titulo" className='mt-3'><h4>Titulo</h4></Form.Label>
              <Form.Control type="text" defaultValue={publicacao.titulo} onChange={(e) => handleInputChange(e, null)} name="titulo" />
            </Form.Group>
            <Form.Group controlId="formCidade">
              <Form.Label for="local" className='mt-3'><h4>Local</h4></Form.Label>
              <Form.Control type="text" defaultValue={publicacao.local} onChange={(e) => handleInputChange(e, null)} name="local" />
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label for="descricao" className='mt-3'><h4>Descrição</h4></Form.Label>
              <Form.Control as="textarea" rows={3} defaultValue={publicacao.descricao} onChange={(e) => handleInputChange(e, null)} name="descricao" />
            </Form.Group>
            <Form.Group controlId="formImagem">
              <Form.Label for="urls_imagem" className='mt-3'><h4>Imagem</h4></Form.Label>
              <Form.Control type="text" defaultValue={publicacao.urls_imagem[0]} onChange={(e) => handleInputChange(e, null)} name="urls_imagem" />
            </Form.Group>
            <Form.Group controlId="formGastos">
              <Form.Label for='tipoDespesa-${index}' className='mt-3'><h4>Gastos</h4></Form.Label>
              {publicacao.gasto.length > 0 ? publicacao.gasto.map((gasto, index) => (
                <div key={index} className="mb-2">
                  <Form.Control type="text" defaultValue={gasto.tipoDespesa} onChange={(e) => handleInputChange(e, index)} name={`tipoDespesa-${index}`} className="me-2 mb-2" />
                  <Form.Control type="number" defaultValue={gasto.valor} onChange={(e) => handleInputChange(e, index)} name={`valor-${index}`} className="me-2 mb-2" />
                  <Form.Control type="text" defaultValue={gasto.descricao} onChange={(e) => handleInputChange(e, index)} name={`descricao-${index}`} className="me-2 mb-2" />
                </div>
              )) : <div>Sem gastos informados</div>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='btns-modal'>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Post;
