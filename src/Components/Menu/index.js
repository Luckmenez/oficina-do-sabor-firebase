import React from 'react';
import { Link } from 'react-router-dom';
import BarraPesquisa from '../../Components/Pesquisa';
import logo from '../../assets/images/Logo-site.png';
import carrinhoCompras from '../../assets/images/cart_2.png';
import login from '../../assets/images/user.png';
import './styles.css';

const menu = props => {
    return (
        <div id='menu'>
            <BarraPesquisa />
            <div className='menu-links'>
                <img src={logo} className='logo' alt='logo'/>
                <div className='faixa-vermelha'>
                    <ul>
                        <li>
                            <Link to='/login'>Produtos</Link>
                        </li>
                        <li>
                            <Link to='/' ><img src={login} alt='Entre na sua conta' /></Link>
                        </li>
                        <li>
                            <Link to='/cesta-produto' ><img src={carrinhoCompras} alt='Carrinho de compras' /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default menu;
