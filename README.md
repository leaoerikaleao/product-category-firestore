<h1>Produto e Categoria com Firestore</h1> 

<h2>Sobre o Firestore</h2>
<ul>
    <li>Plataforma Firebase do Google</li>
    <li>Plano gratuito generoso</li>
    <li>Indicado para estrutura serveless</li>
    <li>Criação de índices automáticos para buscas mais rápidas</li>
</ul>

<h2>Modelagem</h2>
<ul>
    <li>Organização lógica em collections</li>
    <li>Em colections existem documents, e documents pode existir collections</li>
</ul>

<h2>Banco de dados</h2>
<ul>
    <li>categories - (collection)</li>
        <ul>
            <li>categoty - string - (document)</li>
        </ul>
    <li>products - (collection)</li>
    <ul>
        <li>product - string - (document)</li>
        <li>price - number - (documents)</li>
        <li>images - (collection/document)</li>
            <ul>
                <li>description - string - (document)</li>
                <li>url  - string - (document)</li>
            </ul>
        <li>categories - (collection/document)</li>
            <ul>
                <li>category - string - (document)</li>
            </ul>
        <li>product - string - (document)</li>
    </ul>
</ul>

<h2> Desenvolvido com:</h2>
<a href="https://www.javascript.com/" target="_blank">
    <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
</a>

<a href="https://firebase.google.com/" target="_blank">
    <img alt="Firebase - Firestore" src="https://img.shields.io/badge/firebase-%23039BE5.svg?&style=for-the-badge&logo=firebase"/>
</a>

<h2>Licença:</h2>
<img alt="Licença MIT" src="https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge" />


