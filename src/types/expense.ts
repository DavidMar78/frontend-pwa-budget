export type Expense = {
    id: number;
    user: string;
    shop: string;
    sum: number;
    date: number;
};

export type NewExpense = {
    user: string;
    shop: string;
    sum: number;
    date: number;
};