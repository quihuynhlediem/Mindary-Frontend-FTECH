"use client";

import { MeditationProp } from "../types/meditation";
import { fetchMeditations } from "../actions";
import { useInView } from "react-intersection-observer";
import React, { act, createRef, useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import Hls from "hls.js";
import { CloseIcon } from "@/components/ui/CloseIcon";
import CardBlurredCard from "@/components/MeditationCard";


export default function Page() {
    const [active, setActive] = useState<(MeditationProp[])[number] | boolean | null>(null)
    const ref1 = useRef<HTMLDivElement>(null)
    const playerRef = createRef<HTMLVideoElement>();
    //const [meditations, setMeditations] = useState<MeditationProp[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    const meditations: MeditationProp[] = [
        {
            "_id": "d7w3j7p4u1v0u2b6e8w2y0k7z4m1n9g8t2s1g5e0",
            "author": "Jennifer Piercy",
            "description": "Sleep is so essential and yet sometimes so elusive. This soothing yoga nidra practice with Jennifer offers us tools to induce sleep naturally, connecting within the body. Use as you transition into sleep, or as a way to bring meditation into napping, or other downtime periods to hold space for deeper rejuvenation. This track will be a friend to your rest, relaxation and sleep rhythms.",
            "media_length": 1341,
            "media_url": "https://libraryitems.insighttimer-api.net/d7w3j7p4u1v0u2b6e8w2y0k7z4m1n9g8t2s1g5e0/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/d7w3j7p4u1v0u2b6e8w2y0k7z4m1n9g8t2s1g5e0/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "vitalenergy",
                "spiritual",
                "relax",
                "sleep",
                "groundedhappy",
                "yoga",
                "parentspirituality",
                "yoganidra",
                "visualization",
                "tired",
                "sleepyoga",
                "insomnia",
                "circadianrhythm",
                "bedtime"
            ],
            "title": "Yoga Nidra For Sleep",
            "transcripts": " This particular practice focuses on helping you to sleep in whatever position you find yourself in. Whether you are seated on an airplane or bus, lying down on the floor, or in the comfort of your own bed, this will be a friend to your rest, relaxation, and sleep rhythms. Sleep is so essential and yet sometimes so elusive, and when we can't sleep it can be due to physical factors, mental and emotional factors, or a combination of both. Yoga Nidra offers us tools to induce sleep organically, following the natural workings of your own mind. Notice if you could be 5 or 10% more comfortable in whatever position you've chosen. Open your senses, taste inside the mouth, hearing, listening with ears and whole body, smell, welcoming the touch of air and aroma inside the nostrils, and vision, relaxing the eyes from the world of looking and seeing, internal vision opening. And feel the skin, the touch of air temperature, the touch of your clothes, and the touch of the ground. Now set your sankalpa, your intention, or deep resolve for this practice. Ask yourself, in your life right now, what is your deepest, most heartfelt desire? Think of this as a little seed that you're planting into your time in the world of sleep, like a blessing that you sprinkle over your passage through sleep. As you contemplate your sankalpa, see and feel your life with the fulfillment of this desire. What would your life look, sound, smell, taste and feel like if this deepest desire were a reality? Repeat your sankalpa three times in your own words from your heart in the present tense, like a mantra. Then give thanks and let it go. Now allow your attention to be spontaneously drawn into the breath without needing to control it or manipulate it. The breath breathing you. And as you relax into the simplicity of being breathed. Notice how your body spreads like water. And feel how within this body of water there is a rhythm, a tide, waves of respiration ebbing and flowing. Feel how awareness of the tide of your breathing can deepen awareness of the flow of all life. See and feel how the simple process of releasing and welcoming a quiet breath is mirrored in the flow of a day in your life. As day flows into night and night flows into day. Touched by the transition spaces of dawn and dusk. And see and feel how it's mirrored in the seasons of your life. As winter flows into summer. And summer flows into winter. Touched by the transition spaces of autumn and spring. Releasing into being breathed. Now begin to count back on each exhalation until you reach zero from ten. Rest awareness at your heart and each time you exhale count back. As though you could shed a layer or drop down a layer with each out-breath. Now bring your awareness to the hollow space of your throat. The tongue. Jaws. Sensations in the gums. Teeth. Lips. The entire mouth full of sensation. Cheeks. And cheekbones. Chin. Ears. And earlobes. Nose. And tip of nose. Both nostrils. Both eyeballs. And the space just underneath the eyeballs. Both eyelids full of sensation and awareness. Both eyebrows. And the space between the eyebrows. Temples. Forehead. Top of the head. Back of the skull. Back of the neck. The whole head as one orb of sensation. Now feel both shoulders from the inside. Both upper arms. Both elbows. Forearms. Wrists. Palms of the hands. Backs of the hands. Thumbs. Second fingers. Third fingers. Fourth fingers. Pinky fingers. Feel the spaces between the fingers. The tips of the fingers. Each finger like a little stream that flows into the space beyond. Now feel the chest and the upper back. Feel the rib cage and the middle back. Feel the belly and the low back. The pelvis and the buttocks. Both hips. Sensation in the thighs. Knees. And the space just underneath the knees. Lower legs. Ankles. Heels. Soles of the feet. Tops of the feet. Big toes. Second toes. Third toes. Fourth toes. Pinky toes. Feel the spaces between the toes. The tips of the toes. Each toe like a stream that flows into the space beyond. Feel the whole body at once. Each individual sensation melting into a mass of sensation. Feel the awareness of the whole body at once. Now let awareness sink even deeper. Feel the skin. And go beneath the skin feeling the insulating tissues. The warm substances. And deeper still to feel muscles. Letting muscles give up their command of the body committing them to rest. And deeper still into bones. And the layers inside the bones. As though the bones themselves could sigh a little. Feeling the bones carried on the currents of breath. And deeper still to feel the soft organs, the contents of your skeleton. The heartbeat slowing down. All the organs committed to rest. Feel the fluids and waterways in the body. And the cells humming, pulsing and glowing. Just like stars against a night sky. And you go deeper still and feel the energy behind or underneath these sensations. Now bring your attention to a sensation of heaviness. Welcoming the sensation of heaviness in some or all parts of the body. Now bring your attention to a sensation of lightness or weightlessness in some or all parts of the body. Go back and forth returning attention to the sensation of heaviness. Give yourself up to heaviness, relaxing into heaviness. And go back to the sensation of lightness or weightlessness. Give yourself up to lightness. Dissolving into weightlessness. Back to the sensation of heaviness. Arms and legs heavy and sinking. Head and torso heavy and sinking. And back to the sensation of lightness. Arms and legs floaty and weightless. Head and torso floating in space so light. Now feel both simultaneously, feel heavy and light at once. Don't try to think about this, just feel. Heaviness and lightness dissolving into each other. Now notice what is your direct experience of the body now. Is it solid? Is there a center? Let the body answer the question. Set your attention free to a feeling of just being. Nothing you need to do. Nothing you need to know or get or want. Having let go of any set identity, time and space. Notice what remains. Now let yourself fall back into the heart space. Emptying the mind completely of any images, thoughts, feelings, stories. Emptying completely into the heart space, falling back into a deep, deep rest."
        },
        {
            "_id": "j4z6g8n4h0y6f5t4u6n7p5t2e9w4c5d4g0n5a9s5",
            "author": "Kenneth Soares",
            "description": "Are you in need of a calming and relaxing ritual, so that you'll sleep deeply all night? Then this blissfully calm guided meditation is made for you. Sleep allows your Soul to travel out of your body back “home” to recharge, cleanse and bring back into your body pure cosmic life-force. As well as bringing more balance, clarity, and alignment to your coming day. May these tones and frequencies nourish your body, mind, and Soul - and lull you into the deepest rejuvenating and healing sleep yet. ",
            "media_length": 3665,
            "media_url": "https://libraryitems.insighttimer-api.net/j4z6g8n4h0y6f5t4u6n7p5t2e9w4c5d4g0n5a9s5/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/j4z6g8n4h0y6f5t4u6n7p5t2e9w4c5d4g0n5a9s5/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "visualization",
                "consciousness",
                "parentspirituality",
                "relaxationmeditation",
                "relax",
                "groundedhappy",
                "deepsleep",
                "relaxation",
                "guidedimagery",
                "sleepmeditation",
                "insomnia",
                "sleepingdeeply"
            ],
            "title": "Deep Sleep Guided Meditation",
            "transcripts": " Allow yourself to settle down comfortably now. When you are comfortable, think about being supported. When you become aware of how the chair is touching your back or how the bed is supporting your body or just how the ground or the floor is supporting you. Just allow your eyes to close now. If at any time you want to move to make yourself even more comfortable, you can do that because you are in control. And now take a deep breath and hold it. And when you let it out, slowly now, just let your body relax. That's right. Just relax as far as you are comfortable. And now take another deep breath and hold it. And when you let it out, slowly now, release all the tension in your body. That's right. Just allow yourself to relax completely. And when you are ready, take another deep breath and hold it. And when you let it out, slowly now, and this time really let go. Your breathing can just flow now in your natural rhythm. The natural rise and fall of your breathing will automatically help you relax more and more. You can rest assured that your body knows how to do that for you and will continue to do so now as you listen to the sound of my voice. You may even find that whatever you hear from now on only helps to relax you. Allow your arms and legs and hands and head to go limp and loose and floppy. Just like a rag doll or imagine an old coat thrown across a chair. And I wonder now if you can begin with letting all the muscles in your face relax, especially in your jaw. This is a place where tension sometimes gathers, so let your teeth part just a little bit. Feel relaxation moving into your temples. And as you think about relaxing these muscles, they will relax. Feel them relax and as they relax, as you relax, you will be able to just drift and flow into a deeper and deeper level of total relaxation. Letting your unconscious soak in any and every positive word, thought or idea that I offer you while you just drift more and more comfortably into relaxation. As you continue to relax, let all of the muscles in your forehead relax. Feel those muscles smooth, smooth and relaxed. You can rest your eyes. Just imagine your eyelids feeling so comfortable, so heavy, so relaxed. Like an ice cube melting in warm water. Like the muscles inside the eyes, around the eyes and behind the eyes melt and relax. And now let all of the muscles in the back of your neck and shoulders relax. Feel them letting go, as if a weight is being lifted off your shoulders. And feel that soothing relaxation moving down your back. Moving down, down, down to the lower part of your back. And as those muscles let go with every breath you take, just allow yourself to experience here and now. You can focus on the relative silence between the words. Like focusing on the spaces of light in between the branches of a tree, instead of the tree itself. Looking at the space and the shape of the space between the branches. Let go of all the muscles in your arms, running down from your shoulders, down through your elbows to your wrists, down to your fingertips. Relax. Some people even get a little surprised when they notice tingling sensation in their hands or fingertips. Other people notice a kind of numbness or heaviness or floating feeling. And I don't know which arm is heavier than the other, or if the other is lighter than the first. In your own way, in your own pace, safe and naturally relaxed. Feeling a pleasant wave of relaxation flowing down through your chest, into your tummy. Relaxing all of the muscles in your stomach. As if with every breath you take, you can just feel yourself drifting deeper and deeper into relaxation and calmness. And it's good to know that your unconscious mind knows exactly the depth of relaxation that is fine for you right now to drift off as you listen to the space and the silence between the sentences. Imagine all of the muscles in your legs relax as you breathe down relaxation down and down through your hips, thighs, knees, ankles, right way down to the tips of your toes. How very comfortable your body is feeling. Just drifting and floating into relaxation. Maybe there's a tingling sensation in your feet or toes. Maybe there's a heaviness or lightness, a warmth, a coolness. There is no right or wrong way to relax now. It's just your way and you're doing good. Feel your body drifting, floating down deeper, down deeper into total, natural, safe relaxation. Let your muscles go, relaxing more and more. And while your conscious mind is aware of some of the changes, your unconscious is aware of everything, everything that happens automatic inside of you and is safe and positive to know that your unconscious mind is taking care of all those things, all the organs cooperating. All the hormones, chemical reactions, the neurological signals, automatically it just happens. Just like relaxing happens automatically. And you're doing good. It's nice to begin to appreciate that you have a conscious mind and an unconscious mind. And while your conscious mind can be aware of the feeling of that hand or that foot or the sounds of my words, your unconscious mind is aware of far more. Your unconscious mind is aware of everything happening here and now. And everything that has ever happened to you and your unconscious mind also learns in a variety of ways so you can really just let it do the work for you for a while while you just let go. That's right. Let go as naturally as the tree lets go of the leaves. That feeling of relaxation flowing throughout your body and wondering if that hand or the other is becoming heavier than the first. Or which leg is sinking more deeply into relaxation. Instead of the tree itself looking at the space and the shape of the space between the branches. You flow in the space into relaxation. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. That's right. Other people notice. I don't know which one is heavier than the other. The other is lighter. The other is lighter. flowing down through your chest into your tummy. Relaxing all of the muscles in your stomach. As if with every breath you take, you can just feel yourself drifting deeper and deeper into relaxation and calmness. And it's good to know that your unconscious mind knows exactly the depth of relaxation that is fine for you right now. So you can drift off. As you listen to the space between the sentences. Imagine all of the muscles in your legs. Relax as you breathe down relaxation, down, down, through your hips, thighs, knees, ankles, right, way down to the tips of your toes. How very comfortable your body is feeling. Just drifting and floating into relaxation. Maybe there's a tingling sensation in your feet or toes. Maybe there's a heaviness or lightness, a warmth, a coolness. There is no right or wrong way to relax now. It's just your way. And you're doing good. And you're doing good. And you're doing good. And you're doing good. Feel your body drifting, floating, down, deeper. And the total, natural, same relaxation. Let your muscles go relaxing in a moment. And while your conscious mind is aware of some of the changes, your unconscious is aware of everything. Everything that happens automatically inside of you. And it's safe and positive to know that your unconscious mind is taking care of all those things. All the organs cooperating. All the hormones, chemical reactions, the neurological signals. Automatically, it just happens. Just like relaxing happens automatically. And you're doing good. And you're doing good. You You Then you have a conscious mind and a conscious mind And while your conscious mind can be aware of the feeling of that hand or that foot or the sounds of my words Your unconscious mind is aware of far more. Your unconscious mind is aware of everything happening here and now And everything that has ever happened to you and your unconscious mind also learns in a variety of ways So you can really just let it do the work for you for a while while you just let go That's right, let go as naturally as the tree lets go of the leaves The feeling of relaxation flowing throughout your body and wondering if that hand or the other is becoming heavier than the first Or which leg is sinking more deeply into relaxation Instead of the tree itself Looking at the space and the shape of the space between the branches You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation You float in the space into relaxation"
        },
        {
            "_id": "p2t1j0w3q8p0w0m6j8s9g0f0k4h9f1f0h1z7j7l2",
            "author": "Bethany Auriel-Hagan",
            "description": "A breathing visualization intended to support falling asleep.",
            "media_length": 1070,
            "media_url": "https://libraryitems.insighttimer-api.net/p2t1j0w3q8p0w0m6j8s9g0f0k4h9f1f0h1z7j7l2/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/p2t1j0w3q8p0w0m6j8s9g0f0k4h9f1f0h1z7j7l2/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "sleep",
                "breath",
                "rest",
                "visualization",
                "consciousness",
                "parentspirituality",
                "relaxationmeditation",
                "guidedimagery",
                "breathe",
                "insomnia"
            ],
            "title": "Breathing Into Sleep",
            "transcripts": " This audio file is designed to help you ease into sleep. So we'll begin with some gentle breathing visualizations to help release any stress or tension. And then the music will play and simply fade away as you drift off to sleep. So let's begin by finding a comfortable position. You might find it helpful to quickly tense all your muscles and hold it just for a few breaths and then release. It's a signal to your body that it is time to relax. Just like getting into bed each evening is a signal to the mind and the body that it is time to sleep. So begin to notice your breathing. And if it feels good, take a nice deep breath all the way into your belly. Really expand that belly, pulling that breath deep, deep, deep. And then exhale and as you do let it out on a sigh. And maybe do that one more time and allow yourself to really make some noise on that exhale to release all that old stale air. And now just relax, breathing naturally. And as you breathe, allow a sense of soothing to radiate all around your eyes. See if you can actually feel your eyelids relax. Feel how incredible it is that with just a little bit of mindfulness you can feel your body relax. And now imagine those gentle sensations of letting go. Move across your forehead and your scalp. Feel the back of your head relax. Your cheeks and nose, your mouth and chin, and all around your jaw, those muscles just let go. You can feel all the tension simply flowing out of your face. And as you take your next breath, imagine that breath traveling to the back of your neck and gently relaxing the muscles there. All that soothing breath flowing down your neck and across your shoulders. Let this feeling of relaxation radiate deep into your shoulders. Feel your shoulders drop, feeling heavy, and allow them to sink into the support beneath you. And imagine that any tension you have held in your shoulders simply flows out of your shoulders and into the earth beneath you. You are relaxed and at peace. And with your next breath, imagine that this breath carries that feeling of relaxation across your shoulders and down your chest. It flows down your arms and through your elbows and forearms. Soothing and easing as that sense of relaxation and breath move through your wrists and your hands and out the tips of your fingers. With every breath, you feel your muscles relaxing and letting go. Tension flowing out of you and into the earth. And with your next breath, feel that relaxation travel across your belly and around your sides and ribs to your back as you relax even more deeply. Allow this deep relaxation to flow down into your hips and your glutes and your thighs, feeling those powerful muscles open and relax. And see if you can feel that relaxation as a melting sensation spreading down your knees and calves, ankles and feet. And your toes completely relaxed, breathing slowly and deeply. You are safe and at peace. And now taking a nice deep breath. In that breath throughout your entire body, from your head to your toes, soothing and relaxing that breath, that fresh oxygen healing every cell in your body. Your body knows that you cannot force it to relax. You can only allow it to relax. Trust your body completely. It knows that all it takes for this incredible sense of well-being in any given moment is soft, intentional breathing. Savor how good it feels to just breathe. And with one last breath, allow all thoughts and feelings and sensations to move through your awareness as easily as that breath that you exhale. Your body is heavy, your mind is still, and you are incredibly relaxed."
        },
        {
            "_id": "x4w1f1h9q3m6b0w4r7t7r6k7v8n8c1d5r7q1q7g6",
            "author": "davidji",
            "description": "Join me for this powerful 'witness & accept' body scan. This meditation is based on research done by Massachusetts General Hospital  studying how mindfulness meditation training changes brain structure in eight weeks.\n",
            "media_length": 1378,
            "media_url": "https://libraryitems.insighttimer-api.net/x4w1f1h9q3m6b0w4r7t7r6k7v8n8c1d5r7q1q7g6/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/x4w1f1h9q3m6b0w4r7t7r6k7v8n8c1d5r7q1q7g6/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "stress",
                "stressanxiety",
                "visualization",
                "pain",
                "mantra",
                "gentlerepetition",
                "relaxationmeditation",
                "relax",
                "groundedhappy",
                "concentration",
                "spirituality",
                "parentspirituality",
                "anxiety",
                "bodyscan",
                "energybased",
                "recoveryhealing",
                "painmanagement"
            ],
            "title": "Deep Healing",
            "transcripts": " Hello, this is davidji and welcome to today's meditation. Let's get ready to dive deep into a body scan. We're going to heal and strengthen, so let's get comfortable. And perhaps you might like to lie down for this meditation, because this will be a powerful one. And science is now proving, if you continue to do this meditation every day for eight weeks, that the physical structure of your brain will change and you'll become kinder to yourself and more accepting of the world around you. Essentially, this is the most loving kindness boot camp for the brain. So let's get comfortable. Let's find a comfortable place to lie down. And if you'd prefer to sit, feel free to do that. Feather your nest. Remember comfort is queen. You might like to put a pillow or cushion under your head, but get as comfortable as possible. And together let's take a long, slow, deep breath in. And gently let that go. Let's do that one more time. Long, slow, deep breath in. And release it. And now gently allow your eyes to close. And keep breathing long, slow, deep breaths in, and effortless, innocent releases out. Essentially, we are cultivating our ability to witness, not just during the meditation, but when it's over and we open our eyes to the world around us, now we are capable of witnessing at a much higher level. Keep watching your breath. Keep witnessing your breath. And as you keep breathing, notice that your mind is calming. Notice that your body is relaxing. Notice that the world outside of you and inside of you is slowing down. Let's set an intention. And maybe there's a part of your physiology that's been inflamed or in pain. Some constriction. We'll be able to heal that as we go through this process. Maybe there's some emotional turbulence that you've been dealing with. Maybe there's a weight on your heart. Maybe your mind feels overwhelmed. Maybe there's a sadness, a grievance, a regret. Some constriction in your heart. Or maybe you're just feeling stressed or anxious. Wherever you are right now in this moment, this practice will help you heal. And science has now proven that if you do it every day for eight weeks, that's 56 days less than two months, you will have a profound shift. The physical structure of your brain will change. You'll become a better decision maker. Your emotional regulation will expand. And your ability to be kinder to yourself, less self-judgmental, more self-compassionate, will increase. So let's invite an intention into our awareness, something we'd like to see unfold in our life. Maybe it's a healing. Maybe it's a breakthrough. Maybe it's some type of leveling up to the best expression of who you are. Perhaps undimming your light. Perhaps trusting a little bit more, believing a little bit more in yourself, and trusting that the universe will deliver you to exactly where you need to be. But don't play small. Go big. This could be the big kahuna of all intentions. So invite that into your awareness and allow that to crystallize. And once that intention has clarified, ever so gently invite it into your heart. Feel it settle in. Feel it nestle in right there. And now plant it like a seed in that fertile soil of your heart. Feel it take root. And take a long, slow, deep breath in. And let it go. Release it. We'll leave it up to the universe to answer. We'll leave it up to the spirit to sort out all those details. And now let's drift back to our breath. You've planted the seed. You don't need to think about it anymore. And watch your breath and just notice it as it comes in. Don't do anything with it. And notice it as it drifts back out. Notice the rise and fall of your chest. The rise and fall of your belly. Simply allow it. Surrender to your breathing. And now let's drift our attention to the crown of our head. Witness the crown of your head. The very tip, top of your head. Witness it and allow it to relax. And slowly begin to drift down to your ears. Watch them. Allow your ears to relax. Move to your temples. At any point in our journey, if there's any constriction or blockage, feel free to breathe into it. And then as you exhale, allow it to relax. Now drift to your eyes. And relax them. Your cheekbones. Your jaw. Your mouth. Even allow your tongue to relax. Just rest the tip of it against your upper front teeth. This is known as fire point. It's a powerful relaxation position for your tongue to be in. Now drift your attention to your jaw and allow that to expand to your neck and simply relax it. Breathe into it. And let it go. To your throat. Breathe into it. And let it relax. Your shoulders. Let them surrender. Your chest and your upper back. Breathe into them simultaneously. And let them relax. Move down your arms. Breathe into your biceps. And let them relax. Your elbows. Relax them. Your forearms. Your wrists. Your hands. Even your fingers. Let them surrender. Let them relax. And now let's drift back to your chest. We'll drift down just a little bit to where your ribcage meets. Let that relax. Breathe into it right now. And let it go. The middle of your back. Your lower back. If there's any tension or pain there, breathe into it. Let it relax. And now your belly. Your tender belly. Just let it relax. Your hips. Feel them surrender. Your pelvis. Breathe into it. And give it permission to relax right now. Your thighs. Feel the muscles relax. Your quads. Hamstrings. Just let them relax. Your knees. The front and back of your knees. Breathe into that joint. Those tendons, those muscles, just allow them to relax. Scamp all those muscles between your knees and your ankles. Let them just unfold. Feel your ankles relax. Your heel. The sole of your foot. The ball of your foot. And your toes. And now just scan from the top of your head straight down to your toes. Any constriction that remains, breathe into it and relax it. Breathe into it and relax it. Breathe into it and relax it. Let's just stay in this space as you fully surrender and fully relax every single cell in your body. And now drift your attention to your toes. Simply witness and accept them. Accept them as pure and perfect and whole and exactly as they're supposed to be. And now witness the balls of your feet. Just witness and accept. The soles of your feet. Simply witness and accept. Your heels. Witness and accept. Your ankles. Witness and accept. Your calves. Your knees. Your thighs. Just scan, witness and accept. Your pelvis. Witness and accept. Your hips. Your glutes. Witness and accept. Everything is perfect and whole. Now drift up to your waist. Your lower back. Witness and accept. Your belly. Witness and accept. Your solar plexus. Watch it and accept. Your middle back. Observe and accept. Your ribcage. Witness and accept. Your heart. Pure, perfect, and whole. Witness and accept. Your upper back. Witness and accept. Your chest. Your shoulders. Witness and accept. Your biceps. Your elbows. Your forearms. Your wrists. Your hands. Your fingers. Witness and accept. Your neck. Your chin. Your mouth. Your jaw. Witness and accept. Your nose. Witness it and accept. Your cheeks. Witness and accept. Your eyes. Witness and accept. Your temples. Witness and accept. Your forehead. Your ears. The back of your head and the crown of your head. And now drift your attention to any aspect of your physiology right now that feels constricted or in pain. Drift your attention there and accept it. Don't do anything with it other than allow. Here you are in this sacred, precious, present moment. Every single aspect of your physical and emotional body is pure and perfect and whole. There's nothing you need to do. Simply witness and accept. Let's stay in the space a few moments and just surrender as we drift our attention to any constriction, any tightness, any sadness, any pain. And witness and accept. And now begin repeating the affirmation. I am whole. I trust. I am love. I am. I am whole. I trust. I am love. I am. I am whole. I trust. I am love. I am. And just witness and accept as those words ripple through every fiber of your being. I trust. I trust. Sit gently with your eyes closed. Let the stillness and silence settle in. Let the healing continue to flow. Let anxiety continue to drip right off of you. Allow your wholeness to return. And now take a long, slow, deep breath in with me from your toes to the crown of your head. And let it go. Let's do that one more time. Long, slow, deep breath in from the tips of your toes moving straight through you to the crown of your head. And release it. Wiggle your fingers. Look at your toes. Wiggle your ears. Take one long, last, deep breath in. And let that go. And be gentle as you move back into the world around you. So practice this body scan with me every day for the next 55 days. And the physical structure of your brain will shift. Your self-kindness, self-compassion, your emotional regulation will expand. And now you know you're doing something that's been scientifically proven as well as feeling great. Have an amazing day. From the sweet spot of the universe, this is davidji, sending you love. Thank you."
        },
        {
            "_id": "s8x9t4g8b5m0v9m7f5q0t9z2s5a7g2z4f6q6n5n6",
            "author": "Aluna Moon",
            "description": "These healing and relaxing recordings can help alleviate stress, anxiety and a busy mind by allowing you to sleep peacefully at night.",
            "media_length": 2087,
            "media_url": "https://libraryitems.insighttimer-api.net/s8x9t4g8b5m0v9m7f5q0t9z2s5a7g2z4f6q6n5n6/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/s8x9t4g8b5m0v9m7f5q0t9z2s5a7g2z4f6q6n5n6/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "stress",
                "stressanxiety",
                "visualization",
                "naturalenvironment",
                "secular",
                "consciousness",
                "parentspirituality",
                "relaxationmeditation",
                "mindfulness",
                "tired",
                "concentration",
                "mindfulnessmeditation",
                "sleepbetter",
                "insomnia",
                "sleepapnea",
                "bedtime",
                "breathingmeditation"
            ],
            "title": "Peaceful Sleep Meditation",
            "transcripts": " Hello and welcome to this hypnotherapy recording that's going to help you to enjoy a peaceful sleep. This recording is only to be listened to at a time and place when it's safe for you to relax completely and it should never be listened to whilst driving or operating heavy machinery. To enjoy the benefits of this recording it's best to listen last thing at night when you're in bed and ready to sleep. So to begin just allow yourself to find a comfortable position lying in bed and ready to enjoy a peaceful sleep. This is your time now to rest and relax and to just let the day fade away as you fall to sleep. So give yourself permission now to really let go and allow yourself to enjoy this special me time that you really deserve. And just bring your attention to your breathing now. Notice if you're breathing from your chest or deep down in your belly. Are you breathing shallowly and quickly? Or slowly and deeply? Just be with your breath now completely accept it just as it is. You don't have to change it for now but just simply be with that rhythm of your breath with every inhale and every exhale. Perhaps notice any unwanted thoughts that you might be experiencing right now. And just notice those thoughts as they enter your mind and then just imagine taking a step back from them so that you become the observer of your thoughts. You can begin to detach from those thoughts that keep you from sleeping. Thoughts about the day that has now finished. Thoughts about the future. But just let them all go now because now this is about you feeling peaceful and enjoying a beautifully calm and refreshing sleep. With every exhale you can breathe away those unwanted thoughts. You don't have to give them any energy but instead just allow them to fade away from you. And I want you to give yourself full permission to let go now because nobody's wanting or needing anything from you anymore. This is your free time. Time to relax your body. Time to calm your mind. And time to drift into a blissful state of relaxation. And a lovely peaceful sleep. And you can begin to notice the sensations flowing through your body now. As everything just starts to slow down. Notice how your muscles begin to relax and release. Your forehead can smooth out and your head and your face become filled with a warm, gentle and soft glow that flows down into your neck. And your shoulders, just feeling your shoulders dropping down now. Becoming loose and limp. There's nothing that you need to hold onto now, nothing at all. And you can feel your arms resting gently wherever they are right now. That beautiful, soft and gentle glow moving right down into your hands to the tips of your fingers. And you may even feel a tingling or warm sensation in your hands now. As it takes you further and further, deeper and deeper now. That's good. With every gentle inhale, that calm and soft feeling fills your entire chest. Your lungs, your heart, filling every part of your chest with that lovely, soothing feeling. That warm and gentle glow. And enjoy how lovely it is, how wonderful it feels to give yourself this time, for you, to just let go and surrender to this beautiful, peaceful feeling. And then just allow that glow to make its way down into your belly. Feeling your muscles as any tightness there just melts away, as you begin to melt away too. It feels so good to rest and relax and to know that right now there's nothing that you have to be doing. But just simply listen to the soothing sound of my voice as I guide you to that special place inside, that safe place of calm and inner peace. And you are free now, free to relax, free to be just who you are. Just allowing my words and that beautiful gentle music in the background to calmly wash over you and flow through you. Flowing into your back now, as your spine relaxes and the music carries that beautiful, soft glow into the muscles either side of your spine. Allowing your entire body to be supported by the bed beneath you. Just give all of the weight and the strain to that bed. It's safe to let go and it's safe to drift away now. And you can feel yourself drifting away now, can't you? That beautiful feeling of knowing that where you are right now is a safe and secure place where you won't be disturbed. Because the only thing that's important to you right now is you and how it feels to relax in this way. Feeling further down now, into your legs and just feeling all of the muscles there in your legs just letting go. Feeling that warm and gentle glow just soothing away any aches, any tension just melting away now. As it flows right the way down into your feet to the tips of your toes. And it's almost as if you really can't help but go deeper and deeper now. With every exhale and every word I speak. And I'm wondering if you knew that when you relax your body in this way, it allows your mind to relax too. Becoming still and calm. Everything continues to slow down. And you can feel yourself drifting easily and effortlessly. And you begin to imagine a beautiful sunset. And as you watch that sunset now, the thoughts of your mind begin to slow down. The waves of your thoughts just fade away as the sun sets completely. And as the sun sets completely, you notice that the stars in the midnight blue sky begin to appear. And you can find yourself floating and drifting now. And perhaps you can imagine yourself resting on a beautiful cushioned cloud. That cloud that supports your body completely. And you feel so safe and so secure. As you continue to just float away. And it's wonderful to know that the only thing there is to do now is just to simply relax and float away on this cloud. Just notice how it feels to allow the whole of your body to melt into that comfort. Any thoughts from the day before have faded away completely now. And you find yourself drifting. Drifting and floating through the beautiful night sky. Feeling so safe here. Knowing and understanding on a very deep level that this special place is here for you to help you to drift into a deep sleep. So you can just rest back on that cloud. Just melting into that cushioned comfort. And you find yourself just feeling more and more sleepy and relaxed as each moment passes by. And you can feel how it feels now to be floating through the peaceful night sky. Noticing the beauty that surrounds you. The stillness of the midnight blue sky. And this is a soothing colour that tells your mind that right now is a wonderful time to drift into a deep soothing sleep. So just allow that colour and those sleepy feelings to wash over you and float through you. Because you're carried by the gentle music that right now is taking you deeper and deeper into a deep and peaceful sleep. And you notice the stars, each star shining and twinkling. This really is such a beautiful place. A place where you are free to just simply be. To simply sleep. And your eyelids can begin to feel really heavy now. It's almost as if there are tiny weights on the ends of your eyelashes. Enabling you to begin falling into a beautiful sleep now. Your body is prepared to sleep. Your mind is calm and clear. And you feel so peaceful and so serene. You feel so comfortable and so cosy. Surrounded by the midnight blue sky. A place where you feel safe and so secure. You know that it's completely safe for you to drift into a deep sleep now. So feel yourself drifting and floating now. Now is the right time to sleep. So just allow yourself to go to sleep now. Drift into that deep and peaceful sleep. Because you deserve to enjoy how wonderful it feels to sleep so naturally and deeply. And I'm wondering if you knew that when you sleep it's a wonderful time for your body and mind to just simply be. To relax. To heal. And your body and mind know exactly how to drift right now. Into a natural deep sleep. Because it's already happening now. You can feel it happening now. Going further and further now. Down and down. That's good. And you can just continue to drift deeper and deeper. You can just allow yourself to fall to sleep completely. And my voice will just fade away. As you enter a soothing, healing, deep sleep. Just allow the music to carry you there now. As my voice begins to fade away already now. And you fall to sleep. Feeling so sleepy now. So peaceful. So just allow yourself to continue to sleep deeply and peacefully now. Knowing that you are completely safe and secure. And that right now the only thing you need to do is just continue to sleep deeply and peacefully. Well done. Cool. You You You You You You You You You You"
        },
        {
            "_id": "m7v2a6h6k5u8c9s1m9h7e2d5r3f9k6r7v0t6x0k5",
            "author": "Mary Maddux",
            "description": "Fall asleep more easily and sleep more deeply. Voice stops after 13 mins allowing you relax with music afterwards. From our iSleep Easy app.",
            "media_length": 1080,
            "media_url": "https://libraryitems.insighttimer-api.net/m7v2a6h6k5u8c9s1m9h7e2d5r3f9k6r7v0t6x0k5/hls/v2/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/m7v2a6h6k5u8c9s1m9h7e2d5r3f9k6r7v0t6x0k5/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "visualization",
                "letgo",
                "consciousness",
                "parentspirituality",
                "relaxationmeditation",
                "relax",
                "groundedhappy",
                "mindfulness",
                "tired",
                "workplace_evenings",
                "mindfulnessmeditation",
                "insomnia",
                "universalmeditation",
                "secular",
                "secularmindfulness",
                "bedtime"
            ],
            "title": "Relax Into Sleep: Guided Practice",
            "transcripts": " Welcome to this sleep meditation. It's time to let go of everything that happened today and everything that's going to happen in the future. This deep rest of sleep will help everything to be processed and prepare you for tomorrow. As you listen to this meditation, just let the words wash over you. You don't need to understand or hear all of the words. You'll hear what you need to hear. Naturally your mind will be having thoughts. It doesn't matter. You don't need to resist them. Just allow your attention to be easily with my words and with the meditation. Let thoughts go as they come, effortlessly. Simply be aware of whatever you're experiencing now. You don't have to try to change anything or try to do anything. Simply noticing what's happening without resisting anything. There may be a lot of activity of thinking. There may be emotions present. Perhaps you're noticing sensations in your body. Your body and your mind are unwinding from the day. Now bring your attention to your body. Notice the density of your body, the weight of your body. Take some time to get comfortable in your bed. You can stretch, move around if you'd like. Stretch out the kinks of the day. Notice the feeling of your bedclothes and the sheets. Let yourself luxuriate in this time of rest. You can let go of your concern about falling asleep and enjoy the rest. Even if your mind is very active, you can find restfulness. Now you can let go of any effort. Any concerns that come up can be filed away for tomorrow. In this deep rest, everything will be processed and you'll be prepared for the next day. Once again, bring your attention to your body. Let your body be heavy on the bed. Notice what you're feeling in your body. And if you're feeling emotions, notice where you feel them in your body. Bring your attention to your breathing. Really be aware of the breath moving in and out of your nose. Notice the in and out of the breath. Notice how your body moves and feels as it breathes. Notice the restfulness of the breath, how soothing the breath is. Allow your whole body to be in your awareness. If you notice tension anywhere in your body, notice what that feels like. Let it soften, relax, dissolve. Notice your jaw. If it's tense, let it relax. You can let your mouth drop open. Let your teeth part. Notice your neck and shoulders, how they feel. If they're tight, let them soften, relax. Let everything in your body sink into the bed. Bring your attention to your belly. Let your belly soften and relax, and naturally the breath will move into the belly. Notice how your belly moves with your breath. The thoughts are coming and going, it doesn't matter. Just favor the feeling of your body, the feeling of restfulness. From time to time, you can bring your attention to your breathing. Sleep will come on its own. You can just enjoy resting. Anytime there's a concern, you can file it away for tomorrow. This rest will prepare you for everything. Many thoughts or emotions are just unwinding, everything unwinding. It happens naturally, nothing you have to do about it. Sometimes your mind may start to drift into sleep and then become a little more alert. Doesn't matter, it's fine. Just enjoy this time of rest. Relaxing your body, letting your body be heavy on the bed. Enjoy the awareness of whatever is happening, letting yourself rest. Not trying to do anything, change anything, not resisting anything. Bring this natural unwinding to take place. Allowing yourself to rest, let go of everything. From time to time, bringing your attention to your breathing, noticing the sensations in your body. Re-notice tension, letting it dissolve. If you're still awake, doesn't matter. Everything is unwinding and sleep will come without your even noticing. So now you can continue on your own like this, allowing yourself to rest. Relaxing your body, letting your body be heavy on the bed. Enjoy the awareness of whatever is happening, letting yourself rest. Not trying to do anything, let go of everything. Enjoy the awareness of whatever is happening, letting yourself rest. Allowing yourself to rest, let go of everything. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest. Enjoy the awareness of whatever is happening, letting yourself rest."
        },
        {
            "_id": "f4g2z0m1a1s0n1h5l8z4q3c6c0m2v8e9u5e7h8j8",
            "author": "Jonathan Lehmann",
            "description": "Morning meditation with music containing affirmations to help you switch on the happiness button in your brain and have a magical day :)",
            "media_length": 626,
            "media_url": "https://libraryitems.insighttimer-api.net/f4g2z0m1a1s0n1h5l8z4q3c6c0m2v8e9u5e7h8j8/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/f4g2z0m1a1s0n1h5l8z4q3c6c0m2v8e9u5e7h8j8/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "creativityperformance",
                "magic",
                "visualization",
                "consciousness",
                "parentspirituality",
                "motivation",
                "happy",
                "concentration",
                "affirmations",
                "morning",
                "clarity",
                "happiness",
                "groundedhappy",
                "fouragreements",
                "einstein",
                "breathingmeditation"
            ],
            "title": "Morning Meditation With Music",
            "transcripts": " Good morning. The goal of this morning meditation is to switch on the happiness button in your brain to help you have a magical day. Start by sitting comfortably and close your eyes to begin the journey within. Also close your mouth so that you're only breathing through your nose. Moving your nostrils allow your body to filter the incoming air and also to breathe more slowly and thus more serenely. Become entirely still. The only thing moving inside you is the air coming in and out of your body. Observe your breathing. Notice how the air coming in is colder than the air coming out. Also notice if you're feeling any particular mood right now as if you were inspecting your emotions from the outside. Try to breathe as slowly as possible and imagine that your breath is like a magical substance bringing light and positivity as it enters your body and bringing out any darkness and negativity as it leaves your body. Progressively the stream of air is becoming thinner and thinner. Observe your breathing slower and slower. If at any point during this meditation you're troubled by thoughts, physical sensations or sounds, it's completely normal and it's okay. When you notice these thoughts, sounds or physical sensations, simply bring your attention back to the air coming in and out of your nostrils and to the physical sensation of breathing. Albert Einstein once said, there are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle. The goal of this meditation is to see everything today as a miracle. The colors our eyes will see. The sounds our ears will hear. The tastes our palates will feel. The new and old faces we will encounter. It's a miracle for instance that our bodies function the way they do. Maybe you're hurting somewhere or you might even be ill. But whatever the case, we can all thank life to have given us bodies that have allowed us to live up to this day. In order to start the day on the right foot, we're now going to focus on 7 affirmations that will help you have a magical day. First affirmation. I make plans but I remain flexible and open to the surprises that life has in store for me. I try to say yes as often as possible. Second affirmation. I cultivate patience and by doing so I also cultivate self confidence. Third affirmation. I welcome the opportunity to step outside of my comfort zone and I do not let myself be guided by fear. Fourth affirmation. I love myself unconditionally because it's essential to my happiness. I love the person that I am and I do not need other people's approval to love myself fully. Fifth affirmation. I'm going to drink water, eat fruit and vegetables, walk, take the stairs, exercise. Today I'm giving love to my body. Sixth affirmation. I give everywhere I go, even if only a smile, a compliment or my full attention. Listening is the best gift I can give to those around me. Seventh and final affirmation. I try to be impeccable with my word and to speak only to spread positivity. It's counterproductive to my happiness to speak against myself or against others. The recording is about to end but you can continue with the meditation for as long as you'd like by focusing on the physical sensation of the air coming in and out of your body. When you're ready, open your eyes and slowly take in your surroundings, the colors, the sounds and perhaps even a smell. I hope you enjoyed this meditation. If you're new to the practice and you do this or a similar exercise for ten consecutive days, I guarantee you'll start seeing significant changes in your life. I wish you a magical day. Until next time."
        },
        {
            "_id": "l0r4x8d2n4g8v6j8t8b0h4j2e9w1w9f1m5s7e2x0",
            "author": "Jennifer Piercy",
            "description": "Enjoy deep rest as you invite your eyes to set like the sun, open and strengthen the magic of night vision, and welcome the healing powers of natural darkness into your body with this Yoga Nidra for Sleep.",
            "media_length": 1816,
            "media_url": "https://libraryitems.insighttimer-api.net/l0r4x8d2n4g8v6j8t8b0h4j2e9w1w9f1m5s7e2x0/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/l0r4x8d2n4g8v6j8t8b0h4j2e9w1w9f1m5s7e2x0/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "presence",
                "groundedhappy",
                "relax",
                "yoga",
                "parentspirituality",
                "bodyscan",
                "concentration",
                "deepsleep",
                "tired",
                "insomnia",
                "circadianrhythm",
                "bedtime"
            ],
            "title": "Healing Darkness For Sleep",
            "transcripts": " You can use this practice anytime you need a little pocket of rest, wherever you are, or to support and deepen your sleep experience. When we enter natural rest and sleep cycles, there is a whole network of intelligence that comes alive, just shimmering under the surface of things, often obscured through waking consciousness. This kind of intelligence is not something you need to think about. Allow thinking to dissolve into sensing, feeling, and being. This practice is also intended to help you to welcome the healing powers of natural darkness. Our nervous system, in fact our whole ecosystem, needs natural darkness to turn on all the beautiful, built-in, quieting and healing responses available to us. Yet we live in a time of addiction to junk light, many of us overstimulated, anxious, inflamed. Our sensitive biorhythms literally brainwashed into thinking we should always be awake, and that it's not safe to rest. So I invite you to welcome this Yoga Nidra session as a practice in cultivating a kind of night vision, coupled with an indestructible sense of inner refuge. Fine-tune your comfort as much as you possibly can. Be warm, cozy, and allow the chin to release slightly down below the level of your forehead, in whatever position you've chosen to receive this in. As we begin, calling back all of your energy from external demands, pressures, expectations, entanglements. This is a time of returning to you as your own, as your own, as your own, as your own. Calling back all of the energy that is usually flowing out, and redirecting that flow toward nothing but this moment, this breath. And as we begin, calling back all of the energy that is usually flowing out, and redirecting that flow toward nothing but this moment, this breath. Notice if you might like to set a personal intention. And if not, know that you can embrace and relax with the sweetness of no intention. However, if you want to, you could also ask yourself, is there something in your life right now that could use some extra support, or energy, or encouragement? Is there something you wish to hand over to the Oracle of Sleep, the Goddess of Sacred Sleep, just this intelligence that awakens in sleep that we simply don't access when we're awake and analyzing? If you feel something naturally arise, take a moment to call it in, to name it inwardly. Repeat it three times. And then simply drop it into the pool of your practice and trust. Nothing else you need to do. Let go of thinking. Free yourself into sensing, feeling, and just being. Feel the space all around you, space beneath you, space above you, space in front, and space behind you. Space to the left, and space to the right of you. And listen to the sounds carried within space. A sense of ears open in all directions, listening to the sound of your own breathing. Like waves. Feel the skin, the skin breathing. The skin expanding. The skin expanding, expanding and condensing, one breath at a time. The mouth, a sense of vacation mouth, soft jaws, and root of tongue decompressing. Full of ease. Feel the nostrils, the beautiful air filters that are your nostrils. And the way they clean and clear and warm the air, one breath at a time. And feel the eyes, all the muscles that would usually scrunch when you squint, allowing those muscles to release pressure, decompressing, broadening, vacation eyes, full of ease, effortlessness, peace. Feel the eyes being gently bathed by the breath. Heavy eyes, heavy eyelids, heavy eyelids, breathing into the eyeballs. Feel the breath soak into the space between the eyebrows, breath by breath, bathing the space between the eyebrows. Rest in the space behind the eyes. Feel the eyes set like the sun, eye globes falling back and down, eyes bathing in the glow of sunset hues, oranges and reds, pinks and purples, the fires of the day soothing into the coolness of night, eyes setting like the sun. Feel your breath as a stream of sensation mingling from the eyes down to the heart, and feel the breath touch the heart, and feel the breath touch the heart, heart being breathed, and from the sensation, the awareness of the heart, feel anything you can be thankful for, anything worthy of celebration or appreciation, anything worthy of celebration or appreciation, anything worthy of celebration or appreciation, and we take some time to circulate presence through the physical body, and I invite you to imagine your body like a sprawling beautiful home with many rooms, many nooks and crannies, hallways and secret passageways. And in this beautiful home, all the lights are switched on. As we move presence through the body home, one by one, we will switch the lights off. And even when lights are switched off, there is still the electrical current running through the wires. And this is like your awareness, always present amidst changing rhythms. Let attention travel and feel without effort. Feel the sensation at the pit of the throat, the inner walls of the throat, the space of the throat, base of the tongue sensation, center of the tongue, tip of the tongue, taste buds, space above the tongue, space below the tongue, floor of the mouth sensation, ceiling of the mouth, teeth, gums, jaws, lips, whole mouth and throat sensation. All the lights switched off, dark and quiet and still. The sensation of cheeks, cheekbones, chin, ears, space inside the ears, earlobes, space behind the ears, tip of the nose, bridge, right nostril sensation, left nostril sensation, whole nose sensation, feeling eyelids, eyeballs, eye sockets, corners of eyes, eyebrows, space between the eyebrows, temples, skin of forehead, whole face sensation. All the lights switched off, dark and quiet and still. Feeling scalp sensation, back of skull, back of neck, whole head and neck as one sensation. All the lights switched off, dark, quiet, still. Sensation soaking down into left shoulder, left armpit, left upper arm sensation, deep inside left elbow, left forearm, wrist, palm of left hand, back of left hand, left hand thumb, second finger, third finger, fourth finger, pinky finger, tips of left fingers, spaces between left fingers, whole left hand sensation, whole left arm, all the lights switched off, dark and quiet and still. Soaking into right shoulder sensation, right armpit, right upper arm, deep into right elbow, right forearm sensation, wrist, palm of right hand, back of right hand, right hand thumb, second finger, third finger, fourth finger, pinky finger, spaces between right fingers, tips of right fingers, whole right hand sensation, whole right arm, all the lights switched off, dark and quiet and still. Feeling both arms together, both hands together. Feel the sensation of the chest, upper back sensation, middle back sensation, upper abdomen, low belly sensation, low back sensation. Feel the whole pelvis, buttocks, whole spine, no thinking, just feeling your way. Whole front side of the torso, whole back side of the torso, the very center of the torso. All the lights switched off, dark and quiet and still. Sensation soaking into right hip, right thigh, deep into right knee, lower right leg, right ankle, heel, sole of right foot, top of right foot, right big toe sensation, second toe, third toe, fourth toe, pinky toe. Feel the spaces between the toes on the right side. Tips of toes, whole right leg and foot as one sensation. All the lights switched off, dark, quiet, still. Feel sensation soaking into left hip, left thigh, deep into left knee, left lower leg sensation, left ankle, heel, sole of left foot, top of left foot, left big toe, second toe, third toe, fourth toe, pinky toe. Feel the spaces between the toes on the left side and the tips of the toes. Whole left leg and foot as one sensation. All the lights switched out, sweet darkness, quiet and still. Whole back side of the body. Whole front side of the body. Whole left side. Whole right side. The very center of the body house. Whole body, dark and quiet and still. Now rest in the touch of the breath at the space between the eyebrows. Breath washing into the space between the eyebrows one cycle at a time. From this inner vision, sense and feel into this sweet darkness. Welcoming the soft glow of night into your body. Welcoming deep sleep into your whole being. Feel the body grounded, supported, safe. Body held by the heart of the earth. And at the same time, feel the body free, floating, clear, expansive like starlight. Roots descending down into the earth. Expansive awareness like the night sky. Let attention go in all directions at once. Trust. Deep well-being. Letting attention go in all directions at once. Effortless. Peace. Be carried by the ebb and flow of deep rest and sleep waves. Be here as long as you need."
        },
        {
            "_id": "r2f9v0w7d0a4p3n7e0f4r6x7t9t3f9g5n7l0h5s1",
            "author": "Bethany Auriel-Hagan",
            "description": "Guiding you into a deep sleep where you are invited to relax, let go, and be renewed; awakening fully cleansed of the past and open to a fresh start.",
            "media_length": 2707,
            "media_url": "https://libraryitems.insighttimer-api.net/r2f9v0w7d0a4p3n7e0f4r6x7t9t3f9g5n7l0h5s1/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/r2f9v0w7d0a4p3n7e0f4r6x7t9t3f9g5n7l0h5s1/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "stress",
                "stressanxiety",
                "visualization",
                "lettinggo",
                "groundedhappy",
                "renewal",
                "mindfulness",
                "guidedimagery",
                "spirituality",
                "parentspirituality",
                "mindfulnessmeditation",
                "insomnia",
                "freshstart"
            ],
            "title": "Sleep Meditation: Awaken to a Clean Slate",
            "transcripts": " As you settle, begin to breathe nice and easy. Just easy breaths. Allowing yourself to relax without effort. Simply letting go. Feel your shoulders drop. Feel the back of your neck let go. See if you can feel the muscles of your forehead and face relax. Every part of your body so easily letting go. With every breath melting just a little bit more into the support beneath you. Deep easy breaths. Imagine that you are inhaling all the way down to your toes. And then exhaling. And as that air releases out of your body it takes with it any tension or stress. Releasing any random thoughts. Just allowing every breath, deep and rich and pure air, traveling all the way down to your toes. And then releasing every breath completely. And if your mind begins to wander or process the day, just bring your attention back to your breath and imagine that clean, pure air moving into your body all the way down to your toes. And as you exhale, consciously allow each breath to release anything that does not serve you. And then to notice that with every exhale you are beginning to feel more and more relaxed and at peace. And as your body lets go, as your mind begins to quiet, with deep easy breaths allow yourself to relax into this sacred safe space with an open heart and a willingness to be cleansed, a willingness to be set free with each breath, breathing just a little bit deeper. Feel yourself being caught in a gentle current of pure relaxation. And now imagine that as your mind empties completely, you find yourself in the dark, vast universe. Imagine that your mind is a dark sky. See the stars and the planets. Feel this vast emptiness. You can feel the quiet because the air feels heavy and still in your mind. And as you breathe, imagine each breath glides you deeper into this vast, deep sky. Deeper and deeper. Sky around you becoming darker and darker. While there is nothing to see, nothing to feel, nothing to hear. You are surrounded by silence and stillness. You are deep within a nothing space. Breathing so easily and deeply, completely at peace in this state of nothingness. Your mind is dark, quiet and still, floating in this space. Slowly, as you breathe deeply, your body feels so heavy. And you begin to breathe so deeply into that nothing space that you realize nothing is actually the very essence of something. Something mystical and powerful. An energy of something familiar. Deeper and deeper. Breathing even deeper into this something. It's as if you are following the path of the universe. Getting into a place of rebirth, a place where you are met by the hands of love and cleansed. Free of all that binds you, freed from all that clouds your vision. Breathing deeply into the energy of something from nothing. Each breath renews your soul, bringing you more fully into your truth. Into a place of love and forgiveness. Into rebirth. A clean slate. Each breath bringing you into freedom and power and grace. Love is here, and you are gently pulled into this wave of energy that brings you to the heart of, to the core of the universe. And this is familiar magic. Here you understand the truth and the why of all that has happened to you. And you are renewed by that understanding. You stand at peace, allowing yourself to be in this healing current of nothingness that is so very, very something. This nothingness that is the essence of love and joy and the magic and the power that is this pure energy cleansing and healing, reminding you that you are whole and complete. You are whole and complete. And just for this moment, can you believe that with every breath you are breathing into the universe and the magic and the power of the universe is breathing into you? Can you believe just for this moment that every breath you are breathing into the universe and the magic and power of the universe is breathing into you? Allow yourself to open into this cleansing and miraculous energy. For this energy is the same energy that creates the trees and the blossoms, the grass and the rain. The same energy that brings new life every day to the earth and all her treasures and to you. The air that you breathe, this very air that is moving in you right here, right now, is bringing you into the flow of renewal. Each breath cleansing and healing and creating that beautiful clean slate. Breathe and allow yourself to be reminded that you are whole. Allow yourself to let go and be free. Floating easily and effortlessly on this current of cleansing energy with every breath into this great nothing that is something, that is something powerful and divine. On this current of cleansing and healing, going deeper into the core of the universe, floating deeper and deeper, feeling more and more relaxed, safe and at peace. Floating deeper and deeper and gently beginning to let go. And deeper and gently beginning to notice soft silver threads. These silver threads glistening around you are the web of life. With each deep breath, images of memories, events past and present swirl around you. A display of light and energy, all of these memories and events important to who you are, but are not only who you are. These events and memories are important to how you've become who you are, but are not all of who you are. Flowing silver threads of the web of life, relaxed gently and easily, you realize it's okay to let go, to allow those threads to gently float away, to clear the slate and begin again. It's okay to allow yourself to be renewed and to breathe into the best of who you are, the best of who you've become, and leave the rest behind. Breathing easily into peace. When you awaken renewed and refreshed, that you awaken with a clean slate, you will awaken whole and complete as you are meant to be, as you are always. You will awaken having chosen to be free of the debris of your life, free from that which does not serve you, free from anything which has held you back or held you down. Gentle, easy breaths, floating into the nothing. Depth of renewal into this sacred place of creation, where nothing becomes a beautiful something, where the nothing is a clean slate, floating gently on the current of sleep. All the best of who you are, glistening on the threads of life. Everything else is swept away, like fallen leaves in the wind. All of it swept away, all of it swept away, and all that is left is the deep velvet black of a clean slate. All that is left is the deep velvet black of a clean slate. With every intention to sleep, you can come again and again to be cleansed and renewed. Every time you sleep, you can choose to be reminded that you are free, that you can awaken with only the best of who you are and a deep, velvety black, clean slate. This is the something from nothing that is the truth of sleep. This is the gift of sleep. The deep and healing sleep where you awaken in the deep velvet of a clean slate. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep. This is the something from nothing that is the truth of sleep."
        },
        {
            "_id": "g9w3s3y9c5n2a5p7k5k8m5t8m9v9c6n6c2b7v2x8",
            "author": "Jason McGrice",
            "description": "Start your day feeling grounded, positive and perfectly in flow. Using this powerful morning ritual, set your daily intentions and infuse your day with a deep sense of gratitude.",
            "media_length": 602,
            "media_url": "https://libraryitems.insighttimer-api.net/g9w3s3y9c5n2a5p7k5k8m5t8m9v9c6n6c2b7v2x8/hls/v1/index.m3u8",
            "picture_url": "https://libraryitems.insighttimer.com/g9w3s3y9c5n2a5p7k5k8m5t8m9v9c6n6c2b7v2x8/pictures/tiny_rectangle_xlarge.jpeg",
            "tags": [
                "creativityperformance",
                "manifestation",
                "visualization",
                "ritual",
                "motivation",
                "concentration",
                "guidedimagery",
                "grounded",
                "groundedhappy",
                "spirituality",
                "parentspirituality",
                "mornings",
                "breathingmeditation",
                "flow"
            ],
            "title": "Morning Ritual",
            "transcripts": " Good morning, welcome to this new day. Allow yourself to softly awaken. You may remain lying still in the comfort of your bed, or you may have risen and taken a seat for today's meditation. Sitting upright in a chair, your feet firmly flat, grounding into the earth, and your hands sitting gently on your lap, palms open, lightly closing over your eyes. As we start to welcome in this brand new day, gently connecting to your breath and in turn your body, allowing a moment to thank yourself for being here, sitting in stillness at the start of this new day. Inviting a deep breath in through your nose, feel your chest and belly rise, holding the breath at the top and slowly release the air, exhaling deeply and fully, emptying your belly, freeing your body of all of the stagnant energy that is built up over the night during your sleep, taking another deep inhale through your nose, welcoming the oxygen down deeper, holding the breath at the top and slowly releasing the air through your open mouth. Inhale, belly rise, exhale, belly falls, inhale, belly rise, exhale, belly falls. As you breathe in this time, allow this beautiful, clean, renewing oxygen to swell within your lungs, feel it effortlessly flow down into your stomach, around your abdomen, softening all of your muscles, then slowly and consciously release the air out through your open mouth. As you welcome your body, mind and spirit into this new day, flow the oxygen from the base of your spine, feel it enveloping each vertebrae and seeing it travel right up past your shoulders and neck, feel it circulating through your head, washing through your brain, cleansing your thoughts, then gently releasing the air. With the next beautiful, intentional breath, expand your belly, taking in your biggest and deepest breath yet for today. Gently exhale out your mouth, releasing all fears, worries and concerns for this day. Letting go of any to-do lists, removing all energy associated with your dreams, freeing your body of anything that will not support you throughout your day, now is the time to let this go. With your body light, your breath effortlessly flowing within its natural rhythm and your heart open, now is the perfect time to set your intention for today. What are your deepest desires? How do you want to feel today? Take a moment to visualize, see and feel this intention. Perhaps you desire clarity and energy to perform what you're very best today. Maybe your focus is on making aligned choices that support your health and well-being. Breathe deeply into these intentions and then send them out into the universe with a deep and purposeful exhalation. Bring your hands into the prayer position and place them upon your third eye chakra. This is located at the center of your forehead. A deep breath connects you to this energy center and you start to feel a wash of gratitude shimmering and tingling throughout your body. Sit with this beautiful feeling and start to call in all that you are thankful for. Connect with the feelings of gratitude for your rested state, your comfy bed, your home, your nourishing breakfast, your job, your family, your loved ones and of course offering a deep appreciation for this new day. Remembering to softly continue to breathe in through your nose and out through your mouth with each exhale sending love, light and gratitude for all that nourishes your world. Bask in this feeling of gratitude. Feel it circulating throughout your body and as you continue to send heartfelt intention out into this world know that everything is perfect within this moment. Take this subtle energy of grace, love and thanks into your day. See it gently flow out into the people that you will meet. See it spill into the streets and get whisked into the air this new day. Place your hands on your heart and offer a deep thank you. Gently rubbing your hands together now feeling the warmth and buzzing energy that you have created. Transferring this energy place your hands over your eyes and feel a sense of gratitude flow down through your face. Gently melting over your neck and shoulders. Feel it ripple through your chest and stomach, pelvis and hips. Feel it find its way down both of your legs and out through the soles of your feet. Feel this gratitude root deeply into Mother Earth, grounding you, energizing you and ever so gracefully supporting you within this new day. You may slowly crack open your eyes and come fully back into this space. Welcome today looks beautiful. Namaste."
        }
    ]

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

    useOutsideClick(ref1, () => setActive(null))


    // Initial load
    // useEffect(() => {
    //     loadMoreMeditations();
    // }, []);

    // // Load more when scrolled to bottom
    // useEffect(() => {
    //     if (inView && hasMore && !loading) {
    //         loadMoreMeditations();
    //     }
    // }, [inView, hasMore, loading]);

    // const loadMoreMeditations = async () => {
    //     if (loading || !hasMore) return;

    //     setLoading(true);
    //     try {
    //         console.log(`Loading page ${page}...`);
    //         const newData = await fetchMeditations(page);
    //         console.log(newData);

    //         if (newData && newData.length > 0) {
    //             setMeditations(prev => [...prev, ...newData]);
    //             setPage(prev => prev + 1);
    //         } else {
    //             setHasMore(false);
    //         }
    //     } catch (error) {
    //         console.error("Error loading meditations:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const videoRef = useRef<null | HTMLVideoElement>(null);
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

    return (
        <div className="py-6 px-10 flex flex-col gap-8">
            <h2 className="text-3xl font-bold">Meditation library</h2>

            <section>
                {/* {meditations.map((item: MeditationProp, index: number) => (
                    <div key={item._id || index} className="p-4 bg-white shadow rounded-lg">
                        {item.title}
                    </div>
                ))} */}

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
                                className="w-[90%] h-[90%] sm:w-[90%]  flex flex-col items-center bg-white dark:bg-neutral-900 rounded-2xl overflow-y-auto"
                            >
                                {/* <iframe
                                    style={{ borderRadius: '16px' }}
                                    className="w-full h-full"
                                    // title={`Insight Timer Embed: ${active.title} | ${active.author}`}
                                    // frameBorder="0"
                                    height="300px"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    src={active.widget_url}
                                ></iframe> */}
                                {/* <motion.div className="relative  " layoutId={`image-${active._id}`}>
                                    <img
                                        width={200}
                                        height={200}
                                        src={active.picture_url}
                                        alt={active.title}
                                        className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                    />
                                    <div
                                        className="bg-black/50 w-full h-full bottom-1 left-1  text-white text-xs font-semibold px-2 py-1 rounded-2xl"
                                    >
                                        <video
                                            ref={videoRef}
                                            poster={active.picture_url}
                                            playsInline
                                            controls
                                            className="relative rounded-xl"
                                        />
                                    </div>
                                </motion.div> */}
                                {/* <video
                                    ref={videoRef}
                                    poster={active.picture_url}
                                    playsInline
                                    controls
                                    className="w-[100%] h-[50%] rounded-xl object-cover"
                                /> */}
                                <div>
                                    <img
                                        width={200}
                                        height={100}
                                        src={active.picture_url}
                                        alt={active.title}
                                        className="h-60 w-full rounded-2xl object-cover object-top"
                                    />
                                    
                                    <motion.p
                                        layoutId={`description-${active.description}-${active._id}`}
                                        className="text-neutral-600 dark:text-neutral-400 text-base px-4 pb-4"
                                    >
                                        {active.description}
                                    </motion.p>
                                    <audio
                                        ref={videoRef}
                                        controls
                                        className="w-[100%] h-[50%] rounded-xl"
                                    />
                                </div>

                                {/* <CardBlurredCard
                                    src={active.media_url}
                                    coverImage={active.picture_url}
                                    title={active.title}
                                    author={active.author}
                                    
                                /> */}
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
                        //     <motion.div
                        //         layoutId={`card-${active._id}`}
                        //         ref={ref1}
                        //         className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        //     >
                        //         <motion.div layoutId={`image-${active._id}`}>
                        //             <img
                        //                 width={200}
                        //                 height={200}
                        //                 src={active.picture_url}
                        //                 alt={active.title}
                        //                 className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                        //             />
                        //         </motion.div>

                        //         <div>
                        //             <div className="flex justify-between items-start p-4">
                        //                 <div className="">
                        //                     <motion.h3
                        //                         layoutId={`title-${active._id}`}
                        //                         className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                        //                     >
                        //                         {active.title}
                        //                     </motion.h3>
                        //                     <motion.p
                        //                         layoutId={`description-${active.description}-${active._id}`}
                        //                         className="text-neutral-600 dark:text-neutral-400 text-base"
                        //                     >
                        //                         {active.description}
                        //                     </motion.p>
                        //                 </div>

                        //                 <motion.a
                        //                     layout
                        //                     initial={{ opacity: 0 }}
                        //                     animate={{ opacity: 1 }}
                        //                     exit={{ opacity: 0 }}
                        //                     href={active.widget_url}
                        //                     target="_blank"
                        //                     className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                        //                     rel="noreferrer"
                        //                 >
                        //                     Play
                        //                 </motion.a>
                        //             </div>
                        //             <div className="pt-4 relative px-4">
                        //                 <motion.div
                        //                     layout
                        //                     initial={{ opacity: 0 }}
                        //                     animate={{ opacity: 1 }}
                        //                     exit={{ opacity: 0 }}
                        //                     className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                        //                 >
                        //                     {active.media_length}
                        //                 </motion.div>
                        //             </div>
                        //         </div>
                        //     </motion.div>
                        // </div>
                    ) : null}
                </AnimatePresence>

                <ul className="mx-auto w-full grid grid-cols-2 md:grid-cols-3 items-start gap-4">
                    {meditations.map((med) => (
                        <motion.div
                            layoutId={`card-${med._id}`}
                            key={med._id}
                            onClick={() => {
                                setActive(med);
                                ref1.current?.getElementsByClassName("css-1vobpas")[0].setAttribute("style", "background: red;");
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
                                        <motion.p> 10 mins </motion.p>
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
            </section>

            {/* Loading indicator and observer element */}
            <div
                ref={ref}
                className="w-full flex justify-center items-center h-20 mt-4"
            >
                <p className={`animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 ${hasMore ? 'block' : 'hidden'}`}></p>
            </div>
        </div>
    );
}