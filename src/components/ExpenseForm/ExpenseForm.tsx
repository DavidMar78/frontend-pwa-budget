import styles from "./ExpenseForm.module.css";
import { FormErrors, FormSelection } from "../../hooks/useExpenses";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Expense } from "../../types/expense";
import * as React from "react";

type ExpenseFormProps = {
    data: Expense[];
    editItem: Expense | null;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    form: FormSelection;
    setForm: React.Dispatch<React.SetStateAction<FormSelection>>;
    handleOpenCloseForm: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    errors: FormErrors;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
};

const ExpenseForm = ({
                         errors,
                         editItem,
                         value,
                         setValue,
                         setErrors,
                         form,
                         setForm,
                         handleOpenCloseForm,
                         handleSubmit
                     }: ExpenseFormProps) => {

    const users = ["David", "Laetitia"];
    const shops = ["Lidl", "InterM", "Carrefour", "Action", "Resto", "Divers"];

    return (
        <form onSubmit={handleSubmit} className={styles.form}>

            <h2 className={styles.title}>
                {editItem ? "Modifier la dépense" : "Nouvelle dépense"}
            </h2>

            {/* 🔹 USER */}
            <p className={styles.label}>Payeur</p>
            <div className={styles.radioGroup}>
                {users.map((item, index) => (
                    <label key={index} className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="user"
                            value={item}
                            checked={form.user === item}
                            onChange={() => {
                                setForm(prev => ({...prev, user: item}));
                                setErrors(prev => ({ ...prev, user: "" }));
                            }}
                        />
                        <span className={styles.segment}>{item}</span>
                    </label>
                ))}
                {errors.user && <p className={styles.error}>{errors.user}</p>}
            </div>

            {/* 🔹 SHOP */}
            <p className={styles.label}>Dépense</p>
            <div className={styles.radioGroup}>
                {shops.map((item, index) => (
                    <label key={index} className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="shop"
                            value={item}
                            checked={form.shop === item}
                            onChange={() => {
                                setForm(prev => ({ ...prev, shop: item}))
                                setErrors(prev => ({ ...prev, shop: "" }));
                            }}
                        />
                        <span className={styles.segment}>{item}</span>
                    </label>
                ))}
                {errors.shop && <p className={styles.error}>{errors.shop}</p>}
            </div>

            {/* 🔹 AMOUNT */}
            <p className={styles.label}>Montant</p>
            <input
                type="number"
                step="0.01"
                name="myInput"
                required
                className={styles.input}
                value={value}
                onChange={(e) => {
                    let val = e.target.value;
                    val = val.replace(",", ".");
                    if (/^\d*\.?\d{0,2}$/.test(val)) {
                        setValue(val);
                    }
                }}
            />

            {/* 🔹 ACTIONS */}
            <div className={styles.actions}>
                <button type="submit" className={styles.submit}>
                    <FaCheck size="18px" />
                </button>

                <button
                    type="button"
                    onClick={handleOpenCloseForm}
                    className={styles.close}
                >
                    <IoMdClose size="20px" />
                </button>
            </div>

        </form>
    );
};

export default ExpenseForm;