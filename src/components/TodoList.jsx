import { useSelector } from "react-redux";
import TodayTask from "./TodayTask";
import Todo from "./Todo";

const TodoList = ({ search }) => {
  const { todoList, filterStatus } = useSelector((state) => state.todo);
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


  return (
    <section className="py-5">
      {/* today task */}
      <TodayTask filterTodos={filterTodos} todos={todoList} />
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
