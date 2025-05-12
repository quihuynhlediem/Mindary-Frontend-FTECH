"use client";

import { MeditationProp } from "../types/meditation";
import { fetchMeditations } from "../actions";
import { useInView } from "react-intersection-observer";
import React, { act, createRef, useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import Hls from "hls.js";
import { CloseIcon } from "@/components/ui/CloseIcon";
import { CustomSlider, formatTime } from "@/components/ui/audio-player";
import { Button } from "@/components/ui/button";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Key,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Page() {
    const [active, setActive] = useState<(MeditationProp[])[number] | boolean | null>(null)
    const ref1 = useRef<HTMLDivElement>(null)
    //const playerRef = createRef<HTMLVideoElement>();
    const [meditations, setMeditations] = useState<MeditationProp[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const videoRef = useRef<HTMLAudioElement>(null);

    // const meditations: MeditationProp[] = [
    //     {
    //         "_id": "d7w3j7p4u1v0u2b6e8w2y0k7z4m1n9g8t2s1g5e0",
    //         "author": "Jennifer Piercy",
    //         "description": "Sleep is so essential and yet sometimes so elusive. This soothing yoga nidra practice with Jennifer offers us tools to induce sleep naturally, connecting within the body. Use as you transition into sleep, or as a way to bring meditation into napping, or other downtime periods to hold space for deeper rejuvenation. This track will be a friend to your rest, relaxation and sleep rhythms.",
    //         "media_length": 1341,
    //         "media_url": "https://libraryitems.insighttimer-api.net/d7w3j7p4u1v0u2b6e8w2y0k7z4m1n9g8t2s1g5e0/hls/v1/index.m3u8",
    //         "picture_url": "https://libraryitems.insighttimer.com/d7w3j7p4u1v0u2b6e8w2y0k7z4m1n9g8t2s1g5e0/pictures/tiny_rectangle_xlarge.jpeg",
    //         "tags": [
    //             "vitalenergy",
    //             "spiritual",
    //             "relax",
    //             "sleep",
    //             "groundedhappy",
    //             "yoga",
    //             "parentspirituality",
    //             "yoganidra",
    //             "visualization",
    //             "tired",
    //             "sleepyoga",
    //             "insomnia",
    //             "circadianrhythm",
    //             "bedtime"
    //         ],
    //         "title": "Yoga Nidra For Sleep",
    //         "transcripts": " This particular practice focuses on helping you to sleep in whatever position you find yourself in. Whether you are seated on an airplane or bus, lying down on the floor, or in the comfort of your own bed, this will be a friend to your rest, relaxation, and sleep rhythms. Sleep is so essential and yet sometimes so elusive, and when we can't sleep it can be due to physical factors, mental and emotional factors, or a combination of both. Yoga Nidra offers us tools to induce sleep organically, following the natural workings of your own mind. Notice if you could be 5 or 10% more comfortable in whatever position you've chosen. Open your senses, taste inside the mouth, hearing, listening with ears and whole body, smell, welcoming the touch of air and aroma inside the nostrils, and vision, relaxing the eyes from the world of looking and seeing, internal vision opening. And feel the skin, the touch of air temperature, the touch of your clothes, and the touch of the ground. Now set your sankalpa, your intention, or deep resolve for this practice. Ask yourself, in your life right now, what is your deepest, most heartfelt desire? Think of this as a little seed that you're planting into your time in the world of sleep, like a blessing that you sprinkle over your passage through sleep. As you contemplate your sankalpa, see and feel your life with the fulfillment of this desire. What would your life look, sound, smell, taste and feel like if this deepest desire were a reality? Repeat your sankalpa three times in your own words from your heart in the present tense, like a mantra. Then give thanks and let it go. Now allow your attention to be spontaneously drawn into the breath without needing to control it or manipulate it. The breath breathing you. And as you relax into the simplicity of being breathed. Notice how your body spreads like water. And feel how within this body of water there is a rhythm, a tide, waves of respiration ebbing and flowing. Feel how awareness of the tide of your breathing can deepen awareness of the flow of all life. See and feel how the simple process of releasing and welcoming a quiet breath is mirrored in the flow of a day in your life. As day flows into night and night flows into day. Touched by the transition spaces of dawn and dusk. And see and feel how it's mirrored in the seasons of your life. As winter flows into summer. And summer flows into winter. Touched by the transition spaces of autumn and spring. Releasing into being breathed. Now begin to count back on each exhalation until you reach zero from ten. Rest awareness at your heart and each time you exhale count back. As though you could shed a layer or drop down a layer with each out-breath. Now bring your awareness to the hollow space of your throat. The tongue. Jaws. Sensations in the gums. Teeth. Lips. The entire mouth full of sensation. Cheeks. And cheekbones. Chin. Ears. And earlobes. Nose. And tip of nose. Both nostrils. Both eyeballs. And the space just underneath the eyeballs. Both eyelids full of sensation and awareness. Both eyebrows. And the space between the eyebrows. Temples. Forehead. Top of the head. Back of the skull. Back of the neck. The whole head as one orb of sensation. Now feel both shoulders from the inside. Both upper arms. Both elbows. Forearms. Wrists. Palms of the hands. Backs of the hands. Thumbs. Second fingers. Third fingers. Fourth fingers. Pinky fingers. Feel the spaces between the fingers. The tips of the fingers. Each finger like a little stream that flows into the space beyond. Now feel the chest and the upper back. Feel the rib cage and the middle back. Feel the belly and the low back. The pelvis and the buttocks. Both hips. Sensation in the thighs. Knees. And the space just underneath the knees. Lower legs. Ankles. Heels. Soles of the feet. Tops of the feet. Big toes. Second toes. Third toes. Fourth toes. Pinky toes. Feel the spaces between the toes. The tips of the toes. Each toe like a stream that flows into the space beyond. Feel the whole body at once. Each individual sensation melting into a mass of sensation. Feel the awareness of the whole body at once. Now let awareness sink even deeper. Feel the skin. And go beneath the skin feeling the insulating tissues. The warm substances. And deeper still to feel muscles. Letting muscles give up their command of the body committing them to rest. And deeper still into bones. And the layers inside the bones. As though the bones themselves could sigh a little. Feeling the bones carried on the currents of breath. And deeper still to feel the soft organs, the contents of your skeleton. The heartbeat slowing down. All the organs committed to rest. Feel the fluids and waterways in the body. And the cells humming, pulsing and glowing. Just like stars against a night sky. And you go deeper still and feel the energy behind or underneath these sensations. Now bring your attention to a sensation of heaviness. Welcoming the sensation of heaviness in some or all parts of the body. Now bring your attention to a sensation of lightness or weightlessness in some or all parts of the body. Go back and forth returning attention to the sensation of heaviness. Give yourself up to heaviness, relaxing into heaviness. And go back to the sensation of lightness or weightlessness. Give yourself up to lightness. Dissolving into weightlessness. Back to the sensation of heaviness. Arms and legs heavy and sinking. Head and torso heavy and sinking. And back to the sensation of lightness. Arms and legs floaty and weightless. Head and torso floating in space so light. Now feel both simultaneously, feel heavy and light at once. Don't try to think about this, just feel. Heaviness and lightness dissolving into each other. Now notice what is your direct experience of the body now. Is it solid? Is there a center? Let the body answer the question. Set your attention free to a feeling of just being. Nothing you need to do. Nothing you need to know or get or want. Having let go of any set identity, time and space. Notice what remains. Now let yourself fall back into the heart space. Emptying the mind completely of any images, thoughts, feelings, stories. Emptying completely into the heart space, falling back into a deep, deep rest."
    //     },
    //     {
    //         "_id": "j4z6g8n4h0y6f5t4u6n7p5t2e9w4c5d4g0n5a9s5",
    //         "author": "Kenneth Soares",
    //         "description": "Are you in need of a calming and relaxing ritual, so that you'll sleep deeply all night? Then this blissfully calm guided meditation is made for you. Sleep allows your Soul to travel out of your body back “home” to recharge, cleanse and bring back into your body pure cosmic life-force. As well as bringing more balance, clarity, and alignment to your coming day. May these tones and frequencies nourish your body, mind, and Soul - and lull you into the deepest rejuvenating and healing sleep yet. ",
    //         "media_length": 3665,
    //         "media_url": "https://libraryitems.insighttimer-api.net/j4z6g8n4h0y6f5t4u6n7p5t2e9w4c5d4g0n5a9s5/hls/v1/index.m3u8",
    //         "picture_url": "https://libraryitems.insighttimer.com/j4z6g8n4h0y6f5t4u6n7p5t2e9w4c5d4g0n5a9s5/pictures/tiny_rectangle_xlarge.jpeg",
    //         "tags": [
    //             "visualization",
    //             "consciousness",
    //             "parentspirituality",
    //             "relaxationmeditation",
    //             "relax",
    //             "groundedhappy",
    //             "deepsleep",
    //             "relaxation",
    //             "guidedimagery",
    //             "sleepmeditation",
    //             "insomnia",
    //             "sleepingdeeply"
    //         ],
    //         "title": "Deep Sleep Guided Meditation",
    //         "transcripts": " Allow yourself to settle down comfortably now. When you are comfortable, think about being supported. When you become aware of how the chair is touching your back or how the bed is supporting your body or just how the ground or the floor is supporting you. Just allow your eyes to close now. If at any time you want to move to make yourself even more comfortable, you can do that because you are in control. And now take a deep breath and hold it. And when you let it out, slowly now, just let your body relax. That's right. Just relax as far as you are comfortable. And now take another deep breath and hold it. And when you let it out, slowly now, release all the tension in your body. That's right. Just allow yourself to relax completely. And when you are ready, take another deep breath and hold it. And when you let it out, slowly now, and this time really let go. Your breathing can just flow now in your natural rhythm. The natural rise and fall of your breathing will automatically help you relax more and more. You can rest assured that your body knows how to do that for you and will continue to do so now as you listen to the sound of my voice. You may even find that whatever you hear from now on only helps to relax you. Allow your arms and legs and hands and head to go limp and loose and floppy. Just like a rag doll or imagine an old coat thrown across a chair. And I wonder now if you can begin with letting all the muscles in your face relax, especially in your jaw. This is a place where tension sometimes gathers, so let your teeth part just a little bit. Feel relaxation moving into your temples. And as you think about relaxing these muscles, they will relax. Feel them relax and as they relax, as you relax, you will be able to just drift and flow into a deeper and deeper level of total relaxation. Letting your unconscious soak in any and every positive word, thought or idea that I offer you while you just drift more and more comfortably into relaxation. As you continue to relax, let all of the muscles in your forehead relax. Feel those muscles smooth, smooth and relaxed. You can rest your eyes. Just imagine your eyelids feeling so comfortable, so heavy, so relaxed. Like an ice cube melting in warm water. Like the muscles inside the eyes, around the eyes and behind the eyes melt and relax. And now let all of the muscles in the back of your neck and shoulders relax. Feel them letting go, as if a weight is being lifted off your shoulders. And feel that soothing relaxation moving down your back. Moving down, down, down to the lower part of your back. And as those muscles let go with every breath you take, just allow yourself to experience here and now. You can focus on the relative silence between the words. Like focusing on the spaces of light in between the branches of a tree, instead of the tree itself. Looking at the space and the shape of the space between the branches. Let go of all the muscles in your arms, running down from your shoulders, down through your elbows to your wrists, down to your fingertips. Relax. Some people even get a little surprised when they notice tingling sensation in their hands or fingertips. Other people notice a kind of numbness or heaviness or floating feeling. And I don't know which arm is heavier than the other, or if the other is lighter than the first. In your own way, in your own pace, safe and naturally relaxed. Feeling a pleasant wave of relaxation flowing down through your chest, into your tummy. Relaxing all of the muscles in your stomach. As if with every breath you take, you can just feel yourself drifting deeper and deeper into relaxation and calmness. And it's good to know that your unconscious mind knows exactly the depth of relaxation that is fine for you right now to drift off as you listen to the space and the silence between the sentences. Imagine all of the muscles in your legs relax as you breathe down relaxation down and down through your hips, thighs, knees, ankles, right way down to the tips of your toes. How very comfortable your body is feeling. Just drifting and floating into relaxation. Maybe there's a tingling sensation in your feet or toes. Maybe there's a heaviness or lightness, a warmth, a coolness. There is no right or wrong way to relax now. It's just your way and you're doing good. Feel your body drifting, floating down deeper, down deeper into total, natural, safe relaxation. Let your muscles go, relaxing more and more. And while your conscious mind is aware of some of the changes, your unconscious is aware of everything, everything that happens automatic inside of you and is safe and positive to know that your unconscious mind is taking care of all those things, all the organs cooperating. All the hormones, chemical reactions, the neurological signals, automatically it just happens. Just like relaxing happens automatically. And you're doing good. It's nice to begin to appreciate that you have a conscious mind and an unconscious mind. And while your conscious mind can be aware of the feeling of that hand or that foot or the sounds of my words, your unconscious mind is aware of far more. Your unconscious mind is aware of everything happening here and now. And everything that has ever happened to you and your unconscious mind also learns in a variety of ways so you can really just let it do the work for you for a while while you just let go. That's right. Let go as naturally as the tree lets go of the leaves. That feeling of relaxation flowing throughout your body and wondering if that hand or the other is becoming heavier than the first. Or which leg is sinking more deeply into relaxation. Instead of the tree itself looking at the space and the shape of the space between the branches. You flow in the space into relaxation. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. Other people notice. I don't know which one is heavier than the other. The other is lighter. The other is lighter. flowing down through your chest into your tummy. Relaxing all of the muscles in your stomach. As if with every breath you take, you can just feel yourself drifting deeper and deeper into relaxation and calmness. And it's good to know that your unconscious mind knows exactly the depth of relaxation that is fine for you right now. So you can drift off. As you listen to the space between the sentences. Imagine all of the muscles in your legs. Relax as you breathe down relaxation, down, down, through your hips, thighs, knees, ankles, right, way down to the tips of your toes. How very comfortable your body is feeling. Just drifting and floating into relaxation. Maybe there's a tingling sensation in your feet or toes. Maybe there's a heaviness or lightness, a warmth, a coolness. There is no right or wrong way to relax now. It's just your way. And you're doing good. And you're doing good. And you're doing good. And you're doing good. Feel your body drifting, floating, down, deeper. And the total, natural, same relaxation. Let your muscles go relaxing in a moment. And while your conscious mind is aware of some of the changes, your unconscious is aware of everything. Everything that happens automatically inside of you. And it's safe and positive to know that your unconscious mind is taking care of all those things. All the organs cooperating. All the hormones, chemical reactions, the neurological signals. Automatically, it just happens. Just like relaxing happens automatically. And you're doing good. And you're doing good. You You Then you have a conscious mind and a conscious mind And while your conscious mind can be aware of the feeling of that hand or that foot or the sounds of my words Your unconscious mind is aware of far more. Your unconscious mind is aware of everything happening here and now And everything that has ever happened to you and your unconscious mind also learns in a variety of ways So you can really just let it do the work for you for a while while you just let go That's right, let go as naturally as the tree lets go of the leaves The feeling of relaxation flowing throughout your body and wondering if that hand or the other is becoming heavier than the first Or which leg is sinking more deeply into relaxation Instead of the tree itself Looking at the space and the shape of the space between the branches You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation"
    //     },
    // ]

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false)
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        window.addEventListener("keydown", onKeyDown)

        return () => window.removeEventListener("keydown", onKeyDown)
    }, [active])

    useOutsideClick(
        ref1,
        () => setActive(null),
        () => setDuration(0)
    );


    //Initial load
    useEffect(() => {
        loadMoreMeditations();
    }, []);

    // Load more when scrolled to bottom
    useEffect(() => {
        if (inView && hasMore && !loading) {
            loadMoreMeditations();
        }
    }, [inView, hasMore, loading]);

    const loadMoreMeditations = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            //console.log(`Loading page ${page}...`);
            const newData = await fetchMeditations(page);

            if (newData && newData.length > 0) {
                setMeditations(prev => [...prev, ...newData]);
                setPage(prev => prev + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading meditations:", error);
        } finally {
            setLoading(false);
        }
    };

    // HLS.js setup
    useEffect(() => {
        const hls = new Hls({
            debug: true,
        });


        if (Hls.isSupported() && videoRef.current && active && typeof active === "object") {
            hls.loadSource(active.media_url);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.ERROR, (err) => {
                console.log(err);
            });

        } else {
            console.log("load");
        }
        return () => {
            // cleanup (when component destroyed or when useEffect runs twice on StrictMode)
            hls.destroy();
        };
    }, [active]);



    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress =
                (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(isFinite(progress) ? progress : 0);
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (value: number) => {
        if (videoRef.current && videoRef.current.duration) {
            const time = (value / 100) * videoRef.current.duration;
            if (isFinite(time)) {
                videoRef.current.currentTime = time;
                setProgress(value);
            }
        }
    };

    const handleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
    };


    return (
        <div className="py-6 px-10 flex flex-col gap-8">
            <h2 className="text-3xl font-bold">Meditation library</h2>

            <section>
                <AnimatePresence>
                    {active && typeof active === "object" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 h-full w-full z-10"
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {active && typeof active === "object" ? (
                        <div className="fixed inset-0 grid place-items-center z-[100]">
                            <motion.div
                                layoutId={`card-${active._id}`}
                                ref={ref1}
                                className="relative flex flex-col mx-auto rounded-3xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm p-3 w-[280px] h-auto"
                                // className="w-[90%] h-[90%] sm:w-[90%]  flex flex-col items-center bg-white dark:bg-neutral-900 rounded-2xl overflow-y-auto"
                                // initial={{ opacity: 0, filter: "blur(10px)" }}
                                // animate={{ opacity: 1, filter: "blur(0px)" }}
                                // exit={{ opacity: 0, filter: "blur(10px)" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                    delay: 0.1,
                                    type: "spring",
                                }}
                                layout
                            >
                                <audio
                                    ref={videoRef}
                                    onTimeUpdate={handleTimeUpdate}
                                    className="hidden"
                                />

                                <motion.div
                                    className="flex flex-col relative"
                                    layout
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    {/* Cover  */}
                                    {active.picture_url && (
                                        <motion.div className="bg-white/20 overflow-hidden rounded-[16px] h-[180px] w-full relative">
                                            <img
                                                src={active.picture_url}
                                                alt="cover"
                                                className="!object-cover w-full my-0 p-0 !mt-0 border-none !h-full"
                                            />
                                        </motion.div>
                                    )}

                                    <motion.div className="flex flex-col w-full gap-y-2">
                                        {/* Title */}
                                        {active.title && (
                                            <motion.h3 className="text-white font-bold text-base text-center mt-1">
                                                {active.title}
                                            </motion.h3>
                                        )}

                                        {/* Slider */}
                                        <motion.div className="flex flex-col gap-y-1">
                                            <CustomSlider
                                                value={progress}
                                                onChange={handleSeek}
                                                className="w-full"
                                            />
                                            <div className="flex items-center justify-between">
                                                <span className="text-white text-sm">
                                                    {formatTime(currentTime)}
                                                </span>
                                                <span className="text-white text-sm">
                                                    {formatTime(duration)}
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Controls */}
                                        <motion.div className="flex items-center justify-center w-full">
                                            <div className="flex items-center gap-2 w-fit bg-[#11111198] rounded-[16px] p-2">

                                                {/* Shuffle button */}
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleShuffle();
                                                        }}
                                                        className={cn(
                                                            "text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full",
                                                            isShuffle && "bg-[#111111d1] text-white"
                                                        )}
                                                    >
                                                        <Shuffle className="h-5 w-5" />
                                                    </Button>
                                                </motion.div>

                                                {/* SkipBack button */}
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                                                    >
                                                        <SkipBack className="h-5 w-5" />
                                                    </Button>
                                                </motion.div>

                                                {/* Play/Pause button */}
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            togglePlay();
                                                        }}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                                                    >
                                                        {isPlaying ? (
                                                            <Pause className="h-5 w-5" />
                                                        ) : (
                                                            <Play className="h-5 w-5" />
                                                        )}
                                                    </Button>
                                                </motion.div>

                                                {/* SkipForward button */}
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                                                    >
                                                        <SkipForward className="h-5 w-5" />
                                                    </Button>
                                                </motion.div>

                                                {/* Repeat button */}
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRepeat();
                                                        }}
                                                        className={cn(
                                                            "text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full",
                                                            isRepeat && "bg-[#111111d1] text-white"
                                                        )}
                                                    >
                                                        <Repeat className="h-5 w-5" />
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>

                            </motion.div>
                        </div>

                        // <div className="fixed inset-0  grid place-items-center z-[100] ">
                        //     <motion.button
                        //         key={`button-${active.title}-${active._id}`}
                        //         layout
                        //         initial={{
                        //             opacity: 0,
                        //         }}
                        //         animate={{
                        //             opacity: 1,
                        //         }}
                        //         exit={{
                        //             opacity: 0,
                        //             transition: {
                        //                 duration: 0.05,
                        //             },
                        //         }}
                        //         className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                        //         onClick={() => setActive(null)}
                        //     >
                        //         <CloseIcon />
                        //     </motion.button>

                    ) : null
                    }
                </AnimatePresence >

                <ul className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start gap-4">
                    {meditations.map((med) => (
                        <motion.div
                            layoutId={`card-${med._id}`}
                            key={med._id}
                            onClick={() => {
                                setActive(med);            
                                //setDuration(med.media_length);
                                //ref1.current?.getElementsByClassName("css-1vobpas")[0].setAttribute("style", "background: red;");

                            }}
                            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                        >
                            <div className="flex gap-2 flex-col  w-full">
                                <motion.div
                                    className="relative"
                                    layoutId={`image-${med._id}`}
                                >
                                    <img
                                        width={500}
                                        height={100}
                                        src={med.picture_url}
                                        alt={med.title}
                                        className="h-60 w-full rounded-2xl object-cover object-top"
                                    />
                                    <div
                                        className="bg-black/50 w-fit absolute bottom-1 left-1  text-white text-xs font-semibold px-2 py-1 rounded-full"
                                    >
                                        <p>
                                            {med.media_length >= 3600
                                                ? `${Math.floor(med.media_length / 3600)} hour`
                                                : `${Math.floor(med.media_length / 60)} min`}
                                        </p>
                                    </div>
                                </motion.div>
                                <div className="flex justify-center flex-col">
                                    <motion.h3
                                        layoutId={`title-${med._id}`}
                                        className="font-semibold text-neutral-800 dark:text-neutral-200 text-left text-base"
                                    >
                                        {med.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`author-${med._id}`}
                                        className="text-sm font-normal text-neutral-600 dark:text-neutral-400 text-left "
                                    >
                                        {med.author}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </ul>
            </section >

            {/* Loading indicator and observer element */}
            < div
                ref={ref}
                className="w-full flex justify-center items-center h-20 mt-4"
            >
                <p className={`animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 ${hasMore ? 'block' : 'hidden'}`}></p>
            </div >
        </div >
    );
}