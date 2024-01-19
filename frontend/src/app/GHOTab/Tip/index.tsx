import Image from 'next/image';
import GHOLogo from '@/assets/icons/GHO.svg';
import { WrapperCard } from '@/components/Card';
import SimpleInput from '@/components/Input/SimpleInput';
import Button from '@/components/Button';

const Tip: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <WrapperCard
        color="purple"
        className="flex flex-row justify-between items-center min-h-[152px]"
      >
        <SimpleInput
          type="number"
          // defaultValue={0}
          placeholder="0"
          inputClassName="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <div className="flex flex-row items-center gap-x-[6px]">
          <div className="flex items-center justify-center w-[23px] h-[23px] border-[2px] border-black rounded-[11.5px]">
            <Image src={GHOLogo} alt="gho logo" />
          </div>
          <span className="text-[20px] font-medium">GHO</span>
        </div>
      </WrapperCard>
      <Button className="mt-[14px]" fullWidth color="purple" size="large">
        Tip
      </Button>
    </div>
  );
};

export default Tip;
