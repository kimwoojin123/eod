import Category from "./ui/category";
import PopularFundingList from "./ui/main/popularFunding";
import PopularIdeas from "./ui/main/popularIdeas";
import PopularTeams from "./ui/main/popularTeams";

export default function Home() {
  return (
    <div className='w-screen'>
      <div><Category /></div>
      <div className="flex justify-around">
      <PopularIdeas />
      <PopularTeams />
      <PopularFundingList />
      </div>
    </div>
  );
}
