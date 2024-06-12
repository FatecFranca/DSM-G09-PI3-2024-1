import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePosts() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [newPost, setNewPost] = useState({
    titulo: '',
    descricao: '',
    local: '',
    urls_imagem: '',
    gasto: [],
    usuario: '6668d4938fda09009426c1e5',  // Adiciona um usuário fixo para testes
    publico: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/postagens')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar posts:', error);
      });
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('tipoDespesa') || name.startsWith('valor') || name.startsWith('descricaoGasto')) {
      const gastoIndex = parseInt(name.split('-')[1]);
      const gastoField = name.split('-')[0];
      const updatedGasto = [...newPost.gasto];
      updatedGasto[gastoIndex] = { ...updatedGasto[gastoIndex], [gastoField]: value };
      setNewPost({ ...newPost, gasto: updatedGasto });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handleAddGasto = () => {
    setNewPost({ ...newPost, gasto: [...newPost.gasto, { tipoDespesa: '', valor: '', descricao: '' }] });
  };

  const handleSaveNewPost = async () => {
    try {
      console.log('Tentando criar um novo post:', newPost);
      const response = await axios.post('http://localhost:5000/postagens', newPost);
      console.log('Resposta da criação do post:', response.data);
      const newPostId = response.data._id;
      handleClose();
      if (newPostId) {
        console.log('Redirecionando para o post:', newPostId);
        navigate(`/post/${newPostId}`);
      } else {
        console.error('Erro: ID do novo post não encontrado');
      }
    } catch (error) {
      console.error('Erro ao criar publicação:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
    }
  };


  return (
    <div className="container base">
      <button className="btn btn-primary mt-3 mb-3" id="criar-publicacao" onClick={handleShow}>Criar Publicação</button>
      {posts.map(post => (
        <div key={post.id} className="card content" id='publicacoes'>
          <Link to={`/post/${post._id}`}>
            <div id="publicacoes-card">
              <img src={post.urls_imagem} alt={post.titulo} className="card-img-top" />
              <h5 className="card-title">{post.titulo}</h5>
              <p className="card-text">{post.descricao}</p>
              <p className="card-text"><small className="text-muted">{post.data_criacao}</small></p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="rating">
                  {'★'.repeat(post.avaliacao_media)}{'☆'.repeat(5 - post.avaliacao_media)}
                </div>
                <div>{post.comentarios.length}</div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Publicação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='form-modal'>
            <Form.Group controlId="formTitulo">
              <Form.Label><h3>Título</h3></Form.Label>
              <Form.Control type="text" name="titulo" value={newPost.titulo} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formLocal">
              <Form.Label><h3>Local</h3></Form.Label>
              <Form.Control type="text" name="local" value={newPost.local} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label><h3>Descrição</h3></Form.Label>
              <Form.Control as="textarea" rows={3} name="descricao" value={newPost.descricao} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formImagem">
              <Form.Label><h3>Imagem</h3></Form.Label>
              <Form.Control type="text" name="urls_imagem" value={newPost.urls_imagem} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='btns-modal'>
          <Button variant="secondary" onClick={handleClose}>Fechar</Button>
          <Button variant="primary" onClick={handleSaveNewPost}>Criar Publicação</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HomePosts;

/*             <Form.Group controlId="formGastos">
            <Form.Label className='mt-3'><h4>Gastos</h4></Form.Label>
              {newPost.gasto.map((gasto, index) => (
                <div key={index} className="mb-2">
                  <Form.Control type="text" value={gasto.tipoDespesa} onChange={(e) => handleInputChange(e, index)} name={`tipoDespesa-${index}`} placeholder="Tipo de Despesa" className="me-2 mb-2" />
                  <Form.Control type="number" value={gasto.valor} onChange={(e) => handleInputChange(e, index)} name={`valor-${index}`} placeholder="Valor" className="me-2 mb-2"/>
                  <Form.Control type="text" value={gasto.descricao} onChange={(e) => handleInputChange(e, index)} name={`descricaoGasto-${index}`} placeholder="Descrição" className="me-2 mb-2" />
                </div>
              ))}
              <Button variant="secondary" onClick={handleAddGasto}>Adicionar Gasto</Button>
            </Form.Group>
            
*/