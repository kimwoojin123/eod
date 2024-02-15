import FundingFormButton from "../ui/Buttons/fundingFormButtons";
import FundingList from "../ui/funding/fundingList";

export default function Funding() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <FundingFormButton />
      </div>
      <h1 className="text-3xl font-semibold mb-4">펀딩 목록</h1>
      <FundingList />
    </div>
  );
}