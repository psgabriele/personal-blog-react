import react, {useState, useEffect, ChangeEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import {Box} from '@mui/material';
import {Link} from 'react-router-dom';
import './CadastroUsuario.css';
import { cadastroUsuario } from '../../services/Service';
import { toast } from 'react-toastify';

function CadastrarUsuario() {

    let navigate = useNavigate();
    const [confirmarSenha,setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            foto: '',
            senha: ''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            foto: '',
            senha: ''
        })

    useEffect(() => {
        if (userResult.id != 0) {
            navigate("/login")
        }
    }, [userResult])


    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if(confirmarSenha == user.senha){
        cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
        toast.success('Usuário cadastrado com sucesso!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
          })
        }else{
            toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
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
        <>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'>
                <Box p={2} className = 'img-login'>
                    <img width="80%" src="https://cdn.pixabay.com/photo/2021/01/14/18/19/bee-5917610_960_720.png" alt="Abelha"/>
                </Box>
            </Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="text-title">Cadastrar</Typography>
                        <TextField value={user.nome} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="nome" label='nome*' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField value={user.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label='email*' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField value={user.foto} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="foto" label='foto' variant='outlined' name='foto' margin='normal' fullWidth />
                        <TextField value={user.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label='senha*' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField value={confirmarSenha} onChange={(e:ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id="confirmarSenha" label='confirmar senha *' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
                        <Box marginTop={3} textAlign='center' className='buttons'>
                            <Button className="btnCadastrar" type='submit' variant='contained'>Cadastrar</Button>
                            <Link to='/login'>
                                <Button className="btnCancelar" variant='contained'>Cancelar</Button>
                            </Link>
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Grid>
        </>
    );
}

export default CadastrarUsuario;