import styles from "./App.module.css";
import { useMemo } from "react";
import Donut from "./components/Donut";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import useExpenses from "./hooks/useExpenses";
import { computeDiff, format } from "./utils/utils";
import { Toaster } from "react-hot-toast";
import DeleteModal from "./components/DeleteModal/DeleteModal";

function App() {
    const {
        newEnter,
        errors,
        data,
        value,
        setValue,
        editItem,
        isDeleteModalOpen,
        expenseToDelete,
        form,
        setForm,
        setErrors,
        handleOpenCloseForm,
        handleDelete,
        handleSubmit,
        handleUpdate,
        openDeleteModal,
        closeDeleteModal
    } = useExpenses();

    const { diffDavid, diffLaetitia } = useMemo(() => {
        return computeDiff(data);
    }, [data]);

    return (
        <>
            <Toaster
                position="bottom-center"
            />
            <div className={styles.app}>

                <header className={styles.header}>
                    <div className={styles.balance}>
                        {diffDavid > 0 ? (
                            <Donut difference={format(diffDavid)} user="David" />
                        ) : (
                            <Donut difference={format(diffLaetitia)} user="Laetitia" />
                        )}
                    </div>
                </header>

                {/* 🔹 CONTENT = zone scrollable */}
                <main className={styles.content}>
                    <ExpenseList
                        data={data}
                        handleUpdate={handleUpdate}
                        setValue={setValue}
                        editItem={editItem}
                        handleOpenCloseForm={handleOpenCloseForm}
                        openDeleteModal={openDeleteModal}
                    />
                </main>

                {/* 🔹 FOOTER = formulaire */}
                <footer className={styles.footer}>
                    {newEnter && (
                        <ExpenseForm
                            errors={errors}
                            data={data}
                            value={value}
                            setValue={setValue}
                            editItem={editItem}
                            form={form}
                            setForm={setForm}
                            setErrors={setErrors}
                            handleOpenCloseForm={handleOpenCloseForm}
                            handleSubmit={handleSubmit}
                        />
                    )}
                </footer>

            </div>

            {isDeleteModalOpen &&
                <DeleteModal
                    handleDelete={handleDelete}
                    expenseToDelete={expenseToDelete}
                    closeDeleteModal={closeDeleteModal}
                />
            }

        </>

    );
}

export default App;