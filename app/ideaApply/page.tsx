import { IdeaWriteButton, IdeaDrawButton } from "../ui/Buttons/ideaApplyButtons"

export default function IdeaApply(){
  return (
    <div className="flex">
      <IdeaWriteButton />
      <IdeaDrawButton />
    </div>
  )
}