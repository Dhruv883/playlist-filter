"use client";
import CustomLayout from "@/components/CustomLayout";
import Link from "next/link";

export default function page() {
  return (
    <CustomLayout>
      <section className="h-full w-full bg-primary text-white flex flex-grow items-center justify-center font-manRope">
        <div className="flex flex-col gap-6 justify-center items-center px-2 mb-10 ">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Effortlessly Manage Your Playlist(s)
            </h1>
            <p className="max-w-[700px] mx-auto text-[#FAFAFA] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Classify, filter, and organize your playlists with our powerful
              playlist management app. Streamline your workflow and stay on top
              of your inbox.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-md bg-white text-black px-8 py-2 text-xl font-medium disabled:pointer-events-none hover:bg-white/85"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </CustomLayout>
  );
}
