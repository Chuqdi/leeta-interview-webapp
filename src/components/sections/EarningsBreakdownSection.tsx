import ThemeText from "../ui/ThemeText";
import Button from "../ui/Button";

export default function EarningsBreakdownSection() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-3">

        <div className="bg-white rounded-xl p-4 flex flex-col gap-1.5">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <ThemeText text="Today's Orders" className="text-grey" />
          <ThemeText text="50" weight="bold" fontSize={17} />
        </div>

        <div className="bg-white rounded-xl p-4 flex flex-col gap-1.5 flex-1">
          <svg className="w-6 h-6 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <ThemeText text="Today's earnings" className="text-grey" />
          <ThemeText text="₦350,050" weight="bold" fontSize={17} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <ThemeText text="Gas Price" className="text-grey" />
          <ThemeText text="₦350,050" weight="bold" fontSize={17} />
        </div>
        <Button title="Update Price" variant="secondary" className="h-10" />
      </div>
    </div>
  );
}