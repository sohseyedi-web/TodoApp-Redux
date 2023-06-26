import { useState } from "react";
import * as RiIcon from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeTodo, updateCompleteTodo } from "../store/reducer";
import Modal from "./common/Modal";
import { motion } from "framer-motion";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Todo = ({ todo, index }) => {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  const [active, setActive] = useState(null);

  const toggleAccordion = (index) => {
    if (active === index) return setActive(null);
    setActive(index);
  };

  const completedTodo = () => {
    setActive(null);
    setCheck(!check);
    dispatch(
      updateCompleteTodo({ ...todo, status: check ? "finish" : "continue" })
    );
  };

  return (
    <>
      <motion.div
        variants={child}
        key={todo.id}
        className={`${active === index ? "h-[130px]" : "h-[55px]"} ${
          todo.status === "finish" ? "opacity-50 " : "opacity-100"
        }  relative transition-all duration-300 md:w-[47%] w-[90%] md:mx-0 mx-auto bg-[#fff] dark:bg-[#202020] rounded shadow-md px-2 py-3 flex flex-col border border-gray-200 dark:border-gray-900`}
      >
        <div className="flex items-center justify-between w-full">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <span>
              <RiIcon.RiArrowDropDownLine size={28} />
            </span>
            <h5 className={`text-lg font-semibold m-0`}>
              {todo.content.title}
            </h5>
          </div>
          <div className="flex items-center gap-x-2 ">
            <span
              className="text-red-500 cursor-pointer z-30"
              onClick={() => dispatch(removeTodo(todo))}
            >
              <RiIcon.RiDeleteBin5Fill size={26} />
            </span>
            <span
              className="text-green-500 cursor-pointer z-30"
              onClick={completedTodo}
            >
              <RiIcon.RiCheckLine size={26} />
            </span>
            <span
              className="text-yellow-500 cursor-pointer z-30"
              onClick={() => setOpen(!open)}
            >
              <RiIcon.RiEdit2Line size={26} />
            </span>
          </div>
        </div>
        <div className="px-2 mt-3 overflow-x-auto whitespace-nowrap overflow-y-hidden">
          <p className="mb-3">توضیحات : {todo.content.description}</p>
          <div className="flex items-center justify-between my-1">
            <span>تاریخ : {todo.createdAt}</span>
          </div>
        </div>
      </motion.div>
      {open && (
        <Modal setActive={setOpen} type="update" todo={todo} active={open} />
      )}
    </>
  );
};

export default Todo;
