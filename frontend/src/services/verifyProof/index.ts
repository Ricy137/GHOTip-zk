import { useCallback } from 'react';
import { decodeEventLog } from 'viem';
import { useAccount } from 'wagmi';
import { writeContract } from 'wagmi/actions';
import $u from '@/utils/zkUtils';
import GhoTipAbi from '@/utils/contracts/GhoTipAbi.json';
import { GHOTIP_ADDR_1 } from '@/utils/constants';
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
      abi: GhoTipAbi,
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
    return callInputs;
  } catch (err) {
    throw err;
  }
};

export const useVerifyProof = () => {
  const account = useAccount();

  const verifyProof = useCallback(
    async (proofElementStr: string) => {
      const callInputs = await generateProof(proofElementStr, account.address!);
      if (!callInputs) throw 'failed to generate proof';
      const tx = await writeContract({
        abi: GhoTipAbi,
        address: GHOTIP_ADDR_1,
        functionName: 'getVerifyResult',
        args: [...callInputs],
      });
      debugger;
    },
    [account]
  );

  return verifyProof;
};
