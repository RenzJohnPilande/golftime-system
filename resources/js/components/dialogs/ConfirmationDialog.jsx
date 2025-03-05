import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import PrimaryButton from '../PrimaryButton';

const ConfirmationDialog = ({ open, onClose, onConfirm, config }) => {
    const { title, message, formAction } = config || {};
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between p-1 capitalize">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="p-1">
                    <p className="text-sm text-gray-600">{message}</p>
                    <div className="mt-4 flex justify-end gap-3">
                        <button
                            onClick={() => {
                                onClose();
                            }}
                            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <PrimaryButton
                            text={formAction}
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            style={{
                                wrapper:
                                    'capitalize px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600',
                            }}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;
