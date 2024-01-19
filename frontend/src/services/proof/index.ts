import { atom } from 'jotai';

export interface ProofElements {
  nullifierHash: string;
  secret: string;
  nullifier: string;
  txHash: string;
}

export const proofElementsAtom = atom<ProofElements | null>(null);
