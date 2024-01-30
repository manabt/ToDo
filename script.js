
const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const getToDos = () => {
    fetch(apiUrl + '?_limit=5') // that is gonna give us a promis
    .then(res => res.json()) // returning res.json
    .then((data) => {
        data.forEach((todo) => {
            // creating a div for the todos item and adding it to the DOM
            const div = document.createElement('div'); 
            div.appendChild(document.createTextNode(todo.title));

            if(todo.completed){ // if it's true
                div.classList.add('done');
            }
            document.getElementById('todo-list').appendChild(div);
        });
    });
}

getToDos();