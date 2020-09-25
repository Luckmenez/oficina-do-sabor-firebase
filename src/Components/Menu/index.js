import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/sem_foto.png';
import carrinhoCompras from '../../assets/images/cart_2.png';
import login from '../../assets/images/user.png';

import styles from './styles.css';

const menu = props => {
    return (

       <div id='menu'>
            <img src={logo} className='logo' />
            <ul className="menu-links">
                <li>
                    <Link to="/login">O Restaurante</Link>
                </li>
                <li>
                    <Link to="/login">Cardápio</Link>
                </li>
                <li>
                    <Link to="/login" ><img src={login} alt='Entre na sua conta' /></Link>
                </li>
                <li>
                    <Link><img src={carrinhoCompras} alt='Carrinho de compras' /></Link>
                </li>
            </ul>
        </div>

    );
}

export default menu;

/*
SHIFT + ALT + F = INDENTA
SHIFT + ALT + SETA PRA BAIXO - COPIA A

*/