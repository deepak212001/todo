import React, { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("") //input text
  const [todos, setTodos] = useState([]) // array which hold all task
  const [showFinish, setShowFinish] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinish(!showFinish)
  }

  const handleEdit = (e) => {
    let id = e.target.name;
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo) // input me string aa jayega

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e) => {
    let id = e.target.name;

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }


  const handleAdd = () => {
    if (todo) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      setTodo("")
      // console.log(todos)
      saveToLS()
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index)
    console.log(`id id ${id}`)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    //filter ka bhi use kar skte hai 
    saveToLS()
  }

  return (
  <>
    <div className="flex flex-col min-h-[87.8vh]">
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-3xl   bg-blue-400  md:w-[35%] ">
        <div className="p-5">
          <div className="addTask text-center mb-6 flex">
            {/* <h2 className="text-lg font-bold">Add a Task</h2> */}
            <input onChange={handleChange} value={todo} type="text" className="w-[80%] rounded-lg px-5 py-1" />
            <button onClick={handleAdd} disabled={todo.length == 0} className="bg-violet-800 hover:bg-violet-950 p-3 py-2 text-white  text-sm font-bold rounded-2xl mx-6 disabled:bg-violet-400">Add</button>
          </div>
          <input onChange={toggleFinished} type="checkbox" checked={showFinish} /> Show Finished
        </div>

        <div className="todos rounded-3xl  bg-white mt-5 p-5 w-full">
          <h2 className="text-lg font-bold my-2 text-center">Your-Task</h2>
          {todos.length === 0 && <div className="text-center">No Task to display </div>}
          {todos.map(item => {

            return (showFinish || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-[100%] transition duration-300 ease-in-out  hover:scale-105 custom-shadow my-3 p-2 text-white ">
              <div className="flex gap-x-3">
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} id="" />

                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex">
                <button name={item.id} onClick={handleEdit} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white text-sm font-bold rounded-md mx-2 max-h-7"><FaRegEdit /></button>
                <button name={item.id} onClick={handleDelete} className="bg-red-600 hover:bg-violet-950 p-3 py-1 text-white text-sm font-bold rounded-md mx-2 max-h-7"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
      <Footer />
      </>
  )
}

export default App
