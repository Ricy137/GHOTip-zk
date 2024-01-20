import Button from '@/components/Button';
import { useModal } from '@/components/Modal';

const NotificationModal: React.FC<{ content: string }> = ({ content }) => {
  const { hideModal } = useModal();
  return (
    <div className="mt-[37px] flex flex-col justify-between gap-y-[14px] w-[384px] min-h-48 text-[24px] font-semibold text-center">
      <div>{content}</div>
      <Button size="large" color="purple" fullWidth onClick={hideModal}>
        Close
      </Button>
    </div>
  );
};

export default NotificationModal;
