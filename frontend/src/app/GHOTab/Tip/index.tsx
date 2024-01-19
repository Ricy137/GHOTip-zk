'use client';
import { useCallback } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import GHOLogo from '@/assets/icons/GHO.svg';
import { WrapperCard } from '@/components/Card';
import SimpleInput from '@/components/Input/SimpleInput';
import Button from '@/components/Button';
import { useModal } from '@/components/Modal';
import AuthConBtn from '@/modules/AuthConBtn';
import { useDepositTip } from '@/services/depositTip';
import useInTransaction from '@/hooks/useIntransaction';
import ProofModal from './proofModal';

interface TipForm {
  amount: number;
}

const Tip: React.FC = () => {
  const depositTip = useDepositTip();
  const { showModal } = useModal({
    title: 'Tip Proof List',
    content: <ProofModal />,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TipForm>();

  const onSubmit = useCallback(async (data: TipForm) => {
    try {
      const txHash = depositTip(data.amount);
      // console.log('txHash', txHash);
      showModal();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(handleExecAction)}
    >
      <WrapperCard
        color="purple"
        className="flex flex-row justify-between items-center min-h-[152px]"
      >
        <SimpleInput
          {...register('amount', { required: true })}
          type="number"
          // defaultValue={0}
          placeholder="0"
          inputClassName="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <div className="flex flex-row items-center gap-x-[6px]">
          <div className="flex items-center justify-center w-[23px] h-[23px] border-[2px] border-black rounded-[11.5px]">
            <Image src={GHOLogo} alt="gho logo" />
          </div>
          <span className="text-[20px] font-medium">GHO</span>
        </div>
      </WrapperCard>
      <div className="mt-[14px] w-full">
        <AuthConBtn color="purple">
          <Button fullWidth color="purple" size="large">
            Tip
          </Button>
        </AuthConBtn>
      </div>
    </form>
  );
};

export default Tip;
