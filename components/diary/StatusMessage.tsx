// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAtomValue } from "jotai";
// import { diaryAtom } from "./DailyUserDiary";

// enum Mood {
//     Down = 1,
//     Okay,
//     Good,
//     Happy,
//     Fantastic,
// }

// const StatusMessage = () => {
//     const [moodRating, setMoodRating] = useState<Mood | null>(null);
//     const diary = useAtomValue(diaryAtom)!;
//     // const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchMoodRating = async () => {
//             try {
//                 const response = await axios.get("/api/moodObjects/emotionLevel"); // nay la api endpoint
//                 const moodLevel = response.data.moodLevel;
//                 setMoodRating(moodLevel);
//             } catch (error) {
//                 console.error("Error fetching mood rating:", error);
//             }
//         };

//         fetchMoodRating();
//     }, []);

//     // if (loading) {
//     //     return <div>Loading...</div>;
//     // }

//     const moodDescriptions = diary.data[0].moodObjects[0].category
//         .join(", ")
//         .toLowerCase();

//     const description = `Today you feel ${moodDescriptions}`;
//     return (
//         <div className="text-center text-2xl font-bold pb-3">
//             <h2 className="text-headline-1">{description}</h2>
//         </div>
//     );
// };

// export default StatusMessage;