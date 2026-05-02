import {Expense, NewExpense} from "../types/expense";

export const fetchExpense = async (): Promise<Expense[]> => {
    // je recup les depenses ds res en demandant au server
    const res = await fetch("/expenses");
    // verifucation: si erreur http => stop
    if (!res.ok) throw new Error("Erreur serveur");
    // conversion du json en js
    const data = await res.json();
    // renvoie les données a celui qui appelle la fonction
    return data;
};

export const createExpense = async (payload: NewExpense): Promise<void> => {
    await fetch("/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
};

export const updateExpense = async (payload: NewExpense): Promise<void> => {
    await fetch("/expenses", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
};

export const deleteExpense = async (id: number): Promise<void> => {
    const res =
        await fetch(`/expenses/${id}`, {
            method: "DELETE"
        });
    if (!res.ok) throw new Error("Erreur DELETE");
};

