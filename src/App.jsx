import "./App.css"
import { useMemo } from "react";
import Donut from "./components/Donut.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import useExpenses from "./hooks/useExpenses.jsx";
import { computeDiff, format } from "./utils/calculateBalance.jsx"

function App() {
    const {
        newEnter,
        data,
        value,
        setValue,
        editItem,
        handleOpenCloseForm,
        handleDelete,
        handleSubmit,
        handleUpdate
        } = useExpenses();

    const { diffDavid, diffLaetitia } = useMemo(() => {
        return computeDiff(data)
    }, [data])

    return (
        <div className="container">
            <h2>BUDGET COURSE v1-4</h2>
            <div className="info-container">
                {diffDavid > 0 ?
                    <Donut difference={format((diffDavid))} user="David"/>
                    :
                    <Donut difference={format(diffLaetitia)} user="Laetitia"/>}
            </div>
            {!newEnter ?
                < ExpenseList
                    data={data}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    setValue={setValue}
                    editItem={editItem}
                    handleOpenCloseForm={handleOpenCloseForm}
                />
                :
                < ExpenseForm
                    data={data}
                    value={value}
                    setValue={setValue}
                    editItem={editItem}
                    handleOpenCloseForm={handleOpenCloseForm}
                    handleSubmit={handleSubmit}
                />
            }
        </div>
        )
}

export default App;