import ExpenseItem from "./ExpenseItem.jsx";

const ExpenseList =
    ( {   data,
          handleOpenCloseForm,
          handleDelete,
          handleUpdate
    }) => {

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