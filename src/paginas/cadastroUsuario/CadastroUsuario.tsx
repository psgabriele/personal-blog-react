import react from 'react';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import {Box} from '@mui/material';
import {Link} from 'react-router-dom';
import './CadastroUsuario.css';

function CadastrarUsuario() {
    return(
        <>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid item xs={6} className='imagem2'>

            </Grid>
            <Grid item xs={6} alignItems='center'>
                <Box paddingX={10}>
                    <form>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="text-title">Cadastrar</Typography>
                        <TextField id="nome" label='nome' variant='outlined' name='nome' margin='normal' fullWidth />
                        <TextField id="usuario" label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField id="senha" label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <TextField id="confirmarSenha" label='confirmar senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' fullWidth />
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