/* ============================================================
   BABU'S BIRTHDAY WORLD — PERSONALISE EVERYTHING HERE
   ------------------------------------------------------------
   This is the only file you need to edit to make the site yours.

   PHOTOS
   1. Put your images in the /images folder (JPG or PNG).
   2. Update the `src` paths below, e.g. "images/my-photo.jpg".
   3. Update `alt` so the photo is described for screen readers.
   4. `meta` is the small line under the caption (optional).
   5. Keep `width` and `height` roughly correct so the page
      doesn't jump while photos load.

   SONG
   The song lives at "audio/our-song.mp3". To change it, replace
   that file (keep the same name), or update `src` below.
   A streaming playlist link is optional — add it to `link`.

   BIRTHDAY DATE
   `date` is the real date (YYYY-MM-DD). `display` is what he sees.
   There is deliberately no countdown — just the date, held quietly.

   TIP: Keep the quotes around text. Use curly apostrophes (’) if
   you want, and don't add a comma after the final item in a list.
   ============================================================ */

const CONFIG = {
  /* ----------------------------------------------------------
     1. NAMES
     ---------------------------------------------------------- */
  names: {
    him: "Babu",
    her: "Kaavu",
    signature: "Kaavu ♡"
  },

  /* ----------------------------------------------------------
     2. BIRTHDAY
     ---------------------------------------------------------- */
  birthday: {
    date: "2026-11-04",
    display: "04 · 11 · 2026",
    label: "the day the world got you"
  },

  /* ----------------------------------------------------------
     3. WELCOME SCREEN
     ---------------------------------------------------------- */
  hero: {
    intro:
      "Somewhere between the first glance in college and the night Bhartiyam brought us close, you became my home. I made you a little world tonight — our memories, all the reasons I adore you, and a few surprises I’ve been keeping close. Stay as long as you like. This one is yours.",
    button: "Begin the surprise",
    letterButton: "Read the letter",
    scroll: "scroll gently"
  },

  /* ----------------------------------------------------------
     4. OUR MEMORIES
     ---------------------------------------------------------- */
  memories: {
    intro:
      "It started in college — two people who noticed each other before they knew how to say it. Then Bhartiyam came, and somewhere between the noise and the lights, we found something that felt like home. These are a few of the pieces I never want to forget.",
    photos: [
      {
        src: "images/memory-sunset.jpg",
        alt: "Babu and Kaavu silhouetted against a sunset over the water",
        caption: "The evening the world went quiet — and it was just us.",
        meta: "",
        width: 933,
        height: 1186
      },
      {
        src: "images/memory-hands.jpg",
        alt: "Babu and Kaavu’s hands intertwined on a wooden table",
        caption: "My favourite place has always been your hand in mine.",
        meta: "",
        width: 787,
        height: 1400
      },
      {
        src: "images/memory-traditional.jpg",
        alt: "Kaavu in a saree and Babu in a kurta, standing together outdoors",
        caption: "Dressed up for the occasion. I was only looking at you.",
        meta: "",
        width: 960,
        height: 1280
      },
      {
        src: "images/memory-little-babu.jpg",
        alt: "Babu as a little boy, holding a birthday cake",
        caption: "Before I knew you, the universe was already planning your birthday.",
        meta: "",
        width: 437,
        height: 706
      },
      {
        src: "images/memory-new-02.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "You, me, and the in-between.",
        meta: "",
        width: 1400,
        height: 938
      },
      {
        src: "images/memory-new-03.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "The kind of ordinary that feels like magic.",
        meta: "",
        width: 787,
        height: 1400
      },
      {
        src: "images/memory-new-05.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "A smile I’d search a crowd for.",
        meta: "",
        width: 540,
        height: 960
      },
      {
        src: "images/memory-new-08.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "A small memory with a big feeling.",
        meta: "",
        width: 787,
        height: 1400
      },
      {
        src: "images/memory-new-09.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "Light, laughter, and you.",
        meta: "",
        width: 787,
        height: 1400
      },
      {
        src: "images/memory-new-10.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "The moment I didn’t know I’d miss yet.",
        meta: "",
        width: 787,
        height: 1400
      },
      {
        src: "images/memory-new-11.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "Our kind of perfect, imperfect.",
        meta: "",
        width: 787,
        height: 1400
      },
      {
        src: "images/memory-new-12.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "A glance that said everything.",
        meta: "",
        width: 1400,
        height: 1050
      },
      {
        src: "images/memory-new-13.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "Held gently in this little frame.",
        meta: "",
        width: 1400,
        height: 788
      },
      {
        src: "images/memory-new-14.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "The day softened around us.",
        meta: "",
        width: 787,
        height: 1400
      },
      {
        src: "images/memory-new-15.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "A piece of us, saved.",
        meta: "",
        width: 856,
        height: 1280
      },
      {
        src: "images/memory-new-16.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "You, looking like my favourite thing.",
        meta: "",
        width: 565,
        height: 773
      },
      {
        src: "images/memory-new-19.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "The quiet joy of being beside you.",
        meta: "",
        width: 1400,
        height: 788
      },
      {
        src: "images/memory-new-21.jpg",
        alt: "A candid photo memory of Babu and Kaavu",
        caption: "Kept close, like everything with you.",
        meta: "",
        width: 938,
        height: 1400
      }
    ],
    hidden: {
      src: "images/memory-rickshaw.jpg",
      alt: "Babu and Kaavu in an auto-rickshaw, Kaavu with a flower in her hair",
      caption: "Somewhere between here and there, with you.",
      meta: "",
      width: 960,
      height: 540
    },
    hiddenButton: "There’s one more memory…",
    hiddenNote: "Of course there is. We’re still making them."
  },

  /* ----------------------------------------------------------
     5. WHY I LOVE YOU
     ---------------------------------------------------------- */
  reasons: {
    intro:
      "I could fill a hundred pages. Here are some of the ones that live in my chest — tap a heart to open it.",
    closing: "And a thousand more I’ll tell you in person.",
    items: [
      {
        title: "Your personality",
        message:
          "You have this way of walking into a room and making it warmer. People feel at ease around you — and I feel lucky that I get to see the softest, silliest, most real parts of you up close."
      },
      {
        title: "My comfort",
        message:
          "With you, I never have to perform. I can be quiet, messy, sleepy, ridiculous — and you look at me like I’m still your favourite person. That kind of comfort is rare. You are rare."
      },
      {
        title: "My safe place",
        message:
          "The world can be loud. You are the one place where my shoulders drop. Whatever the day has been, being near you feels like exhaling."
      },
      {
        title: "My go-to person",
        message:
          "Good news, bad news, a random thought, a silly meme — you are the first person I want to tell. You are my default, in the best way."
      },
      {
        title: "Fully myself",
        message:
          "You never ask me to shrink or soften who I am. You make space for all of me — and somehow you love the parts I was still learning to accept."
      },
      {
        title: "You accept me",
        message:
          "Not the polished version. Not the version that has it together. The real me — and you stay. That is one of the most precious things anyone has ever given me."
      },
      {
        title: "You love me deeply",
        message:
          "I feel it in the small things: the way you check on me, the way you remember, the way you show up. You love me like it’s the most natural thing in the world."
      },
      {
        title: "Your eyes on me",
        message:
          "Your eyes go soft when they find mine. You’re handsome in a way that still makes me look twice — and wanted in a way I never have to question."
      },
      {
        title: "Your mind",
        message:
          "You’re smart in a quiet, steady way. You think things through, you help me see clearly, and you always know what to say when my head is full of noise."
      },
      {
        title: "My hero",
        message:
          "Not because you’re perfect, but because you keep going. You carry more than people realise, and you still find ways to take care of the people you love. I see you. I’m so proud of you."
      },
      {
        title: "Colour in my days",
        message:
          "Before you, some days were just days. With you, even the ordinary ones have a little light in them. You make my life feel like it’s in colour."
      },
      {
        title: "You remind me to live",
        message:
          "You love me so fully that it reminds me I’m allowed to love myself too. You make me want to take care of the person you love — and to live for myself as well."
      },
      {
        title: "My better half",
        message:
          "You are not the missing piece — you are the piece that makes everything make sense. My better half, my partner, my person."
      },
      {
        title: "Calm & motivation",
        message:
          "You have this way of making the storm quieter and the future brighter at the same time. You believe in me when I forget how."
      },
      {
        title: "Always there",
        message:
          "Rain or shine, good day or bad, you show up. You don’t make me beg for your presence. That consistency is one of the safest things I know."
      },
      {
        title: "The way you want me",
        message:
          "There’s a heat between us that’s ours alone — the way you touch me, the way you want me, the way you make me feel like the only woman in the world. It’s tender, it’s playful, and it’s completely you."
      }
    ]
  },

  /* ----------------------------------------------------------
     6. THE SURPRISE ROOM
     ---------------------------------------------------------- */
  surprises: {
    intro:
      "Open them in any order. Some are silly, some are soft, and one is for the days you need me close.",
    cards: [
      {
        id: "secret",
        number: "01",
        icon: "✉",
        title: "A secret message",
        text: "A note I’ve been holding close."
      },
      {
        id: "song",
        number: "02",
        icon: "♫",
        title: "Our song",
        text: "Press play and come back to me."
      },
      {
        id: "open-when",
        number: "03",
        icon: "☾",
        title: "Open when you miss me",
        text: "For the days the world feels heavy."
      },
      {
        id: "wish",
        number: "04",
        icon: "✦",
        title: "Your birthday wish",
        text: "Make a wish. I’ll help it find you."
      }
    ],

    /* --- Surprise 1: the secret message --- */
    secret: {
      title: "A secret message",
      greeting: "My Babu,",
      body: [
        "If I could give you one thing today, it would be the feeling of being completely, unmistakably loved. Not the kind you have to earn. Not the kind you have to be strong for. Just the kind that holds you.",
        "I know you’re used to being the one who takes care of everyone — the elder child, the steady one, the person who makes things work. I see how much you carry. Today, let me carry you for a little while.",
        "You are valuable. You are celebrated. You are so deeply loved — by me, with my whole heart.",
        "Happy birthday, my home."
      ],
      signature: "— Kaavu ♡"
    },

    /* --- Surprise 2: your song --- */
    song: {
      title: "Our song",
      songTitle: "We Don’t Anymore x Tujh Mein Rab Dikhta Hai",
      artist: "Hemen Patel",
      src: "audio/our-song.mp3",
      link: "",
      linkLabel: "Open the playlist",
      note: "This is the one that sounds like us. Remember you complimented that I sound like this in your life… I feel the same. Press play, close your eyes, and come back to me.",
      signature: "— Kaavu ♡"
    },

    /* --- Surprise 3: open when you miss me --- */
    openWhen: {
      title: "Open when you miss me",
      greeting: "My Babu,",
      body: [
        "If you’re reading this, maybe the day feels a little heavy, or missing me feels louder than it should. Take a breath. I’m right here.",
        "You don’t have to be strong all the time. You don’t have to carry everything alone. You are allowed to rest, to feel, to need someone. And you are allowed to need me.",
        "I miss you too — in the small, ordinary ways. The empty side of the bed. The joke I want to tell you first. The silence that feels better when you’re in it.",
        "Come back to this whenever you need a reminder: you are loved, you are safe, and you are mine. Not because you’re perfect, but because you’re you.",
        "I’ll be here. Always."
      ],
      signature: "— Kaavu ♡"
    },

    /* --- Surprise 4: the birthday wish --- */
    wish: {
      title: "Your birthday wish",
      prompt:
        "Close your eyes. Think of something you’ve been quietly hoping for. Then tap the star — I’ll do the rest.",
      starLabel: "Tap the star",
      message:
        "Whatever you wished for, I hope it finds you. And if I’m allowed one wish too, it’s this: a hundred more birthdays, a thousand ordinary days, and a lifetime of coming home to you. Happy birthday, my Babu. ♡",
      signature: "— Kaavu"
    }
  },

  /* ----------------------------------------------------------
     7. THE FINAL LOVE LETTER
     ---------------------------------------------------------- */
  letter: {
    intro:
      "This is the part I couldn’t fit into a caption or a card. Open it when you’re ready.",
    envelopeLabel: "A letter, sealed with a kiss",
    envelopeHint: "Open the letter",
    heading: "Dear Aayush,",
    paragraphs: [
      "I don’t know how to put a whole heart into words, but I’m going to try.",
      "You came into my life when I wasn’t looking for a home, and somehow, you became one. I still remember the first time I saw you — that quiet pull, like my heart already knew something I didn’t. Then Bhartiyam happened, the noise faded, and there you were. It felt like coming home.",
      "I love the person you are when no one is watching. The one who carries more than he should. The one who takes care of everyone and forgets that he deserves to be taken care of too. I see you, Babu. I see how hard you try, how much you give, how deeply you love. And I want you to know: you don’t have to earn your place with me. You already have it. You always will.",
      "I wish I could give you the kind of birthday you deserve — a day where the whole world stops and says, “This is your day, and you are so loved.” Since I can’t wrap the world, I made you this. A little universe where every star is a reason, every photo is a memory, and every word is mine.",
      "You are my safe place, my better half, my favourite person. You are the colour in my ordinary days and the calm in my loud ones. You make me want to be softer, braver, more alive. You make me feel loved in a way I didn’t know I was allowed to feel.",
      "And today, on your birthday, I want to celebrate you — not just the man who does everything for everyone, but the man himself. The one with the soft eyes and the steady heart. The one who is more than enough, exactly as he is.",
      "I love you. Not because it’s your birthday. Not because it’s easy. Because it’s you. Because it’s us. Because even on the days I don’t say it enough, you are the person I choose.",
      "Happy birthday, my Babu. Here’s to a lifetime of ordinary days, late-night conversations, and a home that feels like you."
    ],
    closing: "Forever yours,",
    signature: "Kaavu ♡",
    ps: "P.S. You are allowed to want things for yourself. Today, want everything.",
    closeLabel: "Fold it back"
  },

  /* ----------------------------------------------------------
     8. MAKE A WISH
     ---------------------------------------------------------- */
  wish: {
    intro:
      "Close your eyes. Think of something you’ve been quietly hoping for. Then press the button — I’ll do the rest.",
    button: "Make a wish",
    again: "Make another wish",
    message:
      "I hope every wish you make today comes true. And if I get one too — I wish for a hundred more birthdays with you. Happy birthday, my Babu. ♡",
    signature: "— Kaavu"
  },

  /* ----------------------------------------------------------
     9. GENTLE AMBIENT MUSIC
     ---------------------------------------------------------- */
  ambient: {
    enabled: true,
    src: "audio/golden-brown.mp3",
    volume: 0.35
  }
};
