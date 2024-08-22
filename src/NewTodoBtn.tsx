import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCreateTodoMutation, useGetTodosQuery } from './feautures/api/apiSlice';

const NewTodoBtn: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createTodo] = useCreateTodoMutation();
  const { refetch } = useGetTodosQuery({}); 

  const toggleForm = () => setIsVisible(!isVisible);

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      try {
        await createTodo({ title, description }).unwrap();
        setTitle('');
        setDescription('');
        setIsVisible(false);
        refetch()
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  return (
    <div className="new-todo-container">
      <button
        className="bg-green-400 p-3 rounded-lg"
        onClick={toggleForm}
      >
        Add new
      </button>

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md"
        >
          <form onSubmit={handleCreateTodo}>
            <div className="mb-4">
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Create Todo
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default NewTodoBtn;
