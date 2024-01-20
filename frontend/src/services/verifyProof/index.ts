import { useCallback } from 'react';
import { decodeEventLog } from 'viem';
import { useAccount } from 'wagmi';
import { writeContract, waitForTransaction } from 'wagmi/actions';
import $u from '@/utils/zkUtils';
import GhoTipAbi5 from '@/utils/contracts/GhoTipAbi5.json';
import GhoTipAbi1 from '@/utils/contracts/GhoTipAbi1.json';
import { GHOTIP_ADDR_5, GHOTIP_ADDR_1 } from '@/utils/constants';
import { publicClient } from '@/utils/viemClient';
import { ProofElement } from '@/services/proof';

interface DepositEvent {
  root: BigInt;
  hashPairings: BigInt[];
  pairDirection: number[];
}

const generateProof = async (proofElementStr: string, addr: string) => {
  try {
    if (typeof window === undefined) return;
    const proofElement: ProofElement = JSON.parse(atob(proofElementStr));
    const receipt = await publicClient.getTransactionReceipt({
      hash: proofElement.txHash as `0x${string}`,
    });
    if (!receipt) {
      throw 'empty-receipt';
    }
    const log = receipt.logs[1];
    const decodedResult = decodeEventLog({
      abi: GhoTipAbi5,
      data: log.data,
      topics: [...log.topics],
    }) as { args: DepositEvent; eventName: string };
    const decodedData = decodedResult.args;
    const proofInput = {
      root: $u.BNToDecimal(decodedData.root),
      nullifierHash: proofElement.nullifierHash,
      recipient: addr,
      secret: $u.BN256ToBin(proofElement.secret).split(''),
      nullifier: $u.BN256ToBin(proofElement.nullifier).split(''),
      hashPairings: decodedData.hashPairings.map((n) => $u.BNToDecimal(n)),
      hashDirections: decodedData.pairDirection,
    };
    //TODO: add types for window
    const SnarkJS = (window as any)['snarkjs'];
    const { proof, publicSignals } = await SnarkJS.groth16.fullProve(
      proofInput,
      '/withdraw.wasm',
      '/setup_final.zkey'
    );
    const callInputs = [
      proof.pi_a.slice(0, 2).map($u.BNToDecimal),
      proof.pi_b
        .slice(0, 2)
        .map((row: BigInt[]) => $u.reverseCoordinate(row.map($u.BNToDecimal))),
      proof.pi_c.slice(0, 2).map($u.BNToDecimal),
      publicSignals.slice(0, 2).map($u.BNToDecimal),
    ];
    return { callInputs, amount: proofElement.amount };
  } catch (err) {
    throw err;
  }
};

export const useVerifyProof = () => {
  const account = useAccount();

  const verifyProof = useCallback(
    async (proofElementStr: string) => {
      const proofResult = await generateProof(
        proofElementStr,
        account.address!
      );
      if (!proofResult) throw 'failed to generate proof';
      const { callInputs, amount } = proofResult;
      const tx = await writeContract({
        abi: amount === 0.1 ? GhoTipAbi1 : GhoTipAbi5,
        address: amount === 0.1 ? GHOTIP_ADDR_1 : GHOTIP_ADDR_5,
        functionName: 'getVerifyResult',
        args: [...callInputs],
      });
      let transactionReceipt = await waitForTransaction({ hash: tx.hash });
    },
    [account]
  );

  return verifyProof;
};
