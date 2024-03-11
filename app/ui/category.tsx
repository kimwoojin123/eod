import { IdeaApplyButton, IdeaSearchButton, TeamSearchButton, FundingButton } from './Buttons/categoryButtons';
import { ReloadButton } from './Buttons/headButtons';

export default function Category(){
  return (
    <div className='category flex flex-col items-start h-full bg pl-7 pt-7'>
      <div>
        <ReloadButton />
      </div>
      <div className='flex flex-col h-screen items-start pt-14'>
        <p className='text-white mb-4'>menu</p>
        <IdeaApplyButton />
        <IdeaSearchButton />
        <TeamSearchButton />
        <FundingButton />
        <p className='absolute bottom-5 category-menu flex left-32'>EOD v1.0.0</p>
      </div>
    </div>
  )
}