import Todo from "./Todo";

const TodayTask = ({ todos, filterTodos }) => {
  const filterTodayTask = filterTodos.filter((t) => {
    if (todos) {
      return t.createdAt.slice(0, 9) === new Date().toLocaleDateString("fa-IR");
    }
  });

  return (
    <div className="w-full">
      <p className="lg:px-0 md:px-3 px-5 mt-1">یادداشت های امروز</p>
      <hr />
      <div className="flex justify-between md:flex-row flex-col flex-wrap gap-y-4 mt-9">
        {filterTodayTask.length === 0 ? (
          <div className="text-center w-full mt-4 font-semibold text-2xl">
            برای امروز یادداشتی نیست ...
          </div>
        ) : (
          filterTodayTask.map((todo, index) => (
            <Todo key={todo.id} todo={todo} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodayTask;
