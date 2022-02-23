/*
  01

  - Exiba no console um boolean indicando se o caractere ':' existe na string 
    abaixo.
*/

const message = 'Próxima etapa: 10'

console.log(message.includes(':'))

/*
  02

  - Exiba no console um boolean indicando se o item '635' existe no array 
    abaixo.
*/

const numbers = [979, 2673, 41, 77, 276, 554, 399, 385, 65, 726, 635, 833, 462]

console.log(numbers.includes(635))

/*
  A partir daqui, vamos treinar nossas skills de refatoração.

  Antes de iniciar o refactoring abaixo, por precaução, versione (ou faça uma 
  cópia do) seu todo-list atual para que seja possível mais tarde voltar ao 
  estado em que ele está agora, se necessário.
*/

/*
  03

  - Refatore a implementação da remoção do to-do (li) da tela;
  - Tente implementar essa remoção sem "navegar pelo DOM". Ou seja, sem usar 
    propriedades como a parentElement.
    
    Por que? 

    Se futuramente a marcação HTML da aplicação mudar, se o parentElement mudar, 
    o código que foi implementado não funcionará.
    
    Dica: pesquise por dataset e atributos data.
*/

/*
  04

  Algumas sugestões de refactoring
  
  - Isole em funções de responsabilidade única:
    - O código que adiciona os to-dos;
    - O código que filtra e adiciona as classes CSS nos to-dos.
*/

const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputSearchTodo = document.querySelector('.form-search input')

const targElement = element => element.target

const generatorHTMLElemntItemListGroup = (HTMLElemnt, stringValue) => {
  const htmlElementString = 
  `
  <${HTMLElemnt} class="list-group-item d-flex justify-content-between align-items-center">
      <span>${stringValue}</span>
      <i class="far fa-trash-alt delete"></i>
  </${HTMLElemnt}>
  `
  return htmlElementString
}

//ADICIONA UM ITEM A LISTA
formAddTodo.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = targElement(event).add.value.trim()

    if(inputValue){
        todosContainer.innerHTML += generatorHTMLElemntItemListGroup('li', inputValue)
        targElement(event).reset()
    }
})

//REMOVE UM ITEM DA LISTA
todosContainer.addEventListener('click', event => {
    const clickedElement = targElement(event)
    const clickedElemtClassList = Array.from(clickedElement.classList)

    if(clickedElemtClassList.includes('delete')){
        clickedElement.parentElement.remove()
    }
})

//PROCURA POR UM ITEM DA LISTA
//FUNÇÕES
const hiddenItemGroupList = (object, classElement) => {
  const { todosChildren, todosText } = object
  Array.from(todosChildren)
      .filter(todo => !todosText(todo, classElement))
      .forEach(todo => {
          todo.classList.remove('d-flex')
          todo.classList.add('hidden')
  })
}
const revealItemGroupList = (object, classElement) => {
  const { todosChildren, todosText } = object
  Array.from(todosChildren)
      .filter(todo => todosText(todo, classElement))
      .forEach(todo => {
          todo.classList.remove('hidden')
          todo.classList.add('d-flex')
  })
}

//OBJETOS
const hiddenInformations = {
  todosChildren: todosContainer.children, 
  todosText: (todo, classElement) => {todo.textContent
    .toLowerCase()
    .includes(classElement)}
}
const revealInformations = {
  todosChildren: todosContainer.children, 
  todosText: (todo, classElement) => {todo.textContent
    .toLowerCase()
    .includes(classElement)}
}

inputSearchTodo.addEventListener('input', event => {
    const inputValue = targElement(event).value.trim().toLowerCase()

    hiddenItemGroupList(hiddenInformations, inputValue)
    // revealItemGroupList(revealInformations, inputValue)
    
    Array.from(todosContainer.children)
        .filter(todo => todo.textContent.toLowerCase().includes(inputValue))
        .forEach(todo => {
            todo.classList.remove('hidden')
            todo.classList.add('d-flex')
    })
})