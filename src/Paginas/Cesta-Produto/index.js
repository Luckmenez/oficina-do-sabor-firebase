import React from 'react';
import './styles.css';
import Menu from '../../Components/Menu';
import TabCesta from '../../Components/TabCesta';
import firebase from '../../database/firebase';
import { useHistory } from 'react-router-dom';

const Cesta = () => {
  let history = useHistory()
  return (
    <div id='areaCesta'>
      <div id='bodyCesta'>
        <Menu />
        <div className='form-Cesta'>
          <div className='Cesta'>
            <div className='borda-interna'>
              <h1 id='tituloPag'>Sua cesta</h1>
              <TabCesta />
              <div id='btn'>
                <button id='botao1' onClick={() => Deletar()}>Limpar cesta</button>
                <button id='botao2' onClick={() => Finalizar()}>Finalizar Compra</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function Deletar() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinho) {
      carrinho = [];
      localStorage.removeItem('carrinho');
    }
    else (
      alert('Cesta vazia!')
    )
  }

  function Finalizar() {

    let produtosVendidos = JSON.parse(localStorage.getItem('carrinho'));
    let usuario = JSON.parse(localStorage.getItem('usr_secao'));
    if (produtosVendidos) {
      firebase
        .collection('vendas')
        .add({
          ...usuario,
          produtosVendidos,
          data_venda: new Date(),
          valor_total: Math.ceil(produtosVendidos.reduce((total, produto) => total += (produto.quantidade * produto.valor) / 10, 0))
        }).then(() => {
          alert('compra realizada');
          Deletar();
          history.push('/')
        })

    }
  }
}

export default Cesta;