import Category from "./ui/category";
import PopularIdeas from "./ui/main/popularIdeas";

export default function Home() {
  return (
    <div className='w-screen'>
      <div><Category /></div>
      <div><PopularIdeas /></div>
    </div>
  );
}
