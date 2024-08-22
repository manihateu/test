
type TProp = {
    description: string,
    title: string
}

const CardInfo = ({title, description}: TProp) => {
  return (
    <div className='w-full my-2'>
        <div className="font-bold text-xs text-gray-600">{title}</div>
        <div className="">{description}</div>
    </div>
  )
}

export default CardInfo