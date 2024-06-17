
const form = document.querySelector('#transaction-form')
const categorySelect = document.querySelector('#category-select')
const amountInput =document.querySelector('#amount-input')
const dateInput = document.querySelector('#date-input')

form.addEventListener("submit", transactionSave);

const categories = {
  1: "Transport",
  2: "Food",
  3: "Rent",
  4: "Shopping",
  5: "Travel",
  6: "Beverage",
  7: "Salary",
}

function transactionSave(event){
  // we generate id in order to have unique identifier in local storage
  const id = (Math.random() + 1).toString(36).substring(7);
  localStorage.setItem(id, JSON.stringify({
    "amount": amountInput.value,
    "category": categories[categorySelect.value],
    "date": dateInput.value
  }));
  
  addRowToTable(id,amountInput.value, categories[categorySelect.value], dateInput.value)
  event.preventDefault();
}


function addRowToTable(id,amount, category, date){
  // Create the tr element
  const tr = document.createElement('tr')
  tr.className = 'new-expenses';

  // Create and append the first span element
  const categorySpan = document.createElement('td');
  categorySpan.textContent = category;
  tr.appendChild(categorySpan);

  // Create and append the second span element
  const amountSpan = document.createElement('td');
  amountSpan.textContent = amount;
  tr.appendChild(amountSpan);

  // Create and append the third span element
  const dateSpan = document.createElement('td');
  dateSpan.textContent = date;
  tr.appendChild(dateSpan);


  // Create and append the button element
  const deleteButton = document.createElement('button');
  const deleteButtonTd = document.createElement('td');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-btn btn-sm';
  deleteButton.textContent = 'Delete';
  // Add event listener to the button to remove the tr element
  deleteButton.addEventListener('click', function() {
    localStorage.removeItem(id);
    tr.remove();
  });

  deleteButtonTd.appendChild(deleteButton)
  tr.appendChild(deleteButtonTd);

  // Append the li element to the ul
  const table = document.querySelector('#expenses-table > tbody');
  
  table.appendChild(tr);
  form.reset();
}

for (var key in localStorage){
  console.log(localStorage.getItem(key))
  if (localStorage.getItem(key) !== null){
    const expenseObj = JSON.parse(localStorage.getItem(key));
    addRowToTable(key, expenseObj.amount, expenseObj.category, expenseObj.date)
  }
  
}

