"use client"
import React, { useState } from 'react';
import Link from "next/link";
import '@/ui/assets/css/geral/style-header-footer.css'

const LoginModal: React.FC = () => {
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalCadastroOpen, setModalCadastroOpen] = useState(false);
  const [modalCadastroConsumidorOpen, setModalCadastroConsumidorOpen] = useState(false);
  const [modalCadastroRestauranteOpen, setModalCadastroRestauranteOpen] = useState(false);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, closeModal: () => void) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Modal de Login
      {modalLoginOpen && (
        <div
          id="modal"
          className="modal"
          style={{ display: "flex" }}
          onClick={(event) => handleOutsideClick(event, () => setModalLoginOpen(false))}
        >
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalLoginOpen(false)}>&times;</span>
            <h2>Entrar na conta</h2>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Senha" />
            <div className="lembrar-me">
              <input type="checkbox" id="lembrar-me" />
              <label htmlFor="lembrar-me">Lembrar-me</label>
            </div>
            <button type="button">
              <a id="link-entrar" href="indexLogado.html">Entrar</a>
            </button>
            <h3 id="senhaEsquecida">
              <a href="...">Esqueceu a senha?</a>
            </h3>
            <hr />
            <button id="criarConta" onClick={() => {
              setModalLoginOpen(false);
              setModalCadastroOpen(true);
            }}>Criar Nova conta</button>
          </div>
        </div>
      )}

      {modalCadastroOpen && (
        <div
          id="modal-cadastro"
          className="modal"
          style={{ display: "flex" }}
          onClick={(event) => handleOutsideClick(event, () => setModalCadastroOpen(false))}
        >
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalCadastroOpen(false)}>&times;</span>
            <h2>Cadastro</h2>
            <div>
              <input type="radio" id="cadastroConsumidor" name="cadastro" />
              <label htmlFor="cadastroConsumidor">Consumidor</label>
            </div>
            <div>
              <input type="radio" id="cadastroEmpresa" name="cadastro" />
              <label htmlFor="cadastroEmpresa">Empresa</label>
            </div>
            <button id="cadastrarContinuar" onClick={() => {
              const consumidorChecked = (document.getElementById('cadastroConsumidor') as HTMLInputElement).checked;
              const empresaChecked = (document.getElementById('cadastroEmpresa') as HTMLInputElement).checked;

              if (consumidorChecked) {
                setModalCadastroOpen(false);
                setModalCadastroConsumidorOpen(true);
              } else if (empresaChecked) {
                setModalCadastroOpen(false);
                setModalCadastroRestauranteOpen(true);
              } else {
                alert('Por favor, marque uma das opções antes de continuar.');
              }
            }}>Continuar</button>
          </div>
        </div>
      )}

      {modalCadastroConsumidorOpen && (
        <div
          id="modal-cadastro-consumidor"
          className="modal"
          style={{ display: "flex" }}
          onClick={(event) => handleOutsideClick(event, () => setModalCadastroConsumidorOpen(false))}
        >
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalCadastroConsumidorOpen(false)}>&times;</span>
            <h2>Cadastro Consumidor</h2>
            <button onClick={() => {
              window.location.href = '../../templates/usuarioCliente/indexLogado.html';
            }}>Finalizar Cadastro</button>
          </div>
        </div>
      )}

      {modalCadastroRestauranteOpen && (
        <div
          id="modal-cadastro-restaurante"
          className="modal"
          style={{ display: "flex" }}
          onClick={(event) => handleOutsideClick(event, () => setModalCadastroRestauranteOpen(false))}
        >
          <div className="modal-content">
            <span className="close-btn" onClick={() => setModalCadastroRestauranteOpen(false)}>&times;</span>
            <h2>Cadastro Restaurante</h2>
            <button onClick={() => {
              window.location.href = '../../templates/usuarioRestaurante/perfilEstabelecimento.html';
            }}>Finalizar Cadastro</button>
          </div>
        </div>
      )} */}

      {/* Botões para abrir modais */}<Link
        href="/auth/login"
        className="button" // Aplica a classe 'button' aqui
        style={{ marginLeft: "40px" }}
      >
        Entrar
      </Link>
    </>
  );
};

export default LoginModal;
