const button = document.querySelector('button')
const form = document.querySelector('form')
const divTransactions = document.querySelector('.all-transction')
const articleBalances = document.querySelector('article.balances')
const divFigureSon = document.querySelector('div.figure-son')

const displayTatal = document.querySelector('#display-balance aside h2')
const displayIcome = document.querySelector('.income');
const displayExpense = document.querySelector('.expense');
console.log(displayExpense)

 //ARRAY, CONTAIN ALL TRANSACTION VALUE
const localStorageTransactions = JSON.parse(localStorage.getItem('transaction'))

let transaction = localStorage.getItem('transaction') !== null ? localStorageTransactions : []



const values = ['transactionName','transactionValue']

form.addEventListener('submit', function(event){
    event.preventDefault()
    const isEmpty = values.find(function(value){
      if(event.target[value].value == ""){
        event.target[value].classList.add('empty')
        return true
      }else{
        event.target[value].classList.remove('empty')
        return false;

      }
    
    })

    const generateId = () => Math.round(Math.random() * 1000)

    if(isEmpty){
      return
    }

    const data = {
      id:generateId(),
      name:event.target[0].value, 
      amount:Number(event.target[1].value)
    }

    transaction.push(data)

    updateLocalStorage()
    init()

})



const addTransactionIntoDOM = transaction =>{
  const operator = transaction.amount < 0 ? '-':'+';
  const CSSClass = transaction.amount < 0 ? 'negative':'positive';
  const CSSClass2 = transaction.amount < 0 ? 'negative-trans':'';
  const amountWithoutOperator =Math.abs(transaction.amount)

  //Create HTML element
  const art = document.createElement('article')
  //Seting a class attribute for our element
  art.setAttribute('class', "balances "+`${CSSClass}` )

  //Insert html markup into article
  art.innerHTML = `
        <p class="delete-button transition" onClick="removeTransactionId(${transaction.id})">x</p>
        <p class="transaction-name">
            ${transaction.name}
        </p> 
        <p class="transaction-value">
            ${operator} ${amountWithoutOperator} Kz
        </p>
 
        <figure >
            <div class="figure-son transition `+CSSClass2+`"></div>
        </figure>
  `

  //Appende article into the divTransactions to appear in our HTML document
  divTransactions.prepend( art)
}

function removeTransactionId(id){
    transaction = transaction.filter(value=>value.id != id)
    updateLocalStorage()
    init()
}


function updateBalanceValue(){
  //bring all amount value in transaction
  const transactionAmount = transaction
    .map(transans => transans.amount)
  //bring all transaction amount where amount is > 0
  const income = transactionAmount
    .filter(value => value > 0)
    .reduce((accumulator,value)=>accumulator+value,0)
    .toFixed(2)
  //bring to me the average of amount
  const total = transactionAmount
    .reduce((accumulator, value)=>accumulator + value,0)
    .toFixed(2)
  //Total of expense 
  const expense = Math.abs(transactionAmount
    .filter(value => value < 0)
    .reduce((accumulator, trans)=> accumulator + trans, 0)
    .toFixed(2))

    displayTatal.textContent = `${total} Kz`;
    displayIcome.textContent = `${income} Kz`;
    displayExpense.textContent = `${expense} Kz`;
}

function init(){
  divTransactions.innerHTML = ''
    transaction.forEach(addTransactionIntoDOM);
    updateBalanceValue()
}

function updateLocalStorage(){
  localStorage.setItem('transaction', JSON.stringify(transaction))
}


init()




