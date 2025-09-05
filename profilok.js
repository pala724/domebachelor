// profilok.js

const profiles = [
  {
    name: 'Eszter',
    age: 28,
    images: ['kepek/eszter1.jpg', 'kepek/eszter2.jpg'],
    // EZ AZ ÚJ RÉSZ:
    tagline: 'Az egyetlen dolog, ami hiányzik a kávémból reggel, az te vagy.',
    bio: 'Szeretek utazni és új kultúrákat megismerni. Keresem a párom egy közös kalandhoz. 🌍✈️ Ha te is szeretsz nevetni és felfedezni, írj!'
  },
  {
    name: 'Anna',
    age: 25,
    images: ['kepek/anna1.jpg', 'kepek/anna2.jpg'],
    // EZ AZ ÚJ RÉSZ:
    tagline: 'Van térképed? Mert elvesztem a szemeidben.',
    bio: 'Művészlélek vagyok, festek és szobrászkodom. Egy kreatív és nyitott szívű társat keresek, akivel megoszthatom az inspirációt. 🎨❤️'
  },
  {
    name: 'Lilla',
    age: 29,
    images: ['kepek/lilla1.jpg'],
    // EZ AZ ÚJ RÉSZ:
    tagline: 'Szia! A nevem Microsoft. Ma este nálad crashelhetek?',
    bio: 'Imádom az állatokat, két kutyám van. Egy állatbarát, megbízható partnert keresek, aki nem ijed meg egy kis szőrtől a ruháján. 🐶💕'
  },
  {
    name: 'Zsófi',
    age: 27,
    images: ['kepek/zsofi1.jpg', 'kepek/zsofi2.jpg', 'kepek/zsofi3.jpg'],
    // EZ AZ ÚJ RÉSZ:
    tagline: 'Hiszel a szerelemben első látásra, vagy sétáljak el előtted még egyszer?',
    bio: 'Marketingesként dolgozom, de a szenvedélyem a gasztronómia. Szeretek főzni és új éttermeket kipróbálni. Találjunk egy jó helyet közösen! 🌮🍷'
  },
  {
    name: 'Réka',
    age: 30,
    images: ['kepek/reka1.jpg'],
    // EZ AZ ÚJ RÉSZ:
    tagline: 'Nem vagyok fotós, de téged és engem el tudnálak képzelni együtt.',
    bio: 'Fontos számomra az aktív életmód, rendszeresen járok jógázni és túrázni. Ha te is szereted a természetet, már van egy közös pontunk. 🧘‍♀️⛰️'
  }
];

const fianceeProfile = {
  name: 'Anita', // A menyasszonyod neve
  age: 29,      // És kora
  // EZ A RÉSZ VÁLTOZIK:
  images: [
    { 
      src: 'kepek/anita1.jpg', 
      desc: 'Ez az első közös képünk a Balatonon. Emlékszel még arra a naplementére?' 
    },
    { 
      src: 'kepek/anita2.jpg', 
      desc: 'Amikor Rómában eltévedtünk, de végül a világ legjobb fagyizóját találtuk meg.' 
    },
    { 
      src: 'kepek/anita3.jpg', 
      desc: 'A lánykérés pillanata. A legboldogabb napom, ami a közös életünk kezdete volt.' 
    },
    { 
      src: 'kepek/anita4.jpg', 
      desc: 'És egy kép a jövőnkről, ami most kezdődik. Húzz jobbra az örökkévalóságért! ❤️' 
    }
  ],
  tagline: 'Azt hiszem, a keresésnek vége... ❤️',
  bio: 'Szia! Ha ezt olvasod, akkor megtaláltad, akit kerestél. A közös kalandunk következő fejezete itt kezdődik.'
};