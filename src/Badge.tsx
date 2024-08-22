import { Todo } from "./feautures/todo/todoSlice"



const Badge = ({status}: {status: Todo["status"]}) => {
  return (
    <div className={`w-5 h-5 m-1 rounded-full ${status === "done" && "bg-[#588157]"} ${status === "pending" && "bg-[#FCBF49]"} ${status === "wontdo" && "bg-[#D62828]"}`}></div>
  )
}

export default Badge