import React from 'react';
import {Typography, Box, Grid, Button} from '@material-ui/core';
import './Home.css';
import TabPostagem from '../../components/postagens/tabPostagem/TabPostagem';

function Home() {
    return(
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid alignItems="center" item xs={6}>
                    <Box paddingX={6} >
                        <Typography variant="h4" gutterBottom component="h4" align="center" className="titulo">Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom component="h5" align="center" className="titulo">expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                        </Box>
                        <Button variant="outlined" className="botao">Ver Postagens</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} >
                    <img src="https://images.vexels.com/media/users/3/205464/isolated/preview/33d6bbfd7171189bd02d36b4e2befb6b-pilha-de-livros-com-ilustracao-de-cha.png" alt="" width="500px" height="500px" />
                </Grid>
                <Grid xs={12} className="postagens">
                    <TabPostagem />
                </Grid>
            </Grid>

        {/* Display Grid
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <Paper style={ {height: "100vh", background: "lightgray"} }/>
                </Grid>
                <Grid item container direction="column" xs={12} sm={4} spacing={2}>
                    <Grid item>
                        <Paper style={ {height: "49vh", background: "orange"} }/>
                    </Grid>
                    <Grid item>
                        <Paper style={ {height: "49vh", background: "green"} }/>
                    </Grid>
                </Grid>
            </Grid>
        */}
        {/*Display Flex
            <Paper>
                <Box p={2}>
                    <Box display="flex" justifyContent="center">
                        <h1>Título</h1>
                    </Box>
                    <img src="https://www.triscele.com.br/wp-content/uploads/2017/01/desenvolvimento-web.jpg" alt="ferramentas para desenvolvimento web" style={{width: "100%", height: "100%"}}/>
                    <Box display="flex" justifyContent="center" p={2}>
                        <Button variant='contained' color="primary">Texto 1</Button>
                        <Button variant='contained' color="secondary">Texto 2</Button>
                    </Box>
                </Box>
            </Paper>
        */}
        </>
    );
}

export default Home;