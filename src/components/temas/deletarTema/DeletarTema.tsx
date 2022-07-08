import React, { useEffect, useState } from "react";
import { CardActions, CardContent, Typography, Card, Button } from '@material-ui/core';
import {Box} from '@mui/material'
import './DeletarTema.css';
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../../models/Tema";
import { buscaId, deleteId } from "../../../services/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function DeletarTema() {

    let navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [tema, setTema] = useState<Tema>()

    useEffect(() => {
        if(token == "") {
            alert("Você precisa estar logado")
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if(id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/tema/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    function sim() {
        navigate('/temas')
        deleteId(`/tema/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        alert('Tema deletado com sucesso')
    }

    function nao() {
        navigate('/temas')
    }

    return(
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar o Tema:
                            </Typography>
                            <Typography color="textSecondary">
                                {tema?.descricao}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginRight btn-sim" size="large" color="primary">
                                    Sim
                                </Button>
                                <Button onClick={nao} variant="contained" className="btn-nao" size="large" color="secondary">
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

export default DeletarTema;