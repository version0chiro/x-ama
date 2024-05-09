import { InputBox } from "@/components/common/InputBox";
import { SubmitButton } from "@/components/common/Button";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import { navigateToUsernamePage } from "@/utils/sqlQueries/checkUsername";

export default async function Index(params: { invalidUsername: boolean }) {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <NavBar />
      {
        params.invalidUsername &&
        <ErrorMessage errorTitle="Invalid UserName" errorDiscription="The username you entered is not present in our system, try to use a different username" />
      }
      <div>
        Welcome To X-AMA, please enter the username you would like to drop a message for!
        <form action={navigateToUsernamePage}>
          <InputBox name="username" placeholder="Enter UserName" />
          <SubmitButton text="Submit" />
        </form>
      </div>
      <Footer />
    </div>
  );
}
