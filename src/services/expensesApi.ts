import {Expense, NewExpense} from "../types/expense";
import API_URL from "./api";

export const fetchExpense = async (): Promise<Expense[]> => {
    // je recup les depenses ds res en demandant au server
    const res = await fetch(`${API_URL}/expenses`);
    // verifucation: si erreur http => stop
    if (!res.ok) throw new Error("Erreur serveur");
    // conversion du json en js
    const data = await res.json();
    // renvoie les données a celui qui appelle la fonction
    return data;
};

export const createExpense = async (payload: NewExpense): Promise<void> => {
    await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
};

export const updateExpense = async (
    id: number,
    payload: NewExpense
): Promise<void> => {

    const res = await fetch(`${API_URL}/expenses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error("Erreur UPDATE")
    }
};

export const deleteExpense = async (id: number): Promise<void> => {
    const res =
        await fetch(`${API_URL}/expenses/${id}`, {
            method: "DELETE"
        });
    if (!res.ok) throw new Error("Erreur DELETE");
};

