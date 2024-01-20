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
import useInTransaction from '@/hooks/useIntransaction';
import ProofDetailModal from './proofDetailModal';

export interface TipForm {
  amount: number;
  belowNumber: number;
  aboveNumber: number;
  belowPercent: number;
  middlePercent: number;
  abovePercent: number;
}

const Tip: React.FC = () => {
  const { showModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TipForm>({
    defaultValues: {
      amount: 0,
      belowNumber: 20,
      aboveNumber: 50,
      belowPercent: 12,
      middlePercent: 15,
      abovePercent: 18,
    },
  });

  const onSubmit = useCallback(async (data: TipForm) => {
    try {
      // console.log('txHash', txHash);
      showModal({ content: <ProofDetailModal {...data} /> });
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
      <div className="mt-[9px] px-[23px] py-[27px] flex flex-col gap-y-[21px] text-[16px] font-semibold rounded-[15px] bg-[#F1F1F1]">
        <span>Set Tip Range</span>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-x-[8px] gap-y-[18px]">
          <span className="flex flex-row">
            <SimpleInput
              inputClassName="!text-[16px]"
              step="0.01"
              {...register('belowPercent', { required: true })}
              type="number"
              defaultValue="0"
            />
            %
          </span>
          <span>Below</span>
          <span className="flex flex-row">
            $
            <SimpleInput
              inputClassName="!text-[16px]"
              step="0.01"
              {...register('belowNumber', { required: true })}
              type="number"
              defaultValue="0"
            />
          </span>
          <span />
          <span />
          <span className="flex flex-row">
            <SimpleInput
              inputClassName="!text-[16px]"
              step="0.01"
              {...register('middlePercent', { required: true })}
              type="number"
              defaultValue="0"
            />
            %
          </span>
          <span>Between</span>
          <span className="flex flex-row">
            $
            <SimpleInput
              disabled
              inputClassName="!text-[16px]"
              step="0.01"
              type="number"
              value={watch('belowNumber')}
            />
          </span>
          <span>to</span>
          <span className="flex flex-row">
            $
            <SimpleInput
              disabled
              inputClassName="!text-[16px]"
              step="0.01"
              type="number"
              value={watch('aboveNumber')}
            />
          </span>
          <span className="flex flex-row">
            <SimpleInput
              inputClassName="!text-[16px]"
              step="0.01"
              {...register('abovePercent', { required: true })}
              type="number"
              defaultValue="0"
            />
            %
          </span>
          <span>Above</span>
          <span className="flex flex-row">
            $
            <SimpleInput
              inputClassName="!text-[16px]"
              step="0.01"
              {...register('aboveNumber', { required: true })}
              type="number"
              defaultValue={0}
            />
          </span>
          <span />
          <span />
        </div>
      </div>
      <div className="mt-[14px] w-full">
        <AuthConBtn color="purple">
          <Button loading={loading} fullWidth color="purple" size="large">
            Tip
          </Button>
        </AuthConBtn>
      </div>
    </form>
  );
};

export default Tip;
