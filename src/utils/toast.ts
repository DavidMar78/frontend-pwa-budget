import { toast } from "react-hot-toast";

export const showSuccess = (msg: string) => {
    const id = toast.success(msg);

    setTimeout(() => {
        toast.dismiss(id);
    }, 3000);
};

export const showError = (msg: string) => {
    const id = toast.error(msg);

    setTimeout(() => {
        toast.dismiss(id);
    }, 4000);
};