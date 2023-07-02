import TodoList from "./components/TodoList";
import TodoHeader from "./components/TodoHeader";
import * as RiIcon from "react-icons/ri";
import { useEffect, useState } from "react";

function App() {
  const [dark, setDark] = useState("light");
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDark("dark");
    } else {
      setDark("light");
    }
  }, []);

  useEffect(() => {
    if (dark === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  const handleThemeSwitch = () => {
    setDark(dark === "dark" ? "light" : "dark");
  };

  const [search , setSearch] = useState("")

  return (
    <section className="max-w-4xl container mx-auto pt-10">
      <TodoHeader search={search} setSearch={setSearch}/>
      <TodoList search={search} setSearch={setSearch}/>
      <div
        onClick={handleThemeSwitch}
        className="fixed left-4 bottom-4 cursor-pointer transition-all duration-300 hover:scale-105 scale-100"
      >
        {dark === "dark" ? (
          <RiIcon.RiSunLine size={28} />
        ) : (
          <RiIcon.RiMoonLine size={28} />
        )}
      </div>
    </section>
  );
}

export default App;
