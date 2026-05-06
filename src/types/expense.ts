export type Expense = {
    id: number;
    user: string;
    shop: string;
    sum: number;
    date: string;
};

export type NewExpense = {
    user: string;
    shop: string;
    sum: number;
    date: string;
};