import { IdeaApplyButton, IdeaSearchButton, TeamSearchButton, FundingButton } from './Buttons/categoryButtons';
import { ReloadButton } from './Buttons/headButtons';

export default function Category(){
  return (
    <div className='flex flex-col w-1/5 h-screen bg-black justify-around items-center'>
      <ReloadButton />
      <IdeaApplyButton />
      <IdeaSearchButton />
      <TeamSearchButton />
      <FundingButton />
    </div>
  )
}