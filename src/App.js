import { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";

import "./styles.css";

//Add task
//Remove(delete) task
//check the task

const todoReducer = (state, action) => {
  switch (action.type) {
    case "Add_ToDo":
      console.log(action.payload);
      return action.payload.text !== "" ? [...state, action.payload] : state;

    case "Remove_ToDo":
      return state.filter((e) => e.id !== action.payload.id);

    case "Cross_ToDo":
      return state.map((e) =>
        e.id === action.payload.id ? { ...e, isDone: !e.isDone } : e
      );
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [taskName, setTaskName] = useState("");
  console.log(state);
  return (
    <div className="App">
      <h1>Your ToDo App! 🤠</h1>
      <h4>Enter your task here. 📝</h4>
      <input
        type="text"
        value={taskName}
        className="input--box"
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button
        onClick={() =>
          dispatch(
            {
              type: "Add_ToDo",
              payload: { text: taskName, isDone: false, id: uuid() }
            },
            setTaskName("")
          )
        }
        style={{ display: "block", marginTop: "1rem" }}
      >
        Add
      </button>
      <div>
        <h3>
          Tasks will appear here <span>👇</span>
        </h3>
        {state.length > 0 ? (
          <ul>
            {state.map((e, i) => (
              <li key={i} className="taskItem">
                <h2
                  style={{
                    color: e.isDone ? "green" : "",
                    textDecoration: e.isDone ? "line-through" : ""
                  }}
                >
                  {e.text}
                </h2>
                <button
                  onClick={() => dispatch({ type: "Cross_ToDo", payload: e })}
                >
                  Cross
                </button>
                <button
                  onClick={() => dispatch({ type: "Remove_ToDo", payload: e })}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <h3 style={{ color: "red" }}>
            Write in the textbox! <span>✍</span>
          </h3>
        )}
      </div>
    </div>
  );
}
