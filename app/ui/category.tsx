import { IdeaApplyButton, IdeaSearchButton, TeamSearchButton, FundingButton } from './Buttons/categoryButtons';

export default function Category(){
  return (
    <div className='flex h-32 bg-gray-100 justify-around items-center'>
      <IdeaApplyButton />
      <IdeaSearchButton />
      <TeamSearchButton />
      <FundingButton />
    </div>
  )
}