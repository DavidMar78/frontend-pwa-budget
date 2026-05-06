import styles from "./ExpenseItem.module.css";
import { Expense } from "../../types/expense";
import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/utils";

type Props = {
    item: Expense;
    openDeleteModal: (id: number) => void;
    handleUpdate: (item: Expense) => void;
};

const ExpenseItem = ({
                         item,
                         openDeleteModal,
                         handleUpdate
}: Props) => {

    return (
        <div className={styles.card}>

            {/* 🔹 Ligne principale */}
            <div className={styles.row}>
                <div className={styles.left}>
                    <span className={styles.shop}>{item.shop}</span>
                </div>

                <span className={styles.amount}>{item.sum} €</span>
            </div>

            {/* 🔹 Ligne secondaire */}
            <div className={styles.subRow}>

                {/* 👇 user + date */}
                <span
                    className={styles.meta}
                    style={{
                        color: item.user === "David" ? "#3b82f6" : "#ec4899"
                    }}
                >
          {item.user} • {formatDate(item.date)}
        </span>

                <div className={styles.actions}>
                    <button onClick={() => handleUpdate(item)}>
                        <Pencil size={16} />
                    </button>
                    <button onClick={() => openDeleteModal(item.id)}>
                        <Trash2 size={16} />
                    </button>
                </div>

            </div>

        </div>
    );
};

export default ExpenseItem;