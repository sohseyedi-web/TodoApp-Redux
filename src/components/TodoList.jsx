import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";

const TodoList = ({ search }) => {
  const { todoList, filterStatus } = useSelector((state) => state.todo);
  const [todayTask, setTodayTask] = useState([]);
  // filter search item
  const searchTodoList = todoList.filter((todo) =>
    todo.content.title.toLowerCase().includes(search.toLowerCase())
  );
  const sortTodos = [...searchTodoList];

  sortTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // filter allTodo With status{all,completed,not completed}
  const filterTodos = sortTodos.filter((item) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return item.status === filterStatus;
    }
  });

  // filter todayTask
  useEffect(() => {
    if (todoList) {
      const filterToday = filterTodos.filter(
        (t) =>
          t.createdAt.slice(0, 9) === new Date().toLocaleDateString("fa-IR")
      );
      setTodayTask(filterToday);
    }
  }, [todoList]);

  return (
    <section className="py-5">
      {/* today task */}
      <div className="w-full">
        <p className="lg:px-0 md:px-3 px-5 mt-1">یادداشت های امروز</p>
        <hr />
        <div className="flex justify-between md:flex-row flex-col flex-wrap gap-y-4 mt-9">
          {todayTask.length === 0 ? (
            <div className="text-center w-full mt-4 font-semibold text-2xl">
              برای امروز یادداشتی نیست ...
            </div>
          ) : (
            todayTask.map((todo, index) => (
              <Todo key={todo.id} todo={todo} index={index} />
            ))
          )}
        </div>
      </div>
      {/* all tasks */}
      <div className="w-full">
        <p className="lg:px-0 md:px-3 px-5 mt-5">همه یادداشت ها</p>
        <hr />
        <div className="flex justify-between md:flex-row flex-col flex-wrap gap-y-4 mt-9">
          {filterTodos.length === 0 ? (
            <div className="text-center w-full mt-4 font-semibold text-2xl">
              یادداشتی وجود ندارد...
            </div>
          ) : (
            filterTodos.map((todo, index) => (
              <Todo key={todo.id} todo={todo} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoList;
