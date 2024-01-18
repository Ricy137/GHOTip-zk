import GhoTipBoard from './GhoTipBoard';

export default function Home() {
  return (
    <main className="pt-[123px] flex min-h-screen flex-col items-center justify-between">
      <div className="grid grid-cols-2 justify-items-center gap-x-[43px] w-[65.3%]">
        <div className="px-[13px]">
          <GhoTipBoard />
        </div>
        <div className="px-[13px]">456</div>
      </div>
    </main>
  );
}
