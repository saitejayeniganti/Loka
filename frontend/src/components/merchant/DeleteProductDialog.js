import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteProduct } from '../../reducers/actions'
import { displayMessage, displayError } from '../../utils/messages'

export default function DeleteProductDialog({ open, handleClose, liftedDeleteProductId, fetchAllProductsByMerchantId }) {
    const onDeleteProduct = async () => {
        try {
            const deleteProductResult = await deleteProduct(liftedDeleteProductId)
            handleClose()
            displayMessage(deleteProductResult.message)
            fetchAllProductsByMerchantId()
        } catch (e) {
            displayError(e.error)
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onDeleteProduct}>Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}