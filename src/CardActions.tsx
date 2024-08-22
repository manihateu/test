import deleteImg from './assets/Delete.svg'
import edit from './assets/Edit.svg'

type TProp = {
    deleteAction: () => void,
    updateAction: () => void
}

const CardActions = ({deleteAction, updateAction}: TProp) => {
  return (
    <div className='flex gap-5 mx-4'>
        <img src={edit} alt="" onClick={updateAction} className='cursor-pointer'/>
        <img src={deleteImg} alt="" onClick={deleteAction} className='cursor-pointer'/>
    </div>
  )
}

export default CardActions