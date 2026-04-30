import {FaPen} from "react-icons/fa";
import {AiFillCloseCircle} from "react-icons/ai";

const ExpenseItem = ({ item, index, handleDelete, handleUpdate}) => {
    return (
        <div className={`line-expense-container ${index % 2 === 0 ? "cel-light" : "cel-dark"}`}>
            <p>
                {new Date(item.date).toLocaleDateString("fr-FR")} | {item.user} | {item.shop} | {item.sum.toLocaleString("fr-FR")} €
            </p>
            <FaPen
                onClick={() => handleUpdate(item)}
                color={"#51cf66"}
                fontSize={"20px"}
            />
            <AiFillCloseCircle
                onClick={() => handleDelete(item.id)}
                color={"#ff6b6b"}
                fontSize={"30px"}
            />
        </div>
    )
}

export default ExpenseItem;