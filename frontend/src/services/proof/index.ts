import { atom, useSetAtom } from 'jotai';

export interface ProofElement {
  nullifierHash: string;
  secret: string;
  nullifier: string;
  txHash: string;
  amount: 0.1 | 0.5;
}

export const proofElementsAtom = atom<ProofElement[] | null>(null);

export const useClearProofElements = () => {
  const setProofElement = useSetAtom(proofElementsAtom);

  const clearProofElements = () => {
    setProofElement(null);
  };

  return clearProofElements;
};
