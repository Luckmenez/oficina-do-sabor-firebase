import React from 'react';
import './styles.css';
import lupa from '../../assets/images/lupa.png';
import { Link } from 'react-router-dom';

const BarraPesquisa = props => {
    return (
        <React.Fragment>
            <div className='pesquisa'>
                <input id='pesquisaSite' placeholder='Digite sua pesquisa...' type='text' />
                <button title='Ok' onClick={() => {}} type='submit'>
                    <Link to='/busca-produto'>
                        <img src={lupa} alt='lupa'/>
                    </Link>
                </button>
            </div>
        </React.Fragment>
    );
}

export default BarraPesquisa;