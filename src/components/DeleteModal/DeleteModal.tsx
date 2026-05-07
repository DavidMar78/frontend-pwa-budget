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
                <h3>Confirmez la suppression?</h3>
                <p>Êtes-vous sûr de vouloir supprimer cette dépense ?</p>
                <div className={styles.btnContainer}>
                    <button
                        onClick={closeDeleteModal}
                    >
                        Annuler
                    </button>

                    <button
                        onClick={() => handleDelete(expenseToDelete)}
                    >
                        Effacer
                    </button>
                </div>

            </div>
        </div>

    )
}

export default DeleteModal;