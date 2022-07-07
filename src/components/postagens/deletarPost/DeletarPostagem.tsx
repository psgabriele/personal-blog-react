import React from "react";
import { CardActions, CardContent, Typography, Card, Button } from '@material-ui/core';
import {Box} from '@mui/material'
import './DeletarPostagem.css';

function DeletarPostagem() {
    return(
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a Postagem:
                            </Typography>
                            <Typography color="textSecondary">
                                Título Postagem
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
                            <Box mx={2}>
                                <Button variant="contained" className="marginLeft" size="large" color="primary">
                                    Sim
                                </Button>
                                <Button variant="contained" size="large" color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}

export default DeletarPostagem;