# 🧩 Analisador Sintático LL(1)

Este projeto implementa um analisador sintático LL(1) baseado em pilha e tabela de parsing, permitindo visualizar o processo de derivação passo a passo ou executar tudo de uma vez.

A interface permite:
* Inserir uma palavra ✏️
* Gerar uma sentença dinamicamente através da gramática, escolhendo a sequência de passos 📝
* Visualizar os conjuntos First & Follow
* Visualizar a tabela de Parsing
* Visualizar a evolução da pilha e da entrada 🧱➡️📥
* Ver qual regra gramatical foi aplicada a cada passo 🔁
* Identificar se a palavra é aceita ✅ ou rejeitada ❌
* Limpar a execução existente para testar quantas sentenças desejar 📚

## 🧠 Como funciona o analisador

O algoritmo segue estes passos:
1.  Inicializa a pilha com `[$, S]`
2.  Adiciona a cadeia de entrada e adiciona `$` ao final
3.  Compara o topo da pilha com o topo da entrada:
    * Se forem iguais → consome ambos (lê o símbolo) ✔️
    * Se o topo é um não-terminal → usa a tabela de parsing para substituição 🔄
    * Se não houver regra → ocorre erro ❌
4.  Se ambos chegarem ao `$` ao mesmo tempo → cadeia aceita 🎉


## 🎮 Modos de Execução

* **Step By Step** (um clique = um passo) ⏱️
* **Execução Completa** (resolve automaticamente até aceitar ou errar) ⚡

## ✨ Como utilizar

É possível acessar o analisador através do link **https://nathaliepatzer.github.io/SyntaxAnalyzer/**.

Se desejar, você também pode clonar o repositório e testar localmente 😊

---

## 👩🏼‍💻 Para saber mais

### 🧩 O que é uma Gramática LL(1)?

Uma gramática LL(1) é um tipo de gramática livre de contexto que pode ser analisada usando um analisador preditivo (sem necessidade de backtracking).

* O primeiro **L** (Left-to-right) significa ler da esquerda para a direita da entrada.
* O segundo **L** (Leftmost derivation) significa produzir a derivação mais à esquerda.
* O **(1)** indica que o parser olha apenas 1 símbolo de entrada por vez para decidir qual regra usar.

➡️ Ou seja, ela precisa ser não-ambígua e determinística, permitindo prever a produção correta só olhando o próximo símbolo.

### 🔍 First

O conjunto **FIRST(X)** representa quais símbolos terminais podem aparecer primeiro em alguma derivação de X (onde X pode ser um terminal, não terminal ou sequência).

### 🎯 Follow

O conjunto **FOLLOW(X)** representa quais símbolos terminais podem aparecer imediatamente depois de X em alguma sentença válida gerada pela gramática.

### 📊 Para que serve a Tabela de Parsing?

A tabela de parsing, construída através dos conjuntos First e Follow é uma matriz que guia o analisador sintático. Ela diz qual regra da gramática deve ser aplicada dependendo:

* Do símbolo no topo da pilha
* Do próximo símbolo da entrada

Ela funciona como o **GPS do parser** 🧭

Sem ela, o analisador teria que tentar várias regras até encontrar a certa (backtracking).
Com ela → ele escolhe diretamente a produção correta ✔️

---

💬 Qualquer dúvida, sugestão ou melhoria é super bem-vinda — é só entrar em contato!

***🤖 May the parse be with you***