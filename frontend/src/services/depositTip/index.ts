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
const getApprove = async (amount: 0.1 | 0.5) => {
  const tx = await writeContract({
    abi: GhoTokenAbi,
    address: GHOTOKEN_ADDR,
    functionName: 'approve',
    args: [
      amount === 0.1 ? GHOTIP_ADDR_1 : GHOTIP_ADDR_5,
      ethers.utils.parseUnits(amount.toString(), 18),
    ],
  });
  let transactionReceipt = await waitForTransaction({
    hash: tx.hash,
    confirmations: 2,
  });

  return transactionReceipt;
};

//TODO:Abstract them into one function
const deposit = async (_commitment: string, amount: 0.1 | 0.5) => {
  const result = await writeContract({
    abi: amount === 0.1 ? GhoTipAbi1 : GhoTipAbi5,
    address: amount === 0.1 ? GHOTIP_ADDR_1 : GHOTIP_ADDR_5,
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

      //TODO:Test
      const approveReceipt = await getApprove(amount);
      let txHash = '';
      txHash = await deposit(newProofElements.commitment, amount);

      setProofElements((pre) => {
        if (!pre) {
          return [{ ...newProofElements, txHash, amount }];
        }
        return [{ ...newProofElements, txHash, amount }, ...pre];
      });
      return txHash;
    } catch (err) {
      throw err;
    }
  };
  return depositTip;
};
