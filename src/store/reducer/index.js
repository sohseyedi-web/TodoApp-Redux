import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  filterStatus: "all",
  todoList: localStorage.getItem("todoList")
    ? JSON.parse(localStorage.getItem("todoList"))
    : [],
};

export const TodoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: uuidv4(),
        content: action.payload,
        status: "continue",
        createdAt: new Date().toLocaleString("fa-IR"),
      };
      const addItem = [...state.todoList, newTodo];
      toast.success("یادداشت اضافه شد");
      localStorage.setItem("todoList", JSON.stringify(addItem));
      return { ...state, todoList: addItem };
    },
    removeTodo(state, action) {
      const todos = [...state.todoList];
      const filterTodo = todos.filter((t) => t.id !== action.payload.id);
      toast.error("یادداشت حذف شد");
      localStorage.setItem("todoList", JSON.stringify(filterTodo));
      return { ...state, todoList: filterTodo };
    },
    updateStatus(state, action) {
      state.filterStatus = action.payload;
    },
    updateCompleteTodo(state, action) {
      const updateTodo = [...state.todoList];
      const updateTodoIndex = updateTodo.findIndex(
        (i) => i.id === action.payload.id
      );
      const newItem = { ...updateTodo[updateTodoIndex] };
      newItem.status = action.payload.status;
      updateTodo[updateTodoIndex] = newItem;
      localStorage.setItem("todoList", JSON.stringify(updateTodo));
      return { ...state, todoList: updateTodo };
    },
    updateTodo(state, action) {
      const editTodo = [...state.todoList];
      editTodo.forEach((item) => {
        if (item.id === action.payload.id) {
          item.content = action.payload.content;
        }
      });
      localStorage.setItem("todoList", JSON.stringify(editTodo));
      state.todoList = [...editTodo];
    },
  },
});

export const {
  addTodo,
  removeTodo,
  updateStatus,
  updateCompleteTodo,
  updateTodo,
} = TodoSlice.actions;
export default TodoSlice.reducer;
