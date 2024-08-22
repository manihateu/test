import Badge from './Badge'
import CardActions from './CardActions'
import CardInfo from './CardInfo'
import { motion } from 'framer-motion'
import { Todo } from './feautures/todo/todoSlice'
import { useDeleteTodoMutation, useGetTodosQuery } from './feautures/api/apiSlice'

type TProp = {
    id: number,
    status: Todo["status"],
    description: string,
    title: string,
    onClick: () => void
}

const TodoItem = ({id, status, title, description, onClick}: TProp) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const { refetch } = useGetTodosQuery({});

  const deleteHandle = async () => {
    try{
      await deleteTodo({id});
      refetch()
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <motion.div layoutId={id.toString()} className='w-11/12 bg-slate-300 rounded-xl'>
        <div className="w-full flex flex-row">
            <Badge status={status}/>
            <CardInfo description={description} title={title}/>
            <CardActions deleteAction={deleteHandle} updateAction={onClick}/>
        </div>
    </motion.div>
  )
}

export default TodoItem