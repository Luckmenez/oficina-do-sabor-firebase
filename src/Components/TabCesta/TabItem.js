import React from 'react';
import './styles.css'

const TabItem = ({produto}) => {
    return (
        <table id='tabela'>
          <tbody>
            <tr>
                <td>{produto.titulo}</td>
                <td>10</td>
                <td>{produto.valor}</td>
            </tr>
          </tbody>
        </table>
    );
}

export default TabItem;