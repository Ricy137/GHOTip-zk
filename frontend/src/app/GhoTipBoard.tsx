import Image from 'next/image';
import GHO from '@/assets/icons/GHO.png';

const GhoTipBoard: React.FC = () => {
  return (
    <div className="pt-[26px] flex flex-col gap-y-[18px]">
      <div className="flex flex-row gap-x-[8px]">
        <Image
          className="w-[22px] h-[30px]"
          src={GHO}
          width={22}
          height={30}
          alt="GHOTip logo"
        />
        <div className="text-[24px] font-semibold">GHO Tip</div>
      </div>
      <div>
        {/* <span>GHO Tip:</span> */}
        Effortlessly pay tips with the assurance of privacy, safety, and
        efficiency. Simplify your transactions now!
      </div>
    </div>
  );
};

export default GhoTipBoard;
