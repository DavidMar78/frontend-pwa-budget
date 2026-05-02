import {useEffect, useState} from "react";
import { fetchExpense, createExpense, updateExpense, deleteExpense } from "../services/expensesApi";
import {Expense} from "../types/expense";
import * as React from "react";

type UseExpensesReturn = {
    data: Expense[];
    newEnter: boolean;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    editItem: Expense | null;
    fetchData: () => Promise<void>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleUpdate: (item: Expense) => void;
    handleDelete: (id: number) => Promise<void>;
    handleOpenCloseForm: () => void;
}

const useExpenses = (): UseExpensesReturn => {

    const [data, setData] = useState<Expense[]>([]);
    const [editItem, setEditItem] = useState<Expense | null>(null);
    const [value, setValue] = useState<string>("");
    const [newEnter, setNewEnter] = useState<boolean>(false);

    // Fonction la + importante, celle qui charge tte les données
    const fetchData = async (): Promise<void> => {
        try {
            // je recup le retour de données de fetchExpense()
            const data = await fetchExpense()
            setData(prev => {
                if (JSON.stringify(prev) === JSON.stringify(data)) {
                    return prev; // si rien ne change pas de render
                }
                return data
            });
        } catch (error: unknown) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Premier chargement
        const loadData = async (): Promise<void> => {
            try {
                const data = await fetchExpense()
                setData(data)
            } catch (error: unknown) {
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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const payload = {
            user: formData.get("user") as string,
            shop: formData.get("shop") as string,
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
            form.reset();

        } catch (error: unknown) {
            console.log(error);
        }
    }

    function handleUpdate(item: Expense)  {
        setEditItem(item);
        setValue(item.sum.toString())
        setNewEnter(true);
    }

  async function handleDelete(id: number) {
        try {
            // delete coté serveur
            await deleteExpense(id)

            // refresh UI
            await fetchData()

        } catch (error: unknown) {
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