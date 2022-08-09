import React, {ChangeEvent, useEffect, useState} from "react";
import './Login.css';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import {Box} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";
import background from '../../assets/img/sunset.png';
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/actions";
import { toast } from "react-toastify";

function Login() {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const [token, setToken] = useState('');

    const[userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        token: ''
    });

    //State para pegar os dados retornados a API
    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        token: '',
        foto: ""
    })

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    };

    useEffect(()=>{
        if(token != '') {
            dispatch(addToken(token))
            navigate('/home');
        }
    }, [token])

    useEffect(() => {
        if (respUserLogin.token !== "") {
    
            // Verifica os dados pelo console (Opcional)
            console.log("Token: " + respUserLogin.token)
            console.log("ID: " + respUserLogin.id)
    
            // Guarda as informações dentro do Redux (Store)
            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))    // Faz uma conversão de Number para String
            navigate('/home')
        }
    }, [respUserLogin.token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try{
            await login(`/usuarios/logar`, userLogin, setRespUserLogin)

            toast.success('Usuário logado com sucesso!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
              })
        } catch(error){
            toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
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
    }

    return(
        <Grid container direction='row' justifyContent="center" alignItems="center">
            <Grid alignItems="center" xs={6}>
                <Box paddingX={18}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="text-title">Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label='e-mail' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>
                                <Button className="botao" type='submit' variant='contained' color='primary'>Logar</Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastro'><Typography variant='subtitle1' gutterBottom align='center' className="textos">Cadastre-se</Typography></Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} className='imagem' justifyContent="center" alignItems="center">
                <Box p={2} className = 'img-login'>
                    <img width="70%"src='https://2.bp.blogspot.com/-j-nkjljGYWI/VoCHKIXTb-I/AAAAAAAA6Ok/OgLMysJmOsI/s1600/abelhinhas%2Bem%2Bpng%2Be%2Bgifs%2B%252811%2529.png' alt="Abelhinha com flor na mão" />
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login;