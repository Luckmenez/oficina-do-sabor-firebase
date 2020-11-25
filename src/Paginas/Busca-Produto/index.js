import React from 'react';
import './styles.css';
import Menu from '../../Components/Menu';

const Busca = () => {
    return (
        <div id='areaBusca'>
            <div id='bodyBusca'>
                <Menu />
                <div className='form-Busca'>
                    <div className='Busca'>
                        <div className='borda-interna'>
                            <h1 id='tituloPag'>Busca</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Busca;