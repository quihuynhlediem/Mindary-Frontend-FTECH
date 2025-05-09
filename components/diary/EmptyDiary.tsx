import Lottie from "lottie-react";
import React from "react";
import loudlyCrying from "@/public/loudly-crying.json";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import useUserStore from "@/hooks/useUserStore";

const EmptyDiary = () => {
	const router = useRouter()
	const selectedDate = useUserStore((state) => state.selectedDate);
	// const setSelectedDate = useUserStore((state) => state.setSelectedDate);
	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-12 my-auto sm:py-32 lg:px-8">
			<div className="text-center flex flex-col space-y-6">
				{/* <img className="block" src="1466623.png" alt="logo" /> */}
				{/* <img className="primary w-50" src="/empty.svg" alt="logo" /> */}
				<div className="flex justify-center w-full">
					<Lottie
						className="size-48"
						animationData={loudlyCrying}
						loop={true}
					/>
				</div>
				<h1 className=" primary text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Oops!
				</h1>
				<p className="text-base leading-7 text-gray-600">
					You have not written anything here yet!
				</p>
				<Button className="" type="button" onClick={() => router.push(`/diary/${selectedDate}/input`)}>
					Start Writing
				</Button>
			</div>
		</main>
	);
};

export default EmptyDiary;