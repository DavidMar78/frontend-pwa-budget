import styles from "./ExpenseList.module.css";
import { Expense } from "../../types/expense";
import * as React from "react";
import ExpenseItem from "./ExpenseItem";

type ExpenseListProps = {
    data: Expense[];
    handleUpdate: (item: Expense) => void;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    editItem: Expense | null;
    handleOpenCloseForm: () => void;
    openDeleteModal: (id: number) => void;
};

const ExpenseList = ({
                         data,
                         handleOpenCloseForm,
                         handleUpdate,
                         openDeleteModal
}: ExpenseListProps) => {

    return (
        <div className={styles.container}> {/* 👈 module */}

            {/* 🔹 liste */}
            <div className={styles.list}>
                {data.map((item, index) => (
                    <ExpenseItem
                        key={item.id}
                        item={item}
                        openDeleteModal={openDeleteModal}
                        handleUpdate={handleUpdate}
                    />
                ))}
            </div>

            {/* 🔹 bouton flottant */}
            <button
                onClick={handleOpenCloseForm}
                className={styles.floatingBtn}
            >
                +
            </button>

        </div>
    );
};

export default ExpenseList;