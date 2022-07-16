import * as React from 'react';
import {AppBar, Toolbar} from '@material-ui/core';
import {Box} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import EmojiNatureSharpIcon from '@mui/icons-material/EmojiNatureSharp';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';
import User from '../../../models/User';
import { useEffect, useState } from 'react';
import { buscaId } from '../../../services/Service';

const pages = ['Home', 'Postagens', 'Tema', 'Cadastrar Tema'];
const rotas = ['/home', '/posts', '/temas', '/cadastrarTema']
//const settings = ['Perfil', 'Conta', 'Dark Mode','Sair'];

const Navbar = () => {

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();
  const dispatch = useDispatch();

  function goLogout() {
    dispatch(addToken(''));
    toast.info('Usuário deslogado', {
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

  var navbarComponent;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [users, setUsers] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

   //buscar o ID armazenado no Store do redux
   const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
)

  async function getUserId() {
    await buscaId(`/usuarios/${userId}`, setUsers, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getUserId()
  }, [])

  if(token !== ''){
    navbarComponent = <AppBar position="static" className="appbar">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <EmojiNatureSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Link to="/home">
          <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
          >
            GABEE BLOG
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <Link to='/home'>
              <MenuItem onClick={handleCloseNavMenu}>Home</MenuItem>
            </Link>
            <Link to='/home'>
              <MenuItem onClick={handleCloseNavMenu}>Postagens</MenuItem>
            </Link>
            <Link to='/home'>
              <MenuItem onClick={handleCloseNavMenu}>Tema</MenuItem>
            </Link>
            <Link to='/home'>
              <MenuItem onClick={handleCloseNavMenu}>Cadastrar Tema</MenuItem>
            </Link>
            {/*{pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}*/}
          </Menu>
        </Box>

        <Link to="/home">
          <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
          >
            GABEE BLOG
          </Typography>
        </Link>
        
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          
            <Link to='/home' style={{color: 'white'}}>
              <MenuItem onClick={handleCloseNavMenu}>Home</MenuItem>
            </Link>
            <Link to='/posts' style={{color: 'white'}}>
              <MenuItem onClick={handleCloseNavMenu}>Postagens</MenuItem>
            </Link>
            <Link to='/temas' style={{color: 'white'}}>
              <MenuItem onClick={handleCloseNavMenu}>Tema</MenuItem>
            </Link>
            <Link to='/formularioTema' style={{color: 'white'}}>
              <MenuItem onClick={handleCloseNavMenu}>Cadastrar Tema</MenuItem>
            </Link>

        {/*
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
          */}
        </Box>
        <Box alignItems="center">
          <Typography style={{color: "#FFE4E1"}}>{users.nome}</Typography>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Your Name" src={require('../../../assets/img/perfil.png')} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px'}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Link to='/perfil' className='text-menu-settings'>
              <MenuItem onClick={handleCloseUserMenu}>Perfil</MenuItem>
            </Link>
            <Link to='/conta' className='text-menu-settings'>
              <MenuItem onClick={handleCloseUserMenu}>Conta</MenuItem>
            </Link>
            <MenuItem className='text-menu-settings' onClick={handleCloseUserMenu}>Dark Mode</MenuItem>
            <Box onClick={goLogout}>
              <MenuItem onClick={handleCloseUserMenu}>Sair</MenuItem>
            </Box>
              
            {/*{settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}*/}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
};
export default Navbar;