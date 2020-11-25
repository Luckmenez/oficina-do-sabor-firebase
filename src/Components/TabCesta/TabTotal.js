import React from 'react';
import './styles.css';

const TabTotal = ({arrayProdutos}) => {

    return (
        <table id='total'>
          <tbody>
            <tr>
                <td>Total</td>
                <td>{arrayProdutos.reduce((total, produto) => total += produto.quantidade,0)}</td>
                <td>{Math.ceil(arrayProdutos.reduce((total, produto) => total += (produto.quantidade * produto.valor)/10,0))}</td>
            </tr>
          </tbody>
        </table>
    );
}

export default TabTotal;