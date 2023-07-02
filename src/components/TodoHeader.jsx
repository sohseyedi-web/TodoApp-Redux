import * as RiIcon from "react-icons/ri";
import Modal from "./common/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../store/reducer";

const TodoHeader = ({ search, setSearch }) => {
  const [active, setActive] = useState(false);
  const { todoList, filterStatus } = useSelector((state) => state.todo);
  const [status, setStatus] = useState(filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    const value = e.target.value;
    setStatus(value);
    dispatch(updateStatus(value));
  };

  return (
    <div className="flex items-center justify-between md:flex-row flex-col lg:px-0 md:px-3 px-4">
      <div className="flex md:w-auto w-[95%] items-center justify-between md:justify-start">
        <button
          onClick={() => setActive(!active)}
          className="ml-10 transition-all duration-300 scale-100 hover:scale-105 flex items-center rounded shadow-sm text-white justify-center bg-purple-600 dark:bg-purple-500  w-[140px] h-[40px]"
        >
          <RiIcon.RiAddLine size={25} />
          اضافه کردن
        </button>
        {todoList.length !== 0 && (
          <select
            value={status}
            onChange={(e) => updateFilter(e)}
            className="w-[200px] h-[40px] rounded shadow cursor-pointer outline-none px-1 dark:shadow-md dark:bg-[#202020] bg-gray-100 border dark:border-none"
          >
            <option value="all">همه</option>
            <option value="finish">تکمیل</option>
            <option value="continue">در جریان</option>
          </select>
        )}
        {active && <Modal setActive={setActive} type="add" />}
      </div>
      {todoList.length !== 0 && (
        <form className="md:mr-5 my-5 w-[95%] relative md:w-[400px] text-black border shadow rounded">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[40px] rounded outline-none pr-12 text-lg bg-gray-100"
          />
          <RiIcon.RiSearch2Line size={28} className="absolute top-1 right-2 " />
        </form>
      )}
    </div>
  );
};

export default TodoHeader;
