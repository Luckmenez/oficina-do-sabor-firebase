import React, { useState, useEffect } from 'react';
import firebase from '../../database/firebase';
import './styles.css';
import Menu from '../../Components/Menu';
import CardProduto from '../../Components/Card-Produto/Card-Produto';
import { Grid } from '@material-ui/core';

function useProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    firebase
      .collection('produtos')
      .onSnapshot(snapshot => {
        const novosProdutos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        setProdutos(novosProdutos)
      })
  }, []);

  return produtos
}


const Initial = () => {

  const [cestaProduto, setCestaProduto] = useState([]);
  useEffect(() => {
    const carrinho = localStorage.getItem('carrinho');
    if(carrinho){
      setCestaProduto(JSON.parse(carrinho))
    }
  },[])

  function addProduto(titulo, valor, quantidade) {
    setCestaProduto([
      ...cestaProduto,
      { titulo, valor, quantidade }
    ])
    // localStorage.removeItem('carrinho')
    localStorage.setItem('carrinho',JSON.stringify([...cestaProduto, {titulo,valor,quantidade}]))
    console.log(cestaProduto)
  }
  const produtos = useProdutos();
  return (
    <>
      <div id='area'>
        <div id='bodyInitial'>
          <Menu />
          <div className='form-initial'>
            <div className='initial'>
              <div className='borda-interna'>
                <h1 id='tituloPag'>Produtos</h1>
                <Grid container>
                  {produtos.map(produto =>
                    <Grid item xs={12} sm={6} md={4} key={produto.id}>
                      <CardProduto
                        imagem={produto.url_img}
                        titulo={produto.txt_nome}
                        tipoProduto={produto.txt_tipo}
                        quantidade={produto.int_unidades}
                        descricao={produto.txt_desc_abreviacao}
                        valor={produto.float_valor}
                        onAddProduto={addProduto}
                      />
                    </Grid>
                  )}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Initial;