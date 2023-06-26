import { useSelector } from "react-redux";
import Todo from "./Todo";

const TodoList = () => {
  const { todoList, filterStatus } = useSelector((state) => state.todo);
  const sortTodos = [...todoList];

  sortTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filterTodos = sortTodos.filter((item) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return item.status === filterStatus;
    }
  });

  return (
    <section className="flex justify-between md:flex-row flex-col flex-wrap gap-y-4 mt-9">
      {filterTodos.length === 0 ? (
        <div className="text-center w-full mt-10 font-semibold text-2xl text-[#252525]">
          یادداشتی وجود ندارد...
        </div>
      ) : (
        filterTodos.map((todo, index) => (
          <Todo key={todo.id} todo={todo} index={index} />
        ))
      )}
    </section>
  );
};

export default TodoList;
