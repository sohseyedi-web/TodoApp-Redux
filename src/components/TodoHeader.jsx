import * as RiIcon from "react-icons/ri";
import Modal from "./common/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus } from "../store/reducer";

const TodoHeader = () => {
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
    <div className="flex items-center justify-between sm:justify-start lg:px-0 md:px-3 px-4">
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
          className="w-[200px] h-[40px] rounded shadow-sm cursor-pointer outline-none px-1 dark:shadow-md dark:bg-[#202020]"
        >
          <option value="all">همه</option>
          <option value="finish">تکمیل</option>
          <option value="continue">در جریان</option>
        </select>
      )}
      {active && <Modal setActive={setActive} type="add" />}
    </div>
  );
};

export default TodoHeader;
