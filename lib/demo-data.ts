// Date demo statice — folosite când nu există bază de date

export const DEMO_PARISH = {
  id: "demo-parish",
  name: "Parohia Sf. Ioan Botezătorul",
  city: "Cluj-Napoca",
  email: "demo@parohie.ro",
};

export const DEMO_GROUPS = [
  {
    id: "demo-group-1",
    name: "Grupul Mic (Cl. I-II)",
    ageRange: "1-2",
    inviteCode: "MIC001",
    children: 12,
    teams: [
      { id: "t1", name: "Apostolii", children: 6 },
      { id: "t2", name: "Îngerii", children: 6 },
    ],
  },
  {
    id: "demo-group-2",
    name: "Grupul Mare (Cl. V-VI)",
    ageRange: "5-6",
    inviteCode: "MARE01",
    children: 18,
    teams: [
      { id: "t3", name: "Mucenicii", children: 9 },
      { id: "t4", name: "Proorocii", children: 9 },
    ],
  },
];

export const DEMO_CHILDREN = [
  { id: "c1", displayName: "Andrei M.", talantsBalance: 145, teamName: "Apostolii", totalActivities: 12, isInactive: false },
  { id: "c2", displayName: "Maria P.", talantsBalance: 132, teamName: "Apostolii", totalActivities: 11, isInactive: false },
  { id: "c3", displayName: "Ionuț D.", talantsBalance: 98,  teamName: "Îngerii",   totalActivities: 8,  isInactive: false },
  { id: "c4", displayName: "Elena V.", talantsBalance: 87,  teamName: "Îngerii",   totalActivities: 7,  isInactive: false },
  { id: "c5", displayName: "Rareș B.", talantsBalance: 34,  teamName: "Apostolii", totalActivities: 2,  isInactive: true  },
  { id: "c6", displayName: "Daria N.", talantsBalance: 12,  teamName: "Îngerii",   totalActivities: 1,  isInactive: true  },
  { id: "c7", displayName: "Mihai C.", talantsBalance: 110, teamName: "Apostolii", totalActivities: 9,  isInactive: false },
  { id: "c8", displayName: "Ana F.",   talantsBalance: 76,  teamName: "Îngerii",   totalActivities: 6,  isInactive: false },
];

export const DEMO_THEMES = [
  {
    id: "t1", title: "Ce este Biserica?", weekNumber: 1, mapLocation: "biserica",
    iconEmoji: "⛪", description: "Descoperim împreună casa lui Dumnezeu.",
    activities: [
      { id: "a1", title: "Lecție: Casa lui Dumnezeu", type: "lesson", talantsReward: 5, estimatedMins: 8, completed: true, orderIndex: 1 },
      { id: "a2", title: "Joc: Cunosc Biserica?", type: "quiz", talantsReward: 7, estimatedMins: 10, completed: true, orderIndex: 2 },
      { id: "a3", title: "Potrivire: Părțile Bisericii", type: "matching", talantsReward: 5, estimatedMins: 6, completed: false, orderIndex: 3 },
    ],
  },
  {
    id: "t2", title: "Sfânta Cruce", weekNumber: 2, mapLocation: "gradina",
    iconEmoji: "✝️", description: "Semnificația Crucii lui Hristos.",
    activities: [
      { id: "a4", title: "Lecție: Crucea lui Hristos", type: "lesson", talantsReward: 5, estimatedMins: 8, completed: false, orderIndex: 1 },
      { id: "a5", title: "Joc: Semnul Crucii", type: "quiz", talantsReward: 7, estimatedMins: 8, completed: false, orderIndex: 2 },
    ],
  },
  {
    id: "t3", title: "Rugăciunea", weekNumber: 3, mapLocation: "clopotnita",
    iconEmoji: "🙏", description: "Cum vorbim cu Dumnezeu.",
    activities: [
      { id: "a6", title: "Lecție: Vorbim cu Dumnezeu", type: "lesson", talantsReward: 5, estimatedMins: 8, completed: false, orderIndex: 1 },
      { id: "a7", title: "Potrivire: Momentul Zilei", type: "matching", talantsReward: 6, estimatedMins: 7, completed: false, orderIndex: 2 },
    ],
  },
];

