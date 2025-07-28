import React, { useState } from 'react';
import Notes from './note/IndexNote';
import Tudo from './ToDo/IndexToDo';
import Team from './TeamTasks/IndexTeam';
import './Style.Usuario.css';

function Usuario() {
    // State to manage tasks
    const [todos, setTodos] = useState([]); // Each todo could be { id: number, text: string, completed: boolean }

    // State to manage notes
    const [notes, setNotes] = useState([]); // Each note could be { id: number, text: string }

    // Function to add a new todo
    const addTodo = (todoText) => {
        if (todoText.trim() === '') return;
        const newTodo = {
            id: Date.now(), // Simple unique ID
            text: todoText,
            completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    // Function to add a new note
    const addNote = (noteText) => {
        if (noteText.trim() === '') return;
        const newNote = {
            id: Date.now(), // Simple unique ID
            text: noteText,
        };
        setNotes((prevNotes) => [...prevNotes, newNote]);
    };

    // You might also want functions to toggle todo completion, delete todos/notes, etc.
    // For brevity, we'll focus on adding for now.

    return (
        <div className="usuario-container">
            {/* Pass todos and the addTodo function to Tudo */}
            <Tudo todos={todos} addTodo={addTodo} />

            {/* Pass notes and the addNote function to Notes */}
            <Notes notes={notes} addNote={addNote} />

            {/* Team component remains unchanged for this example */}
            <Team />
        </div>
    );
}

export default Usuario;