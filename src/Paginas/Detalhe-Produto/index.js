import React from 'react';
import DescProduto from '../../Components/DescProduto/index'
import './styles.css';
import Menu from '../../Components/Menu';

const Produto = () => {
    return (
        <div id='areaProduto'>
            <div id='bodyProduto'>
                <Menu />
                <div className='form-Produto'>
                    <div className='Produto'>
                        <div className='borda-interna'>
                            <DescProduto />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Produto;