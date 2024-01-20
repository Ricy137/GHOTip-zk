'use client';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import SimpleTextArea from '@/components/TextArea/SimpleTextArea';
import Button from '@/components/Button';
import AuthConBtn from '@/modules/AuthConBtn';
import useInTransaction from '@/hooks/useIntransaction';
import { useVerifyProof } from '@/services/verifyProof';

interface VerifyForm {
  proofElementStr: string;
}

const Verify: React.FC = () => {
  const verifyProof = useVerifyProof();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyForm>();

  const onSubmit = useCallback(async (data: VerifyForm) => {
    try {
      verifyProof(data.proofElementStr);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const { loading, handleExecAction } = useInTransaction(onSubmit);

  return (
    <form
      className="flex flex-col min-w-full"
      onSubmit={handleSubmit(handleExecAction)}
    >
      <SimpleTextArea
        {...register('proofElementStr', { required: true })}
        placeholder="Paste Your Tip Proof Here"
        textareaClass="min-h-[312px]"
      />
      <div className="mt-[14px] w-full">
        <AuthConBtn color="purple">
          <Button fullWidth size="large" color="purple">
            Verify Proof
          </Button>
        </AuthConBtn>
      </div>
    </form>
  );
};

export default Verify;
