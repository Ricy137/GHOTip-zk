import GhoTipBoard from './GhoTipBoard';
import GHOTab from './GHOTab';

export default function Home() {
  return (
    <main className="pt-[123px] flex min-h-screen flex-col items-center justify-between 2xl:justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-[43px] md:w-3/4 lg:w-[65.3%] max-w-[1440px]">
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
