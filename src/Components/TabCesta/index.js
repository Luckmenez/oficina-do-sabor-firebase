import React, { useState } from 'react';
import { useEffect } from 'react';
import './styles.css';
import TabItem from './TabItem.js';
import TabTotal from './TabTotal.js';

function TabCesta() {
  const [cestaProduto, setCestaProduto] = useState([]);
  useEffect(() => {
    const carrinho = localStorage.getItem('carrinho');
    if(carrinho){
      setCestaProduto(JSON.parse(carrinho))
    }
  },[])
    return (
        <div>
          {/* {!cestaProduto.length && <tr id='tr'><td id='td'>Nenhum item adicionado</td></tr>} */}

            <table id='tabela'>
              <tbody>
                <tr id='tr'>
                    <td id='td'>Item</td>
                    <td id='td'>Qtd.</td>
                    <td id='td'>Valor</td>
                </tr>
              </tbody>
            </table>
            <span id='tab1'>
              {cestaProduto.map((produto, index) => <TabItem key={index} produto={produto} />)}
            </span>
            <TabTotal arrayProdutos={cestaProduto} />
        </div>
    );
}

export default TabCesta;