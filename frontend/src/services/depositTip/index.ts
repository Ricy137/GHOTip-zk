import { ethers } from 'ethers';
import { useSetAtom } from 'jotai';
import { writeContract } from 'wagmi/actions';
import GhoTokenAbi from '@/utils/contracts/GhoTokenAbi.json';
import GhoTipAbi from '@/utils/contracts/GhoTipAbi.json';
import $u from '@/utils/zkUtils';
import wc from '@/utils/circuit/witness_calculator';
import { GHOTOKEN_ADDR, GHOTIP_ADDR } from '@/utils/constants';
import { proofElementsAtom } from '../proof';

const getApprove = async (amount: number) => {
  const tx = await writeContract({
    abi: GhoTokenAbi,
    address: GHOTOKEN_ADDR,
    functionName: 'approve',
    args: [GHOTIP_ADDR, ethers.utils.parseUnits(amount.toString(), 18)],
  });

  return tx.hash;
};

const deposit = async (_commitment: string) => {
  const result = await writeContract({
    abi: GhoTipAbi,
    address: GHOTIP_ADDR,
    functionName: 'deposit',
    args: [_commitment],
  });
  return result.hash;
};

const generateProofElements = async () => {
  try {
    const secret = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toString();
    const nullifier = ethers.BigNumber.from(
      ethers.utils.randomBytes(32)
    ).toString();
    const input = {
      secret: $u.BN256ToBin(secret).split(''),
      nullifier: $u.BN256ToBin(nullifier).split(''),
    };
    var res = await fetch('/deposit.wasm');
    var buffer = await res.arrayBuffer();
    var depositWC = await wc(buffer);

    const r = await depositWC.calculateWitness(input, 0);

    const commitment = r[1];
    const nullifierHash = r[2];
    return {
      commitment: commitment.toString(),
      nullifierHash: nullifierHash.toString(),
      secret,
      nullifier,
    };
  } catch (err) {
    throw err;
  }
};

export const useDepositTip = () => {
  const setProofElements = useSetAtom(proofElementsAtom);

  const depositTip = async (amount: number) => {
    try {
      const newProofElements = await generateProofElements();

      const approveTx = await getApprove(amount);

      const txHash = await deposit(newProofElements.commitment);
      setProofElements({ ...newProofElements, txHash });
      return txHash;
    } catch (err) {
      throw err;
    }
  };
  return depositTip;
};
