'use client';
import { useState, useCallback } from 'react';
import { errorMessage } from '@/utils/error';
import { useShowToast } from '@/components/Toast';
//hooks for async functions
//loading is true when function is executing, false when done
const useInTransaction = <T extends (...params: any) => Promise<any>>(
  transactionAction: T
) => {
  const [loading, setStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const showToast = useShowToast();

  const handleExecAction = useCallback(
    async (..._params: Parameters<T>) => {
      try {
        setStatus(true);
        await transactionAction(...(_params as any));
        setStatus(false);
      } catch (err: any) {
        if (err instanceof Error) {
          const message = errorMessage(err);
          showToast({ content: message, type: 'failed' });
        }
        setStatus(false);
        if (err?.code === 4001) {
          setError('You cancel the transaction.');
        } else {
          setError(err?.message || 'Unknown error');
        }
        console.log('Handle action err', err);
      }
    },
    [transactionAction]
  );

  return {
    loading,
    error,
    handleExecAction,
  };
};

export default useInTransaction;
