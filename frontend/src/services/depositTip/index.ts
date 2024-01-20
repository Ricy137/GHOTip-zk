import { ethers } from 'ethers';
import { useSetAtom } from 'jotai';
import { writeContract, waitForTransaction } from 'wagmi/actions';
import GhoTokenAbi from '@/utils/contracts/GhoTokenAbi.json';
import GhoTipAbi1 from '@/utils/contracts/GhoTipAbi1.json';
import GhoTipAbi5 from '@/utils/contracts/GhoTipAbi5.json';
import $u from '@/utils/zkUtils';
import wc from '@/utils/circuit/witness_calculator';
import { GHOTOKEN_ADDR, GHOTIP_ADDR_1, GHOTIP_ADDR_5 } from '@/utils/constants';
import { proofElementsAtom } from '../proof';

export interface TipDetails {
  totalTip: number;
  tip1: number;
  tip5: number;
}
const getApprove = async (amount: number) => {
  const tx = await writeContract({
    abi: GhoTokenAbi,
    address: GHOTOKEN_ADDR,
    functionName: 'approve',
    args: [GHOTIP_ADDR_1, ethers.utils.parseUnits(amount.toString(), 18)],
  });
  let transactionReceipt = await waitForTransaction({ hash: tx.hash });

  return transactionReceipt;
};

//TODO:Abstract them into one function
const deposit1 = async (_commitment: string) => {
  const result = await writeContract({
    abi: GhoTipAbi1,
    address: GHOTIP_ADDR_1,
    functionName: 'deposit',
    args: [_commitment],
  });
  return result.hash;
};

const deposit5 = async (_commitment: string) => {
  const result = await writeContract({
    abi: GhoTipAbi5,
    address: GHOTIP_ADDR_1,
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

  const depositTip = async (amount: 0.1 | 0.5) => {
    try {
      const newProofElements = await generateProofElements();

      const approveReceipt = await getApprove(amount);
      let txHash = '';
      if (amount === 0.1) {
        txHash = await deposit1(newProofElements.commitment);
      } else {
        txHash = await deposit5(newProofElements.commitment);
      }

      setProofElements((pre) => {
        if (!pre) {
          return [{ ...newProofElements, txHash }];
        }
        return [{ ...newProofElements, txHash }, ...pre];
      });
      return txHash;
    } catch (err) {
      throw err;
    }
  };
  return depositTip;
};
