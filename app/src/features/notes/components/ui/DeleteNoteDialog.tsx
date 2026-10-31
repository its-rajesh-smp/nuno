import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteNoteDialogProps {
  title: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteNoteDialog({ title, onConfirm, onCancel }: DeleteNoteDialogProps) {
  return (
    <AlertDialog open={title !== null} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete “{title}”?</AlertDialogTitle>
        <AlertDialogDescription>This note will be gone for good.</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="danger" onClick={onConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
