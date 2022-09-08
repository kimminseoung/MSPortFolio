export const useConfirm = () => {
  const useConfirm = (message: string, onConfirm: () => void, onCancel: () => void) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };

    return confirmAction;
  };
  const deleteConfirm = () => console.log("삭제했습니다.");
  const cancelConfirm = () => console.log("취소했습니다.");
  const confirmDelete = useConfirm("삭제하시겠습니까?", deleteConfirm, cancelConfirm);
  return confirmDelete
};
