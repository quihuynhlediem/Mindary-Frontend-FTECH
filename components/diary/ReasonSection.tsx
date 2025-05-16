// "use client";
// import React from "react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// type Correllation = {
//     name: string;
//     term: string;
//     description: string;
//     bgColor: "bg-blue-100" | "bg-red-100" | "bg-orange-100" | "bg-purple-100";
// };

// const ReasonSection = () => {
//     const diary = useAtomValue(diaryAtom)!;

//     const reasons = diary.data[0].correlationObjects[0].map((c, idx) => {
//         return {
//             name: c.name.split(" - ")[0],
//             term: c.name.split(" - ")[1],
//             description: c.description,
//             bgColor:
//                 idx == 1
//                     ? "bg-blue-100"
//                     : idx == 2
//                         ? "bg-orange-100"
//                         : idx == 3
//                             ? "bg-red-100"
//                             : "bg-purple-100",
//         } as Correllation;
//     });

//     return (
//         <div className="py-8">
//             <h2 className="text-2xl font-bold text-center mb-6">
//                 What may affect your emotion
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
//                 {reasons.map((reason, index) => (
//                     <div
//                         key={index}
//                         className={`${reason.bgColor} p-4 rounded-lg flex flex-col items-center relative ${index === reasons.length - 1 && reasons.length % 2 !== 0 ? "md:col-span-2" : ""}`}
//                     >
//                         <h3 className="text-xl font-semibold mb-2 text-left w-full">
//                             {reason.name}
//                         </h3>
//                         <div className="flex justify-between w-full">
//                             <p className="text-gray-600 mb-4">{reason.term}</p>
//                         </div>
//                         <DropdownMenu>
//                             <DropdownMenuTrigger>
//                                 <img
//                                     src="/toggle.svg"
//                                     alt="Toggle"
//                                     className="cursor-pointer hover:bg-gray-200 absolute bottom-2 right-2"
//                                 />
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent className="w-48 h-64">
//                                 <DropdownMenuLabel>{reason.name}</DropdownMenuLabel>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuItem>{reason.description}</DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ReasonSection;