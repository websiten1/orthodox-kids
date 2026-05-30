// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log("🌱 Seeding Calea Luminii...");

  // ======== TEME (12 teme) ========
  const themesData = [
    {
      weekNumber: 1,
      title: "Ce este Biserica?",
      description: "Descoperim împreună ce este Biserica lui Hristos și de ce mergem acolo.",
      mapLocation: "biserica",
      iconEmoji: "⛪",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Casa lui Dumnezeu",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Ce este Biserica?",
                text: "Biserica este casa lui Dumnezeu pe pământ. Este locul unde ne întâlnim cu Dumnezeu, unde ne rugăm împreună și unde primim darurile Lui.",
              },
              {
                title: "De ce mergem la Biserică?",
                text: "Mergem la Biserică pentru că Dumnezeu ne cheamă acolo. Acolo auzim Cuvântul Său, ne spovedim și primim Sfânta Împărtășanie.",
              },
              {
                title: "Cum ne comportăm în Biserică?",
                text: "În Biserică stăm cu respect, cu mâinile la piept sau jos. Ne rugăm cu inima curată și ne gândim la Dumnezeu.",
              },
            ],
          },
          questions: [
            {
              text: "Ce este Biserica?",
              options: ["Un muzeu", "Casa lui Dumnezeu", "O școală", "Un parc"],
              correctAnswer: "Casa lui Dumnezeu",
              explanation: "Biserica este casa lui Dumnezeu pe pământ, locul unde ne întâlnim cu El.",
            },
            {
              text: "Ce primim în Biserică?",
              options: ["Dulciuri", "Jucării", "Sfânta Împărtășanie", "Bani"],
              correctAnswer: "Sfânta Împărtășanie",
              explanation: "Sfânta Împărtășanie este cel mai mare dar pe care îl primim de la Dumnezeu în Biserică.",
            },
          ],
        },
        {
          type: "quiz",
          title: "Joc: Cunosc Biserica?",
          orderIndex: 2,
          estimatedMins: 10,
          talantsReward: 7,
          content: { instructions: "Răspunde la întrebări despre Biserică." },
          questions: [
            {
              text: "Cum se numește masa sfântă din față la care sluiește preotul?",
              options: ["Masa de la bucătărie", "Sfânta Masă (Altarul)", "Scaunul", "Ușa"],
              correctAnswer: "Sfânta Masă (Altarul)",
              explanation: "Sfânta Masă din Altar este locul cel mai sfânt din Biserică, unde se săvârșește Sfânta Liturghie.",
            },
            {
              text: "Ce lucru aprindem în Biserică pentru cei dragi?",
              options: ["O lanternă", "O lumânare", "Un bec", "Un chibrituri"],
              correctAnswer: "O lumânare",
              explanation: "Lumânarea aprinsă simbolizează rugăciunea noastră și lumina lui Hristos care izgonește întunericul.",
            },
            {
              text: "Cum se numește cântatul în Biserică?",
              options: ["Muzică pop", "Strigat", "Strană / Psaltire", "Fluierat"],
              correctAnswer: "Strană / Psaltire",
              explanation: "Cântatul în Biserică se numește strană și este o rugăciune cântată adresată lui Dumnezeu.",
            },
          ],
        },
        {
          type: "matching",
          title: "Potrivire: Părțile Bisericii",
          orderIndex: 3,
          estimatedMins: 6,
          talantsReward: 5,
          content: {
            instructions: "Potrivește fiecare parte a Bisericii cu explicația ei.",
            pairs: [
              { left: "Altarul", right: "Locul cel mai sfânt, unde sluiește preotul" },
              { left: "Naosul", right: "Locul unde stau credincioșii" },
              { left: "Pronaosul", right: "Intrarea în Biserică" },
              { left: "Iconostasul", right: "Peretele cu icoane care desparte Altarul de Naos" },
            ],
          },
          questions: [],
        },
      ],
    },
    {
      weekNumber: 2,
      title: "Sfânta Cruce",
      description: "Înțelegem semnificația Crucii lui Hristos și cum ne facem semnul crucii.",
      mapLocation: "gradina",
      iconEmoji: "✝️",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Crucea lui Hristos",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "De ce este Crucea sfântă?",
                text: "Crucea este sfântă pentru că pe ea Domnul Iisus Hristos Și-a dat viața pentru noi, ca să ne mântuiască. Crucea este semnul iubirii lui Dumnezeu.",
              },
              {
                title: "Cum ne facem semnul Crucii?",
                text: "Ne facem semnul Crucii cu trei degete unite: degetul mare, arătătorul și mijlociul, și restul îndoite. Atingem fruntea, pieptul, umărul drept, umărul stâng, spunând: 'În numele Tatălui și al Fiului și al Sfântului Duh. Amin.'",
              },
            ],
          },
          questions: [
            {
              text: "De ce este Crucea sfântă?",
              options: ["Este frumoasă", "Hristos a murit pe ea pentru noi", "Este veche", "E din aur"],
              correctAnswer: "Hristos a murit pe ea pentru noi",
              explanation: "Crucea este sfântă pentru că pe ea Hristos și-a dat viața pentru mântuirea noastră, din iubire.",
            },
            {
              text: "Cu câte degete ne facem semnul Crucii?",
              options: ["Un deget", "Două degete", "Trei degete", "Cinci degete"],
              correctAnswer: "Trei degete",
              explanation: "Cele trei degete unite simbolizează Sfânta Treime: Tatăl, Fiul și Sfântul Duh.",
            },
          ],
        },
        {
          type: "quiz",
          title: "Joc: Semnul Crucii",
          orderIndex: 2,
          estimatedMins: 8,
          talantsReward: 7,
          content: { instructions: "Testați cunoștințele despre Sfânta Cruce." },
          questions: [
            {
              text: "Ce spunem când ne facem semnul Crucii?",
              options: [
                "La mulți ani!",
                "În numele Tatălui și al Fiului și al Sfântului Duh. Amin.",
                "Doamne, ajută!",
                "Hristos a Înviat!",
              ],
              correctAnswer: "În numele Tatălui și al Fiului și al Sfântului Duh. Amin.",
              explanation: "Rostim aceste cuvinte pentru că Sfânta Cruce ne amintește de Sfânta Treime și de jertfa lui Hristos.",
            },
            {
              text: "Când ne facem semnul Crucii?",
              options: [
                "Doar de Crăciun",
                "La rugăciune, intrând în Biserică, la masă",
                "Numai la înmormântări",
                "Niciodată",
              ],
              correctAnswer: "La rugăciune, intrând în Biserică, la masă",
              explanation: "Semnul Crucii este o mini-rugăciune pe care o facem în multe momente importante ale zilei.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 3,
      title: "Rugăciunea",
      description: "Cum vorbim cu Dumnezeu? Descoperim puterea rugăciunii.",
      mapLocation: "clopotnita",
      iconEmoji: "🙏",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Vorbim cu Dumnezeu",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Ce este rugăciunea?",
                text: "Rugăciunea este convorbirea noastră cu Dumnezeu. Prin rugăciune îi spunem lui Dumnezeu ce simțim, ce ne doare, ce dorim și îi mulțumim pentru toate.",
              },
              {
                title: "Rugăciunea Tatăl Nostru",
                text: "Cea mai importantă rugăciune este 'Tatăl Nostru', pe care Însuși Hristos ne-a învățat-o. În ea cerem pâinea cea de toate zilele, iertarea păcatelor și ajutor să nu cădem în ispite.",
              },
              {
                title: "Când ne rugăm?",
                text: "Ne rugăm dimineața când ne sculăm, seara înainte de culcare, înainte și după masă, în momente de bucurie sau de necaz. Dumnezeu ascultă întotdeauna!",
              },
            ],
          },
          questions: [
            {
              text: "Ce este rugăciunea?",
              options: ["Un joc", "Convorbirea noastră cu Dumnezeu", "O lecție", "Un cântec"],
              correctAnswer: "Convorbirea noastră cu Dumnezeu",
              explanation: "Prin rugăciune stăm de vorbă cu Dumnezeu, ca un copil cu tatăl său iubitor.",
            },
            {
              text: "Cine ne-a învățat rugăciunea Tatăl Nostru?",
              options: ["Mama", "Preotul", "Însuși Iisus Hristos", "Un sfânt"],
              correctAnswer: "Însuși Iisus Hristos",
              explanation: "Rugăciunea Tatăl Nostru este darul lui Hristos pentru noi — ne-a arătat El cum să vorbim cu Dumnezeu.",
            },
          ],
        },
        {
          type: "matching",
          title: "Momentul Zilei: Rugăciunile",
          orderIndex: 2,
          estimatedMins: 7,
          talantsReward: 6,
          content: {
            instructions: "Potrivește rugăciunile cu momentul zilei când se spun.",
            pairs: [
              { left: "Dimineața", right: "Mulțumim lui Dumnezeu că ne-am trezit" },
              { left: "Înainte de masă", right: "Sfințește, Doamne, mâncarea aceasta" },
              { left: "Seara", right: "Cerșim paza în timpul somnului" },
              { left: "La Biserică", right: "Ne rugăm împreună cu ceilalți credincioși" },
            ],
          },
          questions: [],
        },
      ],
    },
    {
      weekNumber: 4,
      title: "Icoanele",
      description: "Descoperim de ce icoanele sunt ferestre spre cer.",
      mapLocation: "scriptoriu",
      iconEmoji: "🖼️",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Ferestre spre cer",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Ce este o icoană?",
                text: "Icoana este o imagine sfântă a lui Iisus Hristos, a Maicii Domnului sau a Sfinților. Nu o adorăm ca pe un idol, ci o cinstim deoarece ne trimite gândul spre cel zugrăvit.",
              },
              {
                title: "Cum se face o icoană?",
                text: "Iconarul (cel care pictează icoane) postește și se roagă înainte să înceapă. Folosește culori speciale, aur foiță și vopsele naturale. Pictura icoandelor se numește iconografie.",
              },
            ],
          },
          questions: [
            {
              text: "Ce reprezintă o icoană?",
              options: ["Un tablou decorativ", "O imagine sfântă a lui Hristos sau a Sfinților", "Un poster", "O fotografie"],
              correctAnswer: "O imagine sfântă a lui Hristos sau a Sfinților",
              explanation: "Icoana nu este un tablou obișnuit — ea ne poartă gândul spre persoanele sfinte zugrăvite pe ea.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 5,
      title: "Sfinții",
      description: "Cine sunt sfinții și cum ne pot ajuta ei?",
      mapLocation: "drumul_sfintilor",
      iconEmoji: "⭐",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Prietenii lui Dumnezeu",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Cine sunt sfinții?",
                text: "Sfinții sunt oameni ca noi care au trăit cu credință puternică și au iubit atât de mult pe Dumnezeu și pe oameni, încât acum trăiesc în cer lângă Dumnezeu.",
              },
              {
                title: "Cum ne ajută sfinții?",
                text: "Sfinții se roagă pentru noi la Dumnezeu. Ei sunt mijlocitorii noștri. Putem cere ajutorul lor în rugăciunile noastre.",
              },
              {
                title: "Ziua numelui",
                text: "Fiecare creștin are un sfânt al lui — sfântul cu al cărui nume a fost botezat. Ziua acelui sfânt este onomastica noastră.",
              },
            ],
          },
          questions: [
            {
              text: "Unde trăiesc sfinții acum?",
              options: ["Pe pământ", "În cer, lângă Dumnezeu", "Pe lună", "În cărți"],
              correctAnswer: "În cer, lângă Dumnezeu",
              explanation: "Sfinții și-au trăit viața cu credință și acum se bucură de viața veșnică alături de Dumnezeu.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 6,
      title: "Sfânta Liturghie",
      description: "Înțelegem ce se întâmplă la Sfânta Liturghie duminica.",
      mapLocation: "biserica",
      iconEmoji: "🕯️",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Slujba duminicii",
          orderIndex: 1,
          estimatedMins: 10,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Ce este Sfânta Liturghie?",
                text: "Sfânta Liturghie este slujba cea mai importantă a Bisericii Ortodoxe. Se săvârșește duminica și în zilele de sărbătoare. Este momentul în care pâinea și vinul devin Trupul și Sângele lui Hristos.",
              },
              {
                title: "Împărțirile Liturghiei",
                text: "Liturghia are două mari părți: Liturghia catehumenilor (pentru toți) și Liturghia credincioșilor (pentru cei botezați). La final primim Sfânta Împărtășanie.",
              },
            ],
          },
          questions: [
            {
              text: "Când se săvârșește Sfânta Liturghie?",
              options: ["Lunea", "Duminica și în zilele de sărbătoare", "Numai la Paști", "Oricând vrem"],
              correctAnswer: "Duminica și în zilele de sărbătoare",
              explanation: "Sfânta Liturghie se săvârșește în mod special duminica, ziua Învierii Domnului.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 7,
      title: "Postul",
      description: "Postul nu înseamnă pedeapsă, ci antrenament pentru suflet.",
      mapLocation: "fantana",
      iconEmoji: "🌿",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Antrenamentul sufletului",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Ce este postul?",
                text: "Postul este o perioadă când ne abținem de la anumite mâncăruri, de la distracții excesive, și ne rugăm mai mult. Este un antrenament pentru sufletul nostru.",
              },
              {
                title: "Posturile mari",
                text: "Cel mai important post este Postul Mare (înainte de Paști) — durează 7 săptămâni. Există și Postul Crăciunului, Sfinților Petru și Pavel, și Adormirii Maicii Domnului.",
              },
            ],
          },
          questions: [
            {
              text: "Ce înseamnă postul?",
              options: [
                "O pedeapsă dată de părinți",
                "Un antrenament al sufletului prin rugăciune și abținere",
                "Un joc",
                "O vacanță",
              ],
              correctAnswer: "Un antrenament al sufletului prin rugăciune și abținere",
              explanation: "Postul nu este pedeapsă — este o alegere liberă de a ne apropia mai mult de Dumnezeu.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 8,
      title: "Faptele bune",
      description: "Credința fără fapte este moartă. Descoperim puterea binelui.",
      mapLocation: "piata_parohiei",
      iconEmoji: "🤝",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Suntem mâinile lui Dumnezeu",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "De ce facem fapte bune?",
                text: "Facem fapte bune nu pentru a ne lăuda, ci din iubire față de Dumnezeu și față de aproapele nostru. Când ajutăm pe cineva, Îl ajutăm pe Hristos Însuși.",
              },
              {
                title: "Exemple de fapte bune",
                text: "Ajutăm bătrânii, consolăm pe cei triști, împărțim cu colegii noștri, iertăm pe cei care ne-au greșit, suntem recunoscători.",
              },
            ],
          },
          questions: [
            {
              text: "De ce facem fapte bune?",
              options: [
                "Ca să ne laude toți",
                "Din iubire față de Dumnezeu și oameni",
                "Ca să primim ceva în schimb",
                "Fiindcă suntem obligați",
              ],
              correctAnswer: "Din iubire față de Dumnezeu și oameni",
              explanation: "Faptele bune adevărate vin din inimă, din iubire, nu din dorința de a fi lăudat.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 9,
      title: "Maica Domnului",
      description: "Cine este Fecioara Maria și de ce o cinstim?",
      mapLocation: "gradina",
      iconEmoji: "🌹",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Maica noastră cerească",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Cine este Maica Domnului?",
                text: "Fecioara Maria este mama lui Iisus Hristos după trup. Ea a acceptat cu umilință să fie mama Fiului lui Dumnezeu, spunând: 'Fie mie după cuvântul Tău!'",
              },
              {
                title: "Cum o cinstim?",
                text: "O cinstim prin rugăciunea 'Bucură-te, Marie' (Imnul Acatist), prin posturi în cinstea ei (15 august - Adormirea Maicii Domnului) și prin iubire față de ea ca Maică a noastră.",
              },
            ],
          },
          questions: [
            {
              text: "Cine este Maica Domnului?",
              options: [
                "Un personaj dintr-o poveste",
                "Mama lui Iisus Hristos",
                "O sfântă obișnuită",
                "Un înger",
              ],
              correctAnswer: "Mama lui Iisus Hristos",
              explanation: "Fecioara Maria este mama lui Iisus Hristos după trup, cinstită de toți creștinii ortodocși.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 10,
      title: "Paștele",
      description: "Învierea lui Hristos — cea mai mare sărbătoare ortodoxă.",
      mapLocation: "biserica",
      iconEmoji: "🕯️",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Hristos a Înviat!",
          orderIndex: 1,
          estimatedMins: 10,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Ce este Paștele?",
                text: "Paștele este cea mai mare sărbătoare a creștin ortodocși — Învierea Domnului Iisus Hristos din morți. Este 'Sărbătoarea Sărbătorilor', 'Împăratul zilelor'.",
              },
              {
                title: "Cum sărbătorim Paștele?",
                text: "În noaptea de Paști, la miezul nopții, preotul anunță: 'Hristos a Înviat!' și toți credincioșii răspund: 'Adevărat a Înviat!' Lumânările se aprind și toți cântă împreună.",
              },
              {
                title: "Simbolurile Paștelui",
                text: "Ouăle roșii simbolizează sângele lui Hristos și Învierea. Pasca este o pâine specială binecuvântată. Lumânarea aprinsă simbolizează lumina Învierii.",
              },
            ],
          },
          questions: [
            {
              text: "Ce înseamnă Paștele?",
              options: [
                "Nașterea lui Hristos",
                "Învierea lui Hristos din morți",
                "Botezul lui Hristos",
                "Intrarea în Ierusalim",
              ],
              correctAnswer: "Învierea lui Hristos din morți",
              explanation: "Paștele este sărbătoarea Învierii lui Hristos — cea mai mare și mai bucuroasă sărbătoare creștină.",
            },
            {
              text: "Ce spunem de Paști?",
              options: [
                "La mulți ani!",
                "Hristos s-a Născut!",
                "Hristos a Înviat!",
                "Doamne, ajută!",
              ],
              correctAnswer: "Hristos a Înviat!",
              explanation: "Salutarea pascală 'Hristos a Înviat!' și răspunsul 'Adevărat a Înviat!' este veselia noastră de Paști.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 11,
      title: "Crăciunul",
      description: "Nașterea lui Iisus Hristos în ieslea din Betleem.",
      mapLocation: "piata_parohiei",
      iconEmoji: "⭐",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Dumnezeu s-a născut în lume",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Ce este Crăciunul?",
                text: "Crăciunul este sărbătoarea Nașterii lui Iisus Hristos. Fiul lui Dumnezeu s-a făcut om din iubire pentru noi, s-a născut ca un prunc mic în ieslea din Betleem.",
              },
              {
                title: "Povestea Nașterii",
                text: "Maria și Iosif au mers în Betleem pentru recensământ. Nefiind loc în casă, s-au adăpostit într-o peșteră. Acolo s-a născut Iisus. Îngerii au anunțat nașterea, iar magii de la Răsărit au venit să se închine.",
              },
            ],
          },
          questions: [
            {
              text: "Unde s-a născut Iisus Hristos?",
              options: ["La Ierusalim", "La Nazaret", "În Betleem", "În Egipt"],
              correctAnswer: "În Betleem",
              explanation: "Iisus Hristos s-a născut în Betleem, într-o peșteră, în noaptea cea sfântă pe care o sărbătorim la Crăciun.",
            },
          ],
        },
      ],
    },
    {
      weekNumber: 12,
      title: "Botezul",
      description: "Taina Botezului — cum devenim creștini?",
      mapLocation: "fantana",
      iconEmoji: "💧",
      ageRange: "all",
      isPublished: true,
      activities: [
        {
          type: "lesson",
          title: "Lecție: Nașterea în Duh",
          orderIndex: 1,
          estimatedMins: 8,
          talantsReward: 5,
          content: {
            sections: [
              {
                title: "Ce este Botezul?",
                text: "Botezul este prima și cea mai importantă Taină creștină. Prin Botez devenim fii ai lui Dumnezeu și membri ai Bisericii. Este o naștere spirituală.",
              },
              {
                title: "Cum se face Botezul?",
                text: "Preotul cufundă pruncul de trei ori în apa sfințită, spunând: 'Se botează robul lui Dumnezeu... în numele Tatălui și al Fiului și al Sfântului Duh.' Apa spală păcatul originar.",
              },
            ],
          },
          questions: [
            {
              text: "Prin ce Taină devenim creștini?",
              options: ["Printr-o promisiune", "Prin Botez", "Prin rugăciune", "Prin Împărtășanie"],
              correctAnswer: "Prin Botez",
              explanation: "Botezul este ușa de intrare în viața creștină — prin el devenim fii ai lui Dumnezeu.",
            },
          ],
        },
      ],
    },
  ];

  for (const themeData of themesData) {
    const { activities, ...themeFields } = themeData;

    const theme = await prisma.theme.upsert({
      where: { id: `theme-${themeFields.weekNumber}` },
      update: {},
      create: {
        id: `theme-${themeFields.weekNumber}`,
        ...themeFields,
      },
    });

    for (const actData of activities) {
      const { questions, ...actFields } = actData;
      const actId = `act-${theme.weekNumber}-${actFields.orderIndex}`;

      const activity = await prisma.activity.upsert({
        where: { id: actId },
        update: {},
        create: {
          id: actId,
          themeId: theme.id,
          ageRange: "all",
          ...actFields,
          content: actFields.content as object,
        },
      });

      for (let qi = 0; qi < questions.length; qi++) {
        const q = questions[qi];
        await prisma.question.upsert({
          where: { id: `q-${actId}-${qi}` },
          update: {},
          create: {
            id: `q-${actId}-${qi}`,
            activityId: activity.id,
            text: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
          },
        });
      }
    }
  }

  console.log("✅ 12 teme cu activități create.");

  // ======== SFINȚI ========
  const saintsData = [
    {
      id: "sf-stefan",
      name: "Sfântul Ștefan",
      feastDay: "26 decembrie",
      virtue: "Curaj și iertare",
      storyShort: "Sfântul Ștefan a fost primul mucenic creștin. El era plin de credință și duh sfânt. Atunci când a fost lapidato (ucis cu pietre) de vrăjmași, el s-a rugat: 'Doamne, nu le socoti lor păcatul acesta!' — a iertat pe ucigașii săi, la fel ca Hristos.",
      iconUrl: "👤",
      region: "universal",
      difficulty: "common",
    },
    {
      id: "sf-nicolae",
      name: "Sfântul Nicolae",
      feastDay: "6 decembrie",
      virtue: "Generozitate și milostenie",
      storyShort: "Sfântul Nicolae a fost un episcop din Myra (azi Turcia). Era cunoscut pentru generozitatea sa extraordinară — dăruia în taină aur celor săraci. Legenda spune că a aruncat pungi cu aur pe geamul unor fete sărace pentru a le da zestre. Este ocrotitorul copiilor, săracilor și marinarilor.",
      iconUrl: "👴",
      region: "universal",
      difficulty: "common",
    },
    {
      id: "sf-gheorghe",
      name: "Sfântul Gheorghe",
      feastDay: "23 aprilie",
      virtue: "Vitejie și credință",
      storyShort: "Sfântul Mare Mucenic Gheorghe a fost un ofițer roman care și-a mărturisit credința în Hristos în fața împăratului Diocletian. A suferit chinuri groaznice fără să renunțe la credință. Este reprezentat ca un cavaler pe cal alb, omorând un balaur — simbol al biruinței binelui asupra răului.",
      iconUrl: "⚔️",
      region: "universal",
      difficulty: "common",
    },
    {
      id: "sf-andrei",
      name: "Sfântul Apostol Andrei",
      feastDay: "30 noiembrie",
      virtue: "Apostolat și evanghelizare",
      storyShort: "Sfântul Apostol Andrei este ocrotitorul României. A fost primul chemat de Hristos la apostolat. A predicat Evanghelia în multe ținuturi, inclusiv pe teritoriul României de azi, în Dobrogea. A murit pe o cruce în formă de X (Crucea Sfântului Andrei).",
      iconUrl: "⭐",
      region: "roman",
      difficulty: "common",
    },
    {
      id: "sf-constantin",
      name: "Sfinții Constantin și Elena",
      feastDay: "21 mai",
      virtue: "Credință și ocrotirea creștinătății",
      storyShort: "Împăratul Constantin cel Mare a fost primul împărat roman care a dat libertate creștinilor (Edictul de la Milano, 313 d.Hr.). Mama sa, Sfânta Elena, a găsit Crucea pe care a fost răstignit Hristos. Împreună sunt numiți 'Întocmai cu Apostolii'.",
      iconUrl: "👑",
      region: "universal",
      difficulty: "uncommon",
    },
    {
      id: "sf-ioanchim",
      name: "Sfinții Ioachim și Ana",
      feastDay: "9 septembrie",
      virtue: "Răbdare și credință în rugăciune",
      storyShort: "Ioachim și Ana erau părinții Fecioarei Maria. Mult timp nu au avut copii și s-au rugat cu lacrimi la Dumnezeu. Dumnezeu le-a ascultat rugăciunea și le-a dăruit-o pe Maria, care va deveni Mama lui Hristos. Ne arată că rugăciunea stăruitoare este ascultată.",
      iconUrl: "🕊️",
      region: "universal",
      difficulty: "uncommon",
    },
    {
      id: "sf-parascheva",
      name: "Sfânta Parascheva",
      feastDay: "14 octombrie",
      virtue: "Smerenie și milostenie",
      storyShort: "Sfânta Cuvioasă Parascheva s-a născut în Tracia (azi Bulgaria). De tânără a ales viața monahală și ascetica. Și-a dat hainele celor săraci și a trăit în post și rugăciune. Moaștele ei se găsesc la Iași și sunt venerate de milioane de români.",
      iconUrl: "🌹",
      region: "roman",
      difficulty: "common",
    },
    {
      id: "sf-daniil",
      name: "Sfântul Daniil Sihastrul",
      feastDay: "18 decembrie",
      virtue: "Rugăciune și sfătuire duhovnicească",
      storyShort: "Sfântul Daniil Sihastrul a trăit în sec. XV în Moldova. A locuit în peșteri, dedicându-se rugăciunii. L-a sfătuit pe Ștefan cel Mare înainte de bătălii. Când Ștefan a venit descurajat după o înfrângere, sfântul l-a îndemnat: 'Nu tu ești biruitor, ci Dumnezeu. Ridică-te și luptă!'",
      iconUrl: "🏔️",
      region: "roman",
      difficulty: "uncommon",
    },
  ];

  for (const saintData of saintsData) {
    await prisma.saintCard.upsert({
      where: { id: saintData.id },
      update: {},
      create: saintData,
    });
  }

  console.log("✅ 8 cărți de sfinți create.");

  // ======== ARTICOLE MAGAZIN ========
  const shopItemsData = [
    // Avatar veșminte
    { id: "item-straie-rom", name: "Straie tradiționale românești", description: "Costum popular autentic", category: "avatar_clothing", talantsCost: 20, isEarnable: false, imageUrl: "👘" },
    { id: "item-mantie", name: "Mantie de monah", description: "Veșmânt monastic", category: "avatar_clothing", talantsCost: 30, isEarnable: false, imageUrl: "🪭" },
    { id: "item-haina-liturgica", name: "Haină liturgică", description: "Veșmânt de slujbă", category: "avatar_clothing", talantsCost: 25, isEarnable: false, imageUrl: "🎽" },
    // Accesorii
    { id: "item-lumanare", name: "Lumânare aprinsă", description: "Simbolul rugăciunii", category: "avatar_accessory", talantsCost: 10, isEarnable: false, imageUrl: "🕯️" },
    { id: "item-carte-rug", name: "Carte de rugăciuni", description: "Psaltire personală", category: "avatar_accessory", talantsCost: 15, isEarnable: false, imageUrl: "📖" },
    { id: "item-busuioc", name: "Ramură de busuioc", description: "Plantă sfântă", category: "avatar_accessory", talantsCost: 8, isEarnable: false, imageUrl: "🌿" },
    { id: "item-aureola", name: "Aureolă specială", description: "Se câștigă prin performanță excepțională", category: "avatar_accessory", talantsCost: 0, isEarnable: true, imageUrl: "✨", requiredCondition: "Completați 50 de activități" },
    // Decorații cameră
    { id: "item-icoana-perete", name: "Icoană pe perete", description: "Decorează camera ta", category: "room_item", talantsCost: 20, isEarnable: false, imageUrl: "🖼️" },
    { id: "item-fereastra", name: "Fereastră cu mănăstire", description: "Priveliște duhovnicească", category: "room_item", talantsCost: 25, isEarnable: false, imageUrl: "🏰" },
    { id: "item-sfesnic", name: "Sfeșnic", description: "Pentru luminarea camerei", category: "room_item", talantsCost: 15, isEarnable: false, imageUrl: "🕯️" },
    { id: "item-covor", name: "Covor tradițional", description: "Covor românesc autentic", category: "room_item", talantsCost: 18, isEarnable: false, imageUrl: "🏮" },
    // Rame sfinți
    { id: "frame-aur", name: "Ramă aurită", description: "Ramă de aur pentru cărțile tale de sfinți", category: "card_frame", talantsCost: 30, isEarnable: false, imageUrl: "🌟" },
    { id: "frame-argint", name: "Ramă argintie", description: "Ramă elegantă de argint", category: "card_frame", talantsCost: 20, isEarnable: false, imageUrl: "⭐" },
    { id: "frame-lemn", name: "Ramă din lemn sculptat", description: "Lemn de tei sculptat manual", category: "card_frame", talantsCost: 15, isEarnable: false, imageUrl: "🪵" },
    { id: "frame-email", name: "Email bizantin", description: "Ramă în stil bizantin", category: "card_frame", talantsCost: 40, isEarnable: false, imageUrl: "💎" },
    // Titluri
    { id: "title-apostol", name: "Mic Apostol", description: "Completați 50 de activități", category: "title", talantsCost: 0, isEarnable: true, imageUrl: "✦", requiredCondition: "Completați 50 de activități" },
    { id: "title-pazitor", name: "Păzitorul Luminii", description: "Câștigați toate misiunile de grup dintr-o lună", category: "title", talantsCost: 0, isEarnable: true, imageUrl: "🕯️", requiredCondition: "Completați toate misiunile de grup într-o lună" },
    { id: "title-credincios", name: "Cel Credincios", description: "30 de zile consecutive active", category: "title", talantsCost: 0, isEarnable: true, imageUrl: "⭐", requiredCondition: "30 de zile consecutive active" },
  ];

  for (const itemData of shopItemsData) {
    await prisma.shopItem.upsert({
      where: { id: itemData.id },
      update: {},
      create: itemData,
    });
  }

  console.log("✅ 18 articole de magazin create.");

  // ======== EVANGHELIE EXEMPLU ========
  await prisma.gospel.upsert({
    where: { id: "gospel-fiul-risipitor" },
    update: {},
    create: {
      id: "gospel-fiul-risipitor",
      title: "Pilda Fiului Risipitor",
      calendarDate: new Date("2025-03-16"),
      moralLesson: "Dumnezeu ne primește înapoi oricând ne întoarcem la El cu inimă smerită.",
      characters: ["Tatăl", "Fiul mai mic", "Fiul mai mare", "Oamenii din țara îndepărtată"],
      isHoliday: false,
      textByAge: {
        "1-2": "Un tată a avut doi fii. Cel mic a plecat departe și a cheltuit tot. Când a rămas fără nimic, s-a întors acasă. Tatăl a alergat să-l îmbrățișeze.",
        "3-4": "Un om bogat a avut doi fii. Cel mai mic i-a cerut tatălui partea sa de avere și a plecat într-o țară îndepărtată, unde a cheltuit totul. Sărăcit, a venit în sine și s-a hotărât să se întoarcă la tatăl său. Tatăl l-a văzut de departe și a alergat la el.",
        "5-6": "Iisus a spus pilda fiului risipitor: Un om a avut doi fii. Cel mai mic i-a cerut averea dinainte de vreme și a plecat în lume. A cheltuit totul în desfrânare. Ajuns în lipsă, s-a angajat la un om care l-a trimis să pască porcii. Flămând, și-a venit în sine: 'Câți argați ai tatălui meu au pâine din belșug, iar eu pier de foame!' S-a ridicat și a mers la tatăl său.",
        "7-8": "Pilda Fiului Risipitor este o parabolă despre iertare și întoarcere la Dumnezeu. Fiul cel mic, cerând moștenirea dinainte, simbolizează omul care 'fuge' de Dumnezeu. Căderea sa și întoarcerea reprezintă pocăința. Revenirea tatălui în alergare ilustrează dragostea nemărginită a lui Dumnezeu pentru fiecare om care se pocăiește.",
      },
      activities: {
        create: [
          {
            type: "questions",
            ageRange: "all",
            content: {
              questions: [
                "De ce crezi că fiul cel mic a vrut să plece de acasă? Ai simțit și tu vreodată ceva asemănător?",
                "Tatăl a alergat la fiul său. Ce ne spune asta despre cum ne primește Dumnezeu când greșim?",
                "Fiul cel mare s-a supărat. Îl înțelegi? Ce ai fi simțit tu în locul lui?",
              ],
            },
          },
        ],
      },
      schedules: {
        create: {
          date: new Date("2025-03-16"),
          isActive: true,
        },
      },
    },
  });

  console.log("✅ Evanghelie exemplu creată.");
  console.log("🎉 Seed complet! Calea Luminii este gata.");
}

main()
  .catch((e) => {
    console.error("❌ Eroare la seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
