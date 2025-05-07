import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

export function ConfirmationDialog({
    open,
    onOpenChange,
    onConfirm,
    title,
    description
}: ConfirmationDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-[#212429] text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-600 text-white hover:bg-gray-700">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-[#F784AD] text-white hover:bg-[#f56a9b]"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
} 