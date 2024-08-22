import { useState } from 'react';
import TodoItem from './TodoItem'
import { AnimatePresence, motion } from 'framer-motion';
import NewTodoBtn from './NewTodoBtn';
import { useGetTodosQuery, useUpdateStatusMutation } from './feautures/api/apiSlice';
import { Todo } from './feautures/todo/todoSlice';

const AppCard = () => {
    const [selectedId, setSelectedId] = useState(0);
    const { data: todos, isLoading, refetch } = useGetTodosQuery({});
    console.log(todos)

    const [updateStatus] = useUpdateStatusMutation();

    const updateStatusHandle = async (id: number, status: Todo["status"]) => {
        try {
            await updateStatus({id, status}).unwrap(); 
            setSelectedId(0)
            refetch()
        } catch (e) {
            console.log(e)
        }
    }

    if (isLoading) return <div>Loading...</div>;
  return (
    <>
        <div className='w-3/4 h-3/4 bg-slate-700 rounded-3xl flex flex-col gap-3 items-center'>
            <h1 className='text-white font-bold py-3'>My Todo</h1>
            {
                todos.map((todo: any) => <TodoItem id={todo.id} status={todo.status} title={todo.title} description={todo.description} onClick={() => setSelectedId(todo.id)}/>)
            }
            <NewTodoBtn/>
        </div>
        <AnimatePresence>
                {selectedId && (
                    <motion.div 
                        layoutId={(selectedId).toString()} 
                        className='absolute p-3 w-1/2 rounded-xl bg-slate-400 flex flex-col items-center justify-center'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <motion.h5 className='text-lg font-bold'>Edit Status</motion.h5>
                        <motion.div className='flex gap-4 py-4'>
                            <motion.button className='bg-[#FCBF49] rounded-lg py-1 px-2 font-bold' onClick={async () => await updateStatusHandle(selectedId, 'pending')}>Pending</motion.button>
                            <motion.button className='bg-[#588157] rounded-lg py-1 px-2 font-bold' onClick={async () => await updateStatusHandle(selectedId, 'done')}>Done</motion.button>
                            <motion.button className='bg-[#D62828] rounded-lg py-1 px-2 font-bold' onClick={async () => await updateStatusHandle(selectedId, "wontdo")}>Won't do</motion.button>
                        </motion.div>
                        <motion.button 
                            className='px-4 absolute top-2 right-2 py-2 bg-red-400 text-white rounded-full flex justify-center items-center'
                            onClick={() => setSelectedId(0)}
                        >
                            <svg fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon> </g></svg>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
    </>
  )
}

export default AppCard