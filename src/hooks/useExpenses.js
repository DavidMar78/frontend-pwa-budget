import {useEffect, useState} from "react";
import { fetchExpense, createExpense, updateExpense, deleteExpense } from "../services/expensesApi.js";

const useExpenses = () => {

    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [value, setValue] = useState("");
    const [newEnter, setNewEnter] = useState(false);

    // Fonction la + importante, celle qui charge tte les données
    const fetchData = async () => {
        try {
            // je recup le retour de données de fetchExpense()
            const data = await fetchExpense()
            setData(prev => {
                if (JSON.stringify(prev) === JSON.stringify(data)) {
                    return prev; // si rien ne change pas de render
                }
                return data
            });
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Premier chargement
        const loadData = async () => {
            try {
                const data = await fetchExpense()
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        loadData()
        // Refresh toutes les 5 secondes
        const interval = setInterval(() => {
            fetchData()
        }, 5000)
        // clear
        return() => clearInterval(interval)
    },[]);

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const payload = {
            user: formData.get("user"),
            shop: formData.get("shop"),
            sum: Number(value),
            date: Date.now()
        }
        try {
            if (editItem) {
                // UPDATE => appelle le service
                await updateExpense(payload)
            } else {
                // CREATE => appelle le service
                await createExpense(payload)
            }
            // Recharge des données
            await fetchData()

            // RESET UI
            setEditItem(null);
            setValue("");
            e.target.reset();

        } catch (error) {
            console.log(error);
        }
    }

    function handleUpdate(item)  {
        setEditItem(item);
        setValue(item.sum.toString())
        setNewEnter(true);
    }

  async function handleDelete(id) {
        try {
            // delete coté serveur
            await deleteExpense(id)

            // refresh UI
            await fetchData()

        } catch (error) {
            console.log(error)
        }
    }

    // Open or close the form for one new enter
    function handleOpenCloseForm() {
        setNewEnter(prev => !prev);
        setValue("");
        setEditItem(null);
    }

    return {
        data,
        newEnter,
        value,
        setValue,
        editItem,
        fetchData,
        handleSubmit,
        handleUpdate,
        handleDelete,
        handleOpenCloseForm
    }
}

export default useExpenses;