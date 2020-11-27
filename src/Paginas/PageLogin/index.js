import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './styles.css';
import firebase from '../../database/firebase';
import Menu from '../../Components/Menu';
import Modal from '../../Components/Modal';

const valorInicialLogin = {
  nome_login:'',
  senha_login:''
}

const valorInicialCadastro = {
  txt_nome: '',
  txt_email: '',
  txt_senha: '',
  txt_cpf: '',
  txt_celular: '',
  txt_cep: '',
  txt_endereco: '',
  txt_numero_endereco: ''
}


const PageLogin = props => {
  let history = useHistory();
  const [loginForm, setLoginForm] = useState(valorInicialLogin);
  const [cadastroForm, setCadastroForm] = useState(valorInicialCadastro)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { register,getValues, errors } = useForm();
  
  function onChange(evento) {
    const {name, value} = evento.target;
  
    setLoginForm({...loginForm, [name]: value})
    console.log(loginForm)
  }

  function onChangeCadastro(evento) {
    const {name, value} = evento.target;
    console.log({name, value})

    setCadastroForm({...cadastroForm, [name]: value})
    console.log(cadastroForm);
  }

  function onSubmitLogin(evento) {
    evento.preventDefault();

    firebase
    .collection('usuarios')
    .where('txt_email', '==', loginForm.nome_login)
    .where('txt_senha', '==', loginForm.senha_login)
    .get().then((snapshot)=>{
      if(!snapshot.empty){
        snapshot.forEach( doc => {
          console.log(doc.data())
          localStorage.setItem('usr_secao', JSON.stringify([{nome:doc.data().txt_nome,email:doc.data().txt_email, usr_id:doc.id}]))
          alert('login realizado com sucesso');
          history.push('cesta-produto');
        })
      } else {
        alert('login invalido')
      }
    }).catch((e) =>{
      console.log(e)
    })
  }

  function onSubmitCadastro(evento){
    evento.preventDefault();
    
    firebase
    .collection('usuarios')
    .where('txt_email', '==', cadastroForm.txt_email)
    .get().then( snapshot =>{
      if(!snapshot.empty){
        console.log(snapshot)
        alert('usuario ja possui cadastro');
        return;
      } else {
        cadastrarCliente();
      }
    }).catch((e) =>{
      console.log(e)
    })
  }

  function cadastrarCliente() {
    firebase
    .collection('usuarios')
    .add({
      ...cadastroForm
    })
    .then(() => history.push("/cesta-produto"))   
  }

  return (
    <div id='areaLogin'>
      <div id='bodyLogin'>
        <Menu />
        <div className='form-login'>
          <div className='borda-interna'>
            <a className='links' id='paracadastro'></a>
            <a className='links' id='paralogin'></a>
            <div className='conteudo'>
              {/*FORMULÁRIO DE LOGIN*/}
              <div id='entrar'>
                <h1 id='tituloPag'>Login</h1>
                <form onSubmit={onSubmitLogin}>
                  <p>
                    <label htmlFor='email-login'>E-mail</label>
                    <input
                      id='email_login'
                      name='nome_login'
                      type='email'
                      placeholder='Ex.: contato@email.com.br'
                      onChange={onChange}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                  </p>

                  <p>
                    <label htmlFor='senha_login'>Senha</label>
                    <input id='senha_login' name='senha_login' onChange={onChange} required='required' type='password' placeholder='Insira sua senha' />
                  </p>

                  <p className='button-logar'>
                    <input type='submit' value='Logar' />
                  </p>

                </form>
                <p className='esqueceu_senha'>
                  <button onClick={() => setIsModalVisible(true)}>
                    Esqueci minha senha
                  </button>
                </p>
                <p className='link'>
                  Ainda não tem conta?
                  <a href='#paracadastro'>
                    Cadastre-se
                  </a>
                </p>
                {isModalVisible ? (
                  <Modal onClose={() => setIsModalVisible(false)}>
                    <div id='esqueci-senha'>
                      <p className='titulo-esqueci'>Insira seu e-mail de cadastro para recuperar sua senha</p>
                      <form>
                        <p>
                          <label htmlfor="email_login">E-mail de recuperação</label>
                          <input id='email_login' name='email-login' type='email' placeholder='Ex.: contato@seuemail.com.br' />
                          <input type='submit' value='Enviar Nova Senha' />
                        </p>
                      </form>
                    </div>
                  </Modal>
                ) : null}
              </div>
              {/*FORMULÁRIO DE CADASTRO*/}
              <div id='cadastro'>
                <h1 id='tituloPag'>Cadastro</h1>
                <div id='order-cadastro'>
                  <form onSubmit={onSubmitCadastro} noValidate>
                    <div className='cadastro_acesso'>
                      <p>Dados de Acesso</p>
                      <p>
                        <label htmlFor='nome_cad'>Seu nome completo</label>
                        <input id='nome_cad' name='txt_nome' onChange={onChangeCadastro} required='required' type='text' placeholder='Nome Completo' />
                      </p>

                      <p>
                        <label htmlFor='email_cad'>Seu e-mail</label>
                        <input
                          id='email_login'
                          name='txt_email'
                          onChange={onChangeCadastro}
                          type='email'
                          placeholder='Ex.: contato@email.com.br'
                          ref={register({
                            required: 'Digite seu email',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "Entre com um e-mail válido",
                            }
                          })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}

                      </p>

                      <p>
                        <label htmlFor="senha_login">Sua senha</label>
                        <input
                          id='senha_login'
                          name='txt_senha'
                          type='password'
                          onChange={onChangeCadastro}
                          placeholder='Sua senha'
                          ref={register({
                            required: 'Insira uma senha',
                            pattern: {
                              value: /^[A-Z0-9._%+-]{6,20}$/i,
                              message: "Entre com uma senha maior que 6 caracteres",
                            }
                          })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                      </p>

                      <p>
                        <label htmlFor="senha_login2">Insira novamente sua senha</label>
                        <input
                          id='senha_login2'
                          type='password'
                          name='password2'
                          placeholder='Repita sua senha '
                          ref={register({
                            required: 'Insira novamente sua senha',
                            pattern: {
                              validate: value => {
                                if (value === getValues()["password"]) {
                                  return true;
                                } else {
                                  return "The passwords do not match";
                                }
                              }
                            }
                          })}
                        />
                        {errors.password_dois && <p className="error">{errors.password_dois.message}</p>}
                      </p>
                    </div>
                    <div className='cadastro_dados_pessoais'>
                      <p>Dados Pessoais</p>
                      <p>
                        <label htmlFor="cpf_login">CPF</label>
                        <input
                          id='cpf_login'
                          name='txt_cpf'
                          type='text'
                          onChange={onChangeCadastro}
                          placeholder='000.000.000-00'
                          ref={register({
                            required: 'Digite seu CPF',
                            pattern: {
                              value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                              message: "Entre com CPF válido",
                            }
                          })}
                        />
                        {errors.cpf && <p className="error">{errors.cpf.message}</p>}
                      </p>
                      <p>
                        <label htmlFor="cel_cad">Celular</label>
                        <input
                          id='cel_cad'
                          name='txt_celular'
                          type='text'
                          onChange={onChangeCadastro}
                          placeholder='(xx)xxxxxxxxx'
                        />
                        {errors.celular && <p className="error">{errors.celular.message}</p>}
                      </p>
                      <p>
                        <label htmlFor="cep_cad">CEP </label>
                        <input
                          id='cep_cad'
                          name='txt_cep'
                          type='text'
                          onChange={onChangeCadastro}
                          placeholder='00000-000'
                        />
                        {errors.cep && <p className="error">{errors.cep.message}</p>}
                      </p>
                      <p>
                        <label htmlFor="end_cad">Endereço </label>
                        <input
                          id='end_cad'
                          name='txt_endereco'
                          type='text'
                          onChange={onChangeCadastro}
                          placeholder='Insira seu endereço'
                          ref={register({
                            required: 'Insira seu endereço',
                          })}
                        />
                        {errors.end && <p className="error">{errors.end.message}</p>}
                      </p>
                      <p>
                        <label htmlFor="num_cad">Número </label>
                        <input
                          id='num_cad'
                          name='txt_numero_endereco'
                          type='numero'
                          onChange={onChangeCadastro}
                          placeholder='Insira o número da sua residência'
                          ref={register({
                            required: 'Insira um número',
                          })}
                        />
                        {errors.numero && <p className="error">{errors.numero.message}</p>}
                      </p>
                      <p>
                        <input type='submit' value='Cadastrar' />
                      </p>

                      <p className='link'>
                        Já tem conta?
                      <a href='#paralogin'>
                          Ir para Login
                      </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PageLogin;

