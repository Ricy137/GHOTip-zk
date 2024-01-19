'use client';
import { useAtomValue } from 'jotai';
import ClipBoard from '@/components/ClipBoard';
import { shortenStr } from '@/utils/stringUtil';
import { ProofElement, proofElementsAtom } from '@/services/proof';

const ProofModal: React.FC = () => {
  const proofElements = useAtomValue(proofElementsAtom);
  return (
    <div className="flex flex-col gap-y-[4px]">
      {proofElements?.map((proofElement, index) => (
        <ProofItem index={index} proofElement={proofElement} />
      ))}
    </div>
  );
};

export default ProofModal;

interface ProofItemProps {
  index: number;
  proofElement: ProofElement;
}

const ProofItem: React.FC<ProofItemProps> = ({ index, proofElement }) => {
  const proofElementString = btoa(JSON.stringify(proofElement));
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-x-[5px]">
        <ClipBoard content={proofElementString} />
        <span className="text-[16px] font-semibold leading-[24px]">
          Proof #{index}
        </span>
      </div>
      <div className='className="text-[16px] font-semibold leading-[24px]"'>
        {shortenStr({ str: proofElementString })}
      </div>
    </div>
  );
};
