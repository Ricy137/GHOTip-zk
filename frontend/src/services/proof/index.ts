import { atom } from 'jotai';

export interface ProofElement {
  nullifierHash: string;
  secret: string;
  nullifier: string;
  txHash: string;
}

//TODO:Test
export const proofElementsAtom = atom<ProofElement[] | null>(null);
// export const proofElementsAtom = atom<ProofElement[] | null>([
//   {
//     nullifierHash:
//       '14304286999648920585522324727022479860846740907623878159821378639228724013506',
//     secret:
//       '82908954923176240394959776961075850993579837736000852368555864819926509922426',
//     nullifier:
//       '80069080177034103971237640158424751916777474810212779258116308347633154284128',
//     txHash:
//       '0xd2a5e8f7a631d683e2c20b16c8ab0700eb71776afab2ff1c31d2704dc7526e6d',
//   },
// ]);
