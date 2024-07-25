import { SignUp } from "@clerk/nextjs";
import "./signUp.css";

export default function Page() {
  return (
    <>
      <div className="sgnup">
        <SignUp />
      </div>
    </>
  );
}
