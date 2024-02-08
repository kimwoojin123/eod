import Category from "./ui/category";
import PopularIdeas from "./ui/main/popularIdeas";
import PopularTeams from "./ui/main/popularTeams";

export default function Home() {
  return (
    <div className='w-screen'>
      <div><Category /></div>
      <div className="flex">
      <PopularIdeas />
      <PopularTeams />
      </div>
    </div>
  );
}
