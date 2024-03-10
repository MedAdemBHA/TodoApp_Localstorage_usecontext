import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
type propsType = {
  task: { id: string; task: string; uniqId: string };
  deleteTodo: (uniqId: string) => void;
  handleEditClick: (todo: { id: string; task: string; uniqId: string }) => void;
};

const Todo = ({ task, deleteTodo, handleEditClick }: propsType) => {
  return (
    <div className="Todo">
      <p>{task.task}</p>
      <div className="icon">
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => handleEditClick(task)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteTodo(task.uniqId)}
        />
      </div>
    </div>
  );
};
export default Todo;
