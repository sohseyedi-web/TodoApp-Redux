import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../store/reducer";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const initialValues = {
  title: "",
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("مقداری وارد نشده است"),
  description: Yup.string().required("مقداری وارد نشده است"),
});

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const Modal = ({ setActive, type, todo, active }) => {
  const [formData, setFormData] = useState(null);
  const { content } = todo || {};
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    if (type === "add") {
      dispatch(addTodo(values));
      setActive(false);
    } else {
      dispatch(updateTodo({ ...todo, content: values }));
      setActive(false);
      toast.success("ویرایش شد");
    }
  };

  const formik = useFormik({
    initialValues: formData || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (type === "update" && todo) {
      setFormData(todo.content);
    } else {
      setFormData("");
    }
  }, [type, todo, active]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 z-40 left-0 bg-gray-950 bg-opacity-50 overflow-y-auto h-full w-full transition-all duration-300"
      >
        <motion.form
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          onSubmit={formik.handleSubmit}
          className="relative top-20 z-50 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        >
          <h3 className="text-lg leading-6 font-semibold text-gray-900 ">
            {type === "add" ? "ایجاد یادداشت" : "ویرایش یادداشت"}
          </h3>
          <div className="mt-5 mb-8">
            <input
              placeholder="عنوان ..."
              type="text"
              id="title"
              name="title"
              {...formik.getFieldProps("title")}
              className="w-full py-3 px-4 rounded-xl bg-gray-200 focus:bg-white text-[#252525] border border-gray-200 outline-none duration-200 transition-all ease-in-out hover:border-blue-300 focus:outline-none"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="absolute right-5 text-red-600 font-semibold top-[7.3rem]">
                !{formik.errors.title}
              </p>
            )}
          </div>
          <div className="mb-8">
            <textarea
              placeholder="توضیحات ..."
              id="description"
              name="description"
              {...formik.getFieldProps("description")}
              className="resize-none h-[150px] w-full py-2 px-4 rounded-xl bg-gray-200 focus:bg-white text-[#252525] border border-gray-200 outline-none duration-200 transition-all ease-in-out hover:border-blue-300 focus:outline-none"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="absolute right-5 text-red-600 font-semibold">
                !{formik.errors.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            <button
              disabled={!formik.isValid}
              className={`${
                !formik.isValid ? "opacity-50" : "opacity-100"
              } w-2/3 py-3 bg-blue-900 text-white hover:bg-blue-800 shadow rounded-xl`}
            >
              {type === "add" ? "ثبت یادداشت" : "ویرایش یادداشت"}
            </button>
            <button
              onClick={() => setActive(false)}
              className="w-1/3 py-3 bg-red-500 text-white hover:bg-red-400 shadow rounded-xl"
            >
              انصراف
            </button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
