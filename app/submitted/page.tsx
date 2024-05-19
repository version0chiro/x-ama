import NavBar from "@/components/common/NavBar";

export default function Page() {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center ">
            <NavBar />
            <h1 className="text-4xl font-bold text-center">Thanks for leaving the message, this page has not been completed yet!</h1>
            {/* sarcastic remark */}
            <p className="text-center">The owner is too busy doing nothing it seems</p>
        </div>
    )
}