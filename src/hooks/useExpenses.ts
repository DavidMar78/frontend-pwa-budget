import {useEffect, useState} from "react";
import { fetchExpense, createExpense, updateExpense, deleteExpense } from "../services/expensesApi";
import {Expense} from "../types/expense";
import * as React from "react";
import { showSuccess } from "../utils/toast";

type UseExpensesReturn = {
    data: Expense[];
    newEnter: boolean; // boolean pour ouvrir ou fermer le form
    value: string; // valeur de l a rentrée du montant de la dépense
    errors: FormErrors;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
    form: FormSelection;
    expenseToDelete: number;
    setForm: React.Dispatch<React.SetStateAction<FormSelection>>;
    editItem: Expense | null;
    isDeleteModalOpen: boolean;
    fetchData: () => Promise<void>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleUpdate: (item: Expense) => void;
    handleDelete: (id: number) => Promise<void>;
    handleOpenCloseForm: () => void;
    openDeleteModal: (id: number) => void;
    closeDeleteModal: () => void;
};

export type FormSelection = {
    user: string;
    shop: string;
};

export type FormErrors = {
    user?: string;
    shop?: string;
};

const useExpenses = (): UseExpensesReturn => {

    const [data, setData] = useState<Expense[]>([]);
    const [editItem, setEditItem] = useState<Expense | null>(null);
    const [value, setValue] = useState<string>("");
    const [newEnter, setNewEnter] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({})
    const [form, setForm] = useState<FormSelection>({
        user:"",
        shop: ""
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [expenseToDelete, setExpenseToDelete] = useState<number>(0)

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
    },[]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const newErrors: FormErrors = {};

        const payload = {
            user: form.user,
            shop: form.shop,
            sum: Number(value),
            date: new Date().toISOString()
        }

        // verification de la selection d'un user

        if (!form.user) {
            newErrors.user = "Sélectionne un payeur";
        }

        if (!form.shop) {
            newErrors.shop = "Sélectionne un shop";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            if (editItem) {
                // UPDATE => appelle le service
                await updateExpense(editItem.id, payload)
                showSuccess("Dépense modifiée");
            } else {
                // CREATE => appelle le service
                await createExpense(payload)
                showSuccess("Dépense ajoutée");
            }
            // Recharge des données
            await fetchData()

            // RESET UI
            setForm({
                user: "",
                shop: ""
            });
            setEditItem(null);
            setValue("");
            setNewEnter(prev => !prev);

        } catch (error: unknown) {
            console.log(error);
        }
    }

    function handleUpdate(item: Expense)  {
        setEditItem(item);
        setForm({
            user: item.user,
            shop: item.shop
        })
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

    function openDeleteModal (id: number) {
        setExpenseToDelete(id);
        setIsDeleteModalOpen(prev => !prev);
    }

    function closeDeleteModal (){
        setExpenseToDelete(0);
        setIsDeleteModalOpen(prev => !prev);
    }


    // Open or close the form for one new enter
    function handleOpenCloseForm() {
        setNewEnter(prev => !prev);
        setValue("");
        setEditItem(null);
        setForm({
            user: "",
            shop: ""
        });
        setErrors({});
    }

    return {
        data,
        errors,
        newEnter,
        value,
        setValue,
        setErrors,
        form,
        setForm,
        editItem,
        isDeleteModalOpen,
        expenseToDelete,
        fetchData,
        handleSubmit,
        handleUpdate,
        handleDelete,
        handleOpenCloseForm,
        openDeleteModal,
        closeDeleteModal
    }
}

export default useExpenses;