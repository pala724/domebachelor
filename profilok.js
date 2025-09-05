// profilok.js

const profiles = [
  {
    name: 'Tanina',
    age: 31,
    images: ['kepek/adi3.png', 'kepek/Adi1.jpg'],
    tagline: 'Az egyetlen dolog, ami hiányzik a kávémból reggel, az te vagy.',
    bio: 'Budapest nem a szívem csücske, de egy jó társaságért és pár italért bármikor kimozdulok. 🍹 Imádok a barátokkal társasozni, nagyokat nevetni, és persze enni – sokat enni. Ha te is bírod a laza esték hangulatát, akkor jó helyen jársz. 😉',
    chatMessages: [
        "Jók a képeid, de a fantáziámban még jobban nézel ki.",
        "Ugorjuk át a felesleges köröket. Ha a reggeli kávét is velem innád, most szólj. 😉"
    ]
  },
  {
    name: 'Radenka',
    age: 24,
    images: ['kepek/radenka.png', 'kepek/radenka2.png'],
    tagline: '“Keresd az Istent, gyereket találsz”',
    bio: '“Keresd az Istent, gyereket találsz”',
    chatMessages: [
        "A filozófia szexi, de a tettek még szexibbek.",
        "Bizonyítsd be, hogy nem csak a szád jár."
    ]
  },
  
  {
    name: 'Klárika',
    age: 18,
    images: ['kepek/klari.png', 'kepek/klari2.png'],
    tagline: 'Most lettem 18, mindenre kapható vagyok!😜😈',
    bio: 'Ice, Ice, Baby',
    chatMessages: [
        "Óvatosan nézz rám, mert ha sokáig tartod a tekinteted, elolvadok, mint egy jégkrém a napon.",
        "És ha én nedves leszek, te is!"
    ]
  },
  
  {
    name: 'Eperke',
    age: 29,
    images: ['kepek/eperke.png', 'kepek/eperke2.png'],
    tagline: 'Nem csak a nevem édes 😉',
    bio: 'Istenfélő, törvénytisztelő állampolgár vagyok! Itt keresem azt a férfit aki eltart és a tenyerén hordoz.😜',
    chatMessages: [
        "Szia béby, láttam szép nagy autód van 😍",
        "Mennyit keresel?🙈"
    ]
  },
  {
    name: 'Hannah',
    age: 29,
    images: ['kepek/hanna.png'], 
    tagline: 'Csábíts el tigris!',
    bio: 'Egy életvidám, magabiztos lány vagyok, aki szeret szép helyeken időzni, utazni és a luxus világát felfedezni. Hiszem, hogy az élet túl rövid ahhoz, hogy unalmasan éljük, ezért mindig keresem azokat a férfiakat, akik nemcsak sikeresek és céltudatosak, de tudják élvezni is azt, amit elértek. Szeretek inspiráló emberek társaságában lenni, akik megmutatják, hogy mindig van feljebb és szebben. Ha szeretsz élni, stílusosan, akkor biztosan jól kijövünk egymással.',
    chatMessages: [
        "Elég a szavakból. Mutasd meg, milyen állat lakozik benned.",
        "Nálam a jelszó: 'rosszalkodj'. Ha kitalálod, beengedlek. 😉"
    ]
  },
    {
    name: 'Szofi',
    age: 25,
    images: ['kepek/szofi1.png', 'kepek/szofi2.png', 'kepek/szofi3.png'],
    tagline: 'Ember, most jövök a templomból',
    bio: 'Hangos vagyok és vicces, de ehhel az kell hogy jól érezzem magam veled. Bármikor meg tudsz lepni egy kolbásszal...de csak ha van hozzá mustár és kenyér is 😉, és remélem nem zavarnak szar viccek mert abból mindig van nálam pár darab. Drága hobbim van szóval kötöd fel a gatyát!',
    chatMessages: [
        "Ha ezt olvasod baromi nagy mázlid van",
        "És ha nekem is, nem csak az baromi nagy 😉"
    ]
  },
      {
    name: 'Dóri',
    age: 22,
    images: ['kepek/dome.png', 'kepek/dome2.png'],
    tagline: 'Egy biztos, nálam jobban senki nem isner🤭',
    bio: '',
    chatMessages: [
        "Szerencséd hogy jobbra huztál😜",
        "Ígérem ma aládnzúlok"
    ]
  },
  {
    name: 'Cserepes Virág',
    age: 27,
    images: ['kepek/virag.png', 'kepek/virag2.png'],
    tagline: 'Hiszel a szerelemben első látásra, vagy sétáljak el előtted még egyszer?',
    bio: 'Olyan vagyok, mint egy IKEA bútor: elsőre bonyolultnak tűnök, de pár sör után egész jól össze lehet rakni. Szeretem a jó társaságot, a rossz vicceket, és mindig megtalálom a büféasztalt. Ha eltévedek, általában a söröshordónál bukkanok fel újra.',
    chatMessages: [
        "Remélem, jó vagy a szerelésben, mert ma éjjel nem alszunk.",
        "Ha jól raksz össze, reggelit is kapsz. Vagy repetát. 😉"
    ]
  },
  {
    name: 'Dzseni',
    age: 28,
    images: ['kepek/dzseni2.png', 'kepek/dzseni.png'],
    tagline: 'Tyson 🤩 Brájen ✝️ Mirella 🙏',
    bio: 'Három gyerekes, szingli anyuka. Csak komoly férfiak jelentkezését várom.',
    chatMessages: [
        "Nincs időm játékokra. Vagy akarsz, vagy nem.",
        "Egy komoly férfi tudja, hogyan tegyen boldoggá egy nőt. Nem csak szavakkal."
    ]
  }
];



const fianceeProfile = {
  name: 'Blani', // A menyasszonyod neve
  nickname: 'Menya',
  age: 28,      // És kora
  avatar: 'kepek/blaniprof.png',
  images: [
    { 
      src: 'kepek/Blani1.jpg', 
      // EZ A SZÖVEG A RÉSZLETES PROFILNÉZETBEN JELENIK MEG
      desc: 'Egy állat vagyok ágyban😈🔥' 
    },
    { 
      src: 'kepek/Blani2.jpg', 
      desc: 'Mesterien sütök-főzök👩🏻‍🍳' 
    },
    { 
      src: 'kepek/Blani3.jpg', 
      desc: 'Mindig nevetek az apapoénjaidon😂' 
    },
    { 
      src: 'kepek/Blani4.jpg', 
      desc: 'És mindig csinosan öltözök😇💃🏻' 
    }
  ],
  tagline: 'Julcsaaaa Basznááááák',
  bio: 'Szia! Ha ezt olvasod, akkor megtaláltad, akit kerestél. A közös kalandunk következő fejezete itt kezdődik.',

  // EZ AZ ÚJ RÉSZ: Külön üzenetek a chat ablakhoz
  chatMessages: [
    "Drága Dömém ❤️",
    "most hogy túlélted az ejtőernyőzést, készen állsz a házasságra is:D na nem mintha lelöknélek bárhonnan is 😃",
    "remélem jól sikerül a legenybucsu és nagyon jól szórakozol, a lehető legjobb csapatot választottad erre. Már nagyon várom a nagy napunkat, szerintem rengeteget dolgoztunk érte-pont mint a kapcsolatunkért. Már látom magunkat ahogy lenyomjuk a dögös chachat aztán hajnalig ropjuk a táncparketten.",
    "Jó mulatást élvezd ki az utolsó szabad napod❤️ szereltek, sok csók, a menyád. Örökreee 💍"
  ]
};
