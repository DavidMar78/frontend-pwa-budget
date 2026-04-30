import { useEffect } from "react";
import ExpenseItem from "./ExpenseItem.jsx";

const ExpenseList =
    ( {   data,
          setValue,
          editItem,
          handleOpenCloseForm,
          handleDelete,
          handleUpdate
    }) => {

    // Synchronisation de le useState value avec setEditItem
    useEffect(() => {
        if (editItem) {
            setValue(editItem.sum.toString())
        } else {
            setValue("")
        }
    }, [editItem])

    return (
        <div className="list-container">
                    <div>
                        {data.map((item, index) => (
                            < ExpenseItem
                                key={item.id}
                                item={item}
                                index={index}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                    </div>
                    <button onClick={handleOpenCloseForm} className="floating-btn">
                        +
                    </button>
        </div>
    )
};

export default ExpenseList;