import styles from "./DeleteModal.module.css";

type ModalProps = {
    handleDelete: (id: number) => void;
    expenseToDelete: number;
    closeDeleteModal: () => void;
}

const DeleteModal = ({
                         handleDelete,
                         expenseToDelete,
                         closeDeleteModal
}: ModalProps) => {

    return (
        <div className={styles.background}>
            <div className={styles.content}>
                <p>Êtes-vous sûr de vouloir supprimer cette dépense ?</p>
                <button
                    onClick={closeDeleteModal}
                >
                    Annuler
                </button>

                <button
                    onClick={() => handleDelete(expenseToDelete)}
                >
                    Valider
                </button>
            </div>
        </div>

    )
}

export default DeleteModal;