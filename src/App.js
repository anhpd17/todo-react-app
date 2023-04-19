import { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import Task from "./components/Task/Task";

function App() {
    // task state
    const [tasks, setTasks] = useState([]);

    // LOCAL STORAGE
    useEffect(() => {
        if (tasks.length === 0) return;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        setTasks(tasks || []);
    }, []);

    // func add task
    const addTask = (name) => {
        setTasks((prev) => {
            return [...prev, { name: name, done: false }];
        });
    };
    // func remove task
    const removeTask = (indexToRemove) => {
        setTasks((prev) => {
            return prev.filter((taskObject, index) => index !== indexToRemove);
        });
    };
    // func rename task
    const renameTask = (index, newname) => {
        setTasks((prev) => {
            const newTasks = [...prev];
            newTasks[index].name = newname;
            return newTasks;
        });
    };
    // func updateTaskDone
    const updateTaskDone = (taskIndex, newDone) => {
        setTasks((prev) => {
            const newTasks = [...prev];
            newTasks[taskIndex].done = newDone;
            return newTasks;
        });
    };
    const numberComplete = tasks.filter((t) => t.done).length;
    const numberTotal = tasks.length;
    function getMessage() {
        const percentage = (numberComplete / numberTotal) * 100;
        if (percentage === 0) {
            return "Try to do at least one! 🙏";
        }
        if (percentage === 100) {
            return "Nice job for today! 🏝";
        }
        return "Keep it going 💪🏻";
    }
    return (
        <main className="App">
            <h1>0/1 Completed</h1>
            <h2>{getMessage()}</h2>
            <TaskForm onAdd={addTask} />
            {tasks.map((task, index) => {
                return (
                    <Task
                        {...task}
                        onRename={(newname) => renameTask(index, newname)}
                        onTrash={() => removeTask(index)}
                        onToggle={(done) => updateTaskDone(index, done)}
                    />
                );
            })}
        </main>
    );
}

export default App;
