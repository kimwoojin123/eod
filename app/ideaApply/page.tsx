import { IdeaWriteButton, IdeaDrawButton } from "../ui/Buttons/ideaApplyButtons"
import BackButton from "../ui/Buttons/backButton"
import { connectDB } from "../db"


export default function IdeaApply(){
  return (
    <div>
      <div className="relative top-10 left-10">
      <BackButton />
      </div>
      <div className="flex h-screen justify-around items-center">
        <IdeaWriteButton />
        <IdeaDrawButton />
      </div>
    </div>
  )
}