import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/paginas/style-pagamento.css';


export default function Card(){
    return(
        <>
            <div className="header container">
    <div className="container">
        <div>
            <img src="/imagens/logoMenuSuperior.png" alt="" />
        </div>
        <div>
            <ul>
                <li><a href="../indexLogado.html">Início</a></li>
                <li><a href="../hubsLogado.html">Hubs</a></li>
                <li><a href="../sobreLogado.html">Sobre</a></li>
                <li><a href="../contatosLogado.html">Contatos</a></li>
            </ul>
        </div>
    </div>
    <div className="user">
        <div className="loginIcons"><a href="#item2"><img src="/imagens/iconAlarm.png" alt="Notificações" /></a></div>
        <div className="loginIcons"><a href="carrinho.html"><img src="/imagens/iconCarrinho.png" alt="Carrinho" /></a></div>
        <div className="menu-container">
            <img src="/imagens/photoUser.png" alt="Foto de Perfil" className="menu-trigger" />
            <div className="menu" id="menu">
                <a href="perfilCliente.html">Perfil</a>
                <a href="pedidosCliente.html">Meus pedidos</a>
                <a href="#item3">Sair</a>
            </div>
        </div>
        <span>João Domingus</span>
    </div>
</div>

<div className="main" style={{backgroundImage: 'none',
            paddingTop: '30px',
            paddingBottom: '30px'}}>
    <div className="paymentContainer">
        <div className="payment-box">
            <h1>Pagamento por cartão de crédito</h1>
            <div className="total-section">
                <span>Total:</span>
                <span className="total-value">R$ 150,00</span>
            </div>
            <div className="dropdown-section">
                <label htmlFor="cardDropdown">Selecione um cartão:</label>
                <select id="cardDropdown">
                    <option value="" disabled selected>Selecione</option>
                    <option value="visa">Visa - **** 1234</option>
                    <option value="mastercard">MasterCard - **** 5678</option>
                    <option value="amex">Amex - **** 9012</option>
                </select>
            </div>
            <button id="pagar">Pagar</button>
            <div id="confirmationMessage" className="hidden">
                <p>Pagamento processado com sucesso!</p>
            </div>
        </div>
    </div>
</div>

<div className="footer container">
    <div className="logo">
        <img src="/imagens/logoInferior.png" alt="" />
    </div>
    <div className="container">
        <div>
            <ul>
                <li className="footer-header">Links:</li>
                <li><img src="/imagens/logoInstagram.png" alt="" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
                <li><img src="/imagens/logoPinterest.png" alt="" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="footer-header">Contatos:</li>
                <li><img src="/imagens/pinLocation.png" alt="" /><span>3º piso do Instituto Metrópole Digital</span></li>
                <li><img src="/imagens/pinPhone.png" alt="" /><span>(84) 9 8888-8888</span></li>
                <li><img src="/imagens/pinEmail.png" alt="" /><span>hubsfood@gmail.com</span></li>
                <li><img src="/imagens/pinHorario.png" alt="" /><span>24h</span></li>
            </ul>
        </div>
    </div>
</div>

<div className="end">
    <span>Copyright @ 2024 All rights reserved</span>
</div>

        </>
    );
}