import GhoTipBoard from './GhoTipBoard';
import GHOTab from './GHOTab';

export default function Home() {
  return (
    <main className="pt-[123px] flex min-h-screen flex-col items-center justify-between">
      <div className="grid grid-cols-2 justify-items-center gap-x-[43px] w-[65.3%]">
        <div className="px-[13px]">
          <GhoTipBoard />
        </div>
        <div className="px-[13px] w-full">
          <GHOTab />
        </div>
      </div>
    </main>
  );
}