export const DEMO_SAINTS = [
  { id: "s1", name: "Sfântul Ștefan", feastDay: "26 decembrie", virtue: "Curaj și iertare", iconUrl: "✦", region: "universal", difficulty: "common", storyShort: "Primul mucenic creștin. Când a fost ucis cu pietre, s-a rugat pentru ucigașii săi.", owned: true },
  { id: "s2", name: "Sfântul Nicolae", feastDay: "6 decembrie", virtue: "Generozitate", iconUrl: "✦", region: "universal", difficulty: "common", storyShort: "Episcop din Myra, cunoscut pentru generozitatea sa extraordinară față de cei săraci.", owned: true },
  { id: "s3", name: "Sfântul Gheorghe", feastDay: "23 aprilie", virtue: "Vitejie", iconUrl: "✦", region: "universal", difficulty: "common", storyShort: "Ofițer roman care și-a mărturisit credința. Simbol al biruinței binelui asupra răului.", owned: false },
  { id: "s4", name: "Sf. Apostol Andrei", feastDay: "30 noiembrie", virtue: "Apostolat", iconUrl: "✦", region: "roman", difficulty: "common", storyShort: "Ocrotitorul României. Primul chemat de Hristos, a predicat în Dobrogea.", owned: false },
  { id: "s5", name: "Sf. Parascheva", feastDay: "14 octombrie", virtue: "Smerenie", iconUrl: "✦", region: "roman", difficulty: "uncommon", storyShort: "Sfânta cuvioasă ale cărei moaște se găsesc la Iași, venerate de milioane de români.", owned: false },
  { id: "s6", name: "Sf. Constantin și Elena", feastDay: "21 mai", virtue: "Credință", iconUrl: "✦", region: "universal", difficulty: "uncommon", storyShort: "Constantin a dat libertate creștinilor. Elena a găsit Crucea lui Hristos.", owned: false },
];

export const DEMO_SHOP_ITEMS = [
  { id: "i1", name: "Straie tradiționale", description: "Costum popular românesc", category: "avatar_clothing", talantsCost: 20, imageUrl: "👘", isEarnable: false, requiredCondition: null, owned: false, equipped: false },
  { id: "i2", name: "Mantie de monah", description: "Veșmânt monastic", category: "avatar_clothing", talantsCost: 30, imageUrl: "🪭", isEarnable: false, requiredCondition: null, owned: false, equipped: false },
  { id: "i3", name: "Lumânare aprinsă", description: "Simbolul rugăciunii", category: "avatar_accessory", talantsCost: 10, imageUrl: "🕯️", isEarnable: false, requiredCondition: null, owned: true, equipped: true },
  { id: "i4", name: "Carte de rugăciuni", description: "Psaltire personală", category: "avatar_accessory", talantsCost: 15, imageUrl: "📖", isEarnable: false, requiredCondition: null, owned: false, equipped: false },
  { id: "i5", name: "Icoană pe perete", description: "Decorează camera ta", category: "room_item", talantsCost: 20, imageUrl: "🖼️", isEarnable: false, requiredCondition: null, owned: true, equipped: true },
  { id: "i6", name: "Sfeșnic", description: "Pentru luminarea camerei", category: "room_item", talantsCost: 15, imageUrl: "🕯️", isEarnable: false, requiredCondition: null, owned: false, equipped: false },
  { id: "i7", name: "Ramă aurită", description: "Ramă de aur pentru sfinți", category: "card_frame", talantsCost: 30, imageUrl: "🌟", isEarnable: false, requiredCondition: null, owned: false, equipped: false },
  { id: "i8", name: "Mic Apostol", description: "Completați 50 activități", category: "title", talantsCost: 0, imageUrl: "✦", isEarnable: true, requiredCondition: "Completați 50 de activități", owned: false, equipped: false },
];

export const DEMO_QUIZ_QUESTIONS = [
  { id: "q1", text: "Ce este Biserica?", options: ["Un muzeu", "Casa lui Dumnezeu", "O școală", "Un parc"], correctAnswer: "Casa lui Dumnezeu", explanation: "Biserica este casa lui Dumnezeu pe pământ, locul unde ne întâlnim cu El." },
  { id: "q2", text: "Cu câte degete ne facem semnul Crucii?", options: ["Un deget", "Două degete", "Trei degete", "Cinci degete"], correctAnswer: "Trei degete", explanation: "Cele trei degete unite simbolizează Sfânta Treime: Tatăl, Fiul și Sfântul Duh." },
  { id: "q3", text: "Ce este rugăciunea?", options: ["Un joc", "Convorbirea noastră cu Dumnezeu", "O lecție", "Un cântec"], correctAnswer: "Convorbirea noastră cu Dumnezeu", explanation: "Prin rugăciune stăm de vorbă cu Dumnezeu, ca un copil cu tatăl său iubitor." },
  { id: "q4", text: "Cine ne-a învățat rugăciunea Tatăl Nostru?", options: ["Mama", "Preotul", "Însuși Iisus Hristos", "Un sfânt"], correctAnswer: "Însuși Iisus Hristos", explanation: "Rugăciunea Tatăl Nostru este darul lui Hristos pentru noi." },
  { id: "q5", text: "Ce sărbătorim de Paști?", options: ["Nașterea lui Hristos", "Învierea lui Hristos", "Botezul lui Hristos", "Intrarea în Ierusalim"], correctAnswer: "Învierea lui Hristos", explanation: "Paștele este sărbătoarea Învierii — cea mai mare bucurie creștină." },
];

export const DEMO_CHILD = {
  id: "demo-child",
  displayName: "Andrei M.",
  talantsBalance: 145,
  avatarConfig: { avatarType: 0, clothingColor: "albastru" },
  groupId: "demo-group-1",
  teamName: "Apostolii",
  totalActivities: 12,
  totalSaints: 2,
  iconProgress: { completedLayers: 4, totalLayers: 10 },
};
