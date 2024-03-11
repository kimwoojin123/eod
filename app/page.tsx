import Category from "./ui/category";
import PopularFundingList from "./ui/main/popularFunding";
import PopularIdeas from "./ui/main/popularIdeas";
import PopularTeams from "./ui/main/popularTeams";

export default function Home() {
  return (
    <div className="flex justify-around pt-10">
      <PopularIdeas />
      <PopularTeams />
      <PopularFundingList />
    </div>
    );
}