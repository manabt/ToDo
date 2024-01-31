
const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const getToDos = () => {
    fetch(apiUrl + '?_limit=10') // that is gonna give us a promis
    .then(res => res.json()) // returning res.json
    .then((data) => {
        data.forEach((todo) => addToDoToDOM(todo)); // todo: a custom name, for each todo in the data
    }
)};

const addToDoToDOM = (todo) => {
        // creating a div for the todos item and adding it to the DOM
        const div = document.createElement('div'); 
        div.classList.add('todo');
        div.appendChild(document.createTextNode(todo.title));
        div.setAttribute('data-id', todo.id);
        
        if(todo.completed){ // if it's true
            div.classList.add('done');
        }
        document.getElementById('todo-list').appendChild(div);
}

const createToDO = (e) => {
    e.preventDefault();

    const newToDO = {
        title: e.target.firstElementChild.value, // title is gonna be whatever that is typed in the textbox
        completed: false
    }
    fetch(apiUrl, {
        method: 'Post',
        body: JSON.stringify(newToDO),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((data) => addToDoToDOM(data))
};

const toggleCompleted = (e) => {
    if(e.target.classList.contains('todo')){
        e.target.classList.toggle('done');
    }
                                    // checking if it has the class of done
    updateToDo(e.target.dataset.id, e.target.classList.contains('done'));
};

// Making a Put Request by 1 click
const updateToDo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {  // for put request you need to include the id
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type': 'application/json'
        },
    })  
    // .then(res => res.json()) // making the response in json format
    // .then(data => console.log(data));
};
// Making a Delete Request by double click
const deleteToDo = (e) => {
    if(e.target.classList.contains('todo')){
        const id = e.target.dataset.id;
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
            // we don't need to pass anything here, because there's no data to return
        .then(() => e.target.remove())
    }
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getToDos);
    document.querySelector('#todo-form').addEventListener('submit', createToDO);
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted);
    document.querySelector('#todo-list').addEventListener('dblclick', deleteToDo);
}

init();