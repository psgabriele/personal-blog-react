import React, { ChangeEvent, useEffect, useState } from "react";
import {Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText} from '@material-ui/core';
import './CadastroPost.css';
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import Postagem from "../../../models/Postagem";
import { busca, buscaId, post, put } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import User from "../../../models/User";
import { toast } from "react-toastify";

function CadastroPost() {

    let navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    
    useEffect(() => {
        if(token == "") {
            toast.error('Você precisa estar logado!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              })
            navigate('/login')
        }
    }, [token])

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null //adiciona o atributo usuário na postagem
    })

    //buscar o ID armazenado no Store do redux
    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
    )

    //useState para gerar o usuario
    const [usuario, setUsuario] = useState<User>({
    id: +userId,    // Faz uma conversão de String para Number
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
    })

    useEffect(() => {
        setPostagem({
            ...postagem, 
            tema: tema,
            usuario: usuario
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/tema", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem atualizada com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              })
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem cadastrada com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              })
        }
        back()

    }

    function back() {
        navigate('/posts')
    }

    return(
        <Container maxWidth="sm" className="topo">
             <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center">Criar Postagem</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="título" variant="outlined" name="titulo" margin="normal" fullWidth />
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" variant="outlined" name="texto" margin="normal" fullWidth multiline rows={3}/>
                
                <FormControl fullWidth variant='filled'>
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select 
                        labelId="demo-simple-select-helper-label" 
                        id="demo-simple-select-helper-label"
                        onChange={(e) => buscaId(`/tema/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map((tema) => (
                                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button className="botao" type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>  
                </FormControl> 
            </form>
        </Container>
    );
}

export default CadastroPost;