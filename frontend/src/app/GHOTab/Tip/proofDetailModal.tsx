'use client';
import { useCallback } from 'react';
import Button from '@/components/Button';
import { useModal } from '@/components/Modal';
import AuthConBtn from '@/modules/AuthConBtn';
import { useClearProofElements } from '@/services/proof';
import { useDepositTip } from '@/services/depositTip';
import { calcTipDetail } from '@/utils/tipUtil';
import useInTransaction from '@/hooks/useIntransaction';
import ProofModal from './proofModal';
import { TipForm } from '.';

const ProofDetailModal: React.FC<TipForm> = (props) => {
  const clearProofElements = useClearProofElements();
  const { showModal } = useModal({
    title: 'Tip Proof List',
    content: <ProofModal />,
    onClose: clearProofElements,
  });
  const { totalTip, tip1, tip5 } = calcTipDetail(props);
  const depositTip = useDepositTip();

  //
  const onDeposit = async () => {
    try {
      let tip1Number = tip1;
      let tip5Number = tip5;
      while (tip1Number > 0) {
        await depositTip(0.1);
        tip1Number--;
      }
      while (tip5Number > 0) {
        await depositTip(0.5);
        tip5Number--;
      }
      showModal();
    } catch (err) {
      console.log(err);
    }
  };

  const { loading, handleExecAction } = useInTransaction(onDeposit);

  return (
    <div className="mt-[5px] flex flex-col gap-y-[23px] min-w-full ">
      <div className="flex flex-col gap-y-[5px]">
        <span className="text-[16px] text-[#626262] font-semibold">
          Total Tip
        </span>
        <div className="text-[60px] font-medium">{totalTip} GHO</div>
      </div>
      <div className="flex flex-col gap-y-[5px]">
        <span className="text-[16px] text-[#626262] font-semibold">
          Tip Proofs
        </span>
        <div className="flex flex-row items-center gap-x-[22px] text-[20px] font-medium">
          <span>0.5GHO x {tip5}</span>
          <span>0.1GHO x {tip1}</span>
        </div>
      </div>
      <AuthConBtn color="purple">
        <Button
          loading={loading}
          onClick={handleExecAction}
          className="mt-[14px]"
          size="large"
          fullWidth
          color="purple"
        >
          Deposit & Generate Tip
        </Button>
      </AuthConBtn>
    </div>
  );
};

export default ProofDetailModal;
