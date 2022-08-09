import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Postagem from '../../models/Postagem';
import User from '../../models/User';
import { busca, buscaId } from '../../services/Service';
import { TokenState } from '../../store/tokens/tokensReducer';
import './Perfil.css'

function Perfil() {

    const { id } = useParams<{ id: string }>();

    const [endImg, setEndImg] = useState('./user.png');
  
    let navigate = useNavigate();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

     //buscar o ID armazenado no Store do redux
     const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

  useEffect(() => {
    if(token == ''){
        toast.error('Você precisa estar logado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
          });
      navigate('/login')
    }
  }, [token])

  async function getUserId() {
    await buscaId(`/usuarios/${userId}`, setUser, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getUserId()
  }, [])

  const [posts, setPosts] = useState<Postagem[]>([])

  const [user, setUser] = useState<User | any>({
    id: 0,
    nome: '',
    usuario: '',
    foto: '',
    senha: '',
    postagem: null
  });

  useEffect(() => {
    if (userId !== undefined) {
      findById(userId)
    }
    console.log(user)
  }, [userId]);

  async function findById(id: string) {
    buscaId(`/usuario/${userId}`, setUser, {
      headers: {
        'Authorization': token
      }
    })

  }

    return(
        <>
          <Box className="profileImageContainer">
            {user.foto ? <img className="profileImage" src={user.foto} alt={user.nome} /> : <img className='profileImage' src={endImg}/>}
            <Typography className="profile-name">{user.nome}</Typography>
            <Typography className="profile-email">{user.usuario}</Typography>
          </Box>
          <hr className='linha-perfil' />
    {/*
      {
      posts.map(post => (
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Minhas Postagens
            </Typography>
            <Typography variant="h5" component="h2">
              {post.titulo}
            </Typography>
            <Typography variant="body2" component="p">
              {post.texto}
            </Typography>
            <Typography variant="body2" component="p">
              Tema: {post.tema?.descricao}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              Postado por: {post.usuario?.nome}
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary">
              {new Date(post.data).toLocaleDateString()} às {new Date(post.data).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5}>

              <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft btn-update" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button className='btn-delete' variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))
    }
  */}
        </>
    );
}

export default Perfil;