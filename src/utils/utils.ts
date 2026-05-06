import { Expense } from "../types/expense";

export const computeDiff = (data: Expense[]) => {
    const totalDavid = data
        .filter(item => item.user === "David")
        .reduce((acc, item) => acc + item.sum, 0);

    const totalLaetitia = data
        .filter(item => item.user === "Laetitia")
        .reduce((acc, item) => acc + item.sum, 0);

    return {
        diffDavid: totalDavid - totalLaetitia,
        diffLaetitia: totalLaetitia - totalDavid,
    };
};

export const format = (value: number): string =>
    value.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export function formatDate(date: string) {
    const d = new Date(date);

    return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short"
    });
}