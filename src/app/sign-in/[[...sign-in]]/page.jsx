import { SignIn } from "@clerk/nextjs";
import './signIn.css'

export default function Page() {
  return (
    <>
      <div className="sgnin">
        <SignIn />
      </div>
    </>
  );
}
