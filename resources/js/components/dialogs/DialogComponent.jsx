import { cn } from '@/lib/utils';
import { useDialogStore } from '../store/useDialogStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export const DialogComponent = ({ states, styles, children, title }) => {
    const { setSelected } = useDialogStore();
    const dialogOpen = states.open;
    const onOpenChangeHandler = states.setOpen || (() => {});

    return (
        <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => {
                onOpenChangeHandler(isOpen);
                setSelected(null);
            }}
        >
            <DialogContent
                className={cn('max-h-[90vh] overflow-auto', styles?.content)}
            >
                <DialogHeader>
                    <DialogTitle className={cn('', styles?.title)}>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                {states?.loading ? <>Loading record...</> : children}
            </DialogContent>
        </Dialog>
    );
};
