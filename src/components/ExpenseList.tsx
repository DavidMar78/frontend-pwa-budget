import {Expense} from "../types/expense";
import * as React from "react";
import ExpenseItem from "./ExpenseItem";

type ExpenseListProps = {
    data: Expense[];
    handleDelete: (id: number) => Promise<void>;
    handleUpdate: (item: Expense) => void;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    editItem: Expense | null;
    handleOpenCloseForm: () => void;
};

const ExpenseList = ({
    data,
    handleOpenCloseForm,
    handleDelete,
    handleUpdate
}: ExpenseListProps) => {

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