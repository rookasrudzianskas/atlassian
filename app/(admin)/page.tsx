import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 bg-white m-10 rounded-md w-full">
      <h1 className={'text-4xl font-light'}>
        Welcome to{" "}
        <span className={'text-[#64B5F5] font-semibold'}>Atlassian</span>
      </h1>
      <h2 className={'mt-2 text-xl font-light'}>
        Your custom AI chatbot assistant to help you with your customer support needs.
      </h2>

      <Link href={'/create-chatbot'}>
        <Button className={'bg-[#64B5F5] text-white p-3 rounded-md mt-5'}>Create chatbot</Button>
      </Link>
    </main>
  );
}
