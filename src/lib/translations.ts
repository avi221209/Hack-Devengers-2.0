import { BusinessCategory, SupportedLanguage } from "./types";

export interface Translations {
  appName: string;
  tagline: string;
  languageSelect: string;
  createStorefront: string;
  myStorefronts: string;
  heroHeadline: string;
  heroSubheadline: string;
  twoMinutesBadge: string;
  formTitle: string;
  formSubtitle: string;
  step1: string;
  step2: string;
  step3: string;
  labels: {
    businessName: string;
    businessNamePlaceholder: string;
    businessNameHelp: string;
    category: string;
    categorySelect: string;
    services: string;
    servicesPlaceholder: string;
    servicesHelp: string;
    quickAddServices: string;
    timings: string;
    timingsPlaceholder: string;
    timingsHelp: string;
    timingPresets: {
      morningToNight: string;
      commercial: string;
      sevenDays: string;
      closedSunday: string;
    };
    address: string;
    addressPlaceholder: string;
    addressHelp: string;
    whatsapp: string;
    whatsappPlaceholder: string;
    whatsappHelp: string;
    priceRange: string;
    priceRangePlaceholder: string;
    priceRangeHelp: string;
    description: string;
    descriptionPlaceholder: string;
    descriptionHelp: string;
    submitButton: string;
    generatingTitle: string;
    generatingSubtitle: string;
  };
  categories: Record<BusinessCategory, { label: string; iconName: string; suggestions: string[] }>;
  common: {
    required: string;
    optional: string;
    back: string;
    chatWhatsApp: string;
    callNow: string;
    shareStore: string;
    openNow: string;
    closedNow: string;
    getDirections: string;
    servicesOffered: string;
    aboutUs: string;
    businessHours: string;
    location: string;
    copiedLink: string;
    copyLink: string;
    viewQr: string;
    downloadQr: string;
    scanToVisit: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: "Dukaan Ready",
    tagline: "Your Business Online in 2 Minutes",
    languageSelect: "Language / भाषा / भाषा निवडा",
    createStorefront: "Create My Storefront",
    myStorefronts: "My Storefronts",
    heroHeadline: "Your Business Online in 2 Minutes",
    heroSubheadline: "Instant AI-powered storefront for India's local heroes — tailors, tutors, clinics, mechanics, home chefs & salons.",
    twoMinutesBadge: "⚡ 2 Minutes • 100% Free • No Coding Required",
    formTitle: "Create Your Instant Dukaan Page",
    formSubtitle: "Enter basic details. Our AI will craft a professional tagline, warm description, and WhatsApp catalog instantly.",
    step1: "Basic Details",
    step2: "Offerings & Timings",
    step3: "Contact & Location",
    labels: {
      businessName: "Business Name",
      businessNamePlaceholder: "e.g., Sharma Tailors & Boutique / Sai Coaching Classes",
      businessNameHelp: "The official name displayed at the top of your digital storefront.",
      category: "Business Category",
      categorySelect: "Select Category",
      services: "Services / Products Offered",
      servicesPlaceholder: "e.g., Blouse Stitching, Suit Alterations, Fall-Pico, Custom Gowns",
      servicesHelp: "Separate each service with a comma or click the suggestions below.",
      quickAddServices: "Quick suggestions for your business:",
      timings: "Shop Timings / Working Hours",
      timingsPlaceholder: "e.g., 9:30 AM – 9:00 PM (Monday to Saturday)",
      timingsHelp: "When are you available for customer visits and orders?",
      timingPresets: {
        morningToNight: "9:00 AM – 9:00 PM (Daily)",
        commercial: "10:00 AM – 8:30 PM (Mon-Sat)",
        sevenDays: "8:00 AM – 10:00 PM (All 7 Days)",
        closedSunday: "10:00 AM – 8:00 PM (Sunday Closed)",
      },
      address: "Shop Address / Location",
      addressPlaceholder: "e.g., Shop No. 4, MG Road, near City Post Office, Pune",
      addressHelp: "We will automatically pin this on Google Maps for your customers.",
      whatsapp: "Contact WhatsApp Number",
      whatsappPlaceholder: "10-digit mobile number (e.g. 9876543210)",
      whatsappHelp: "Customers will directly message this WhatsApp with 1 tap.",
      priceRange: "Price Range (Optional)",
      priceRangePlaceholder: "e.g., ₹250 onwards / ₹500 - ₹3,000",
      priceRangeHelp: "Helps customers understand your pricing budget upfront.",
      description: "Short Description in your own words (Optional)",
      descriptionPlaceholder: "Tell us a bit about your experience, specialty, or customer guarantee...",
      descriptionHelp: "Our AI will turn your notes into an engaging, customer-winning story.",
      submitButton: "Generate My Storefront ✨",
      generatingTitle: "Creating Your Digital Dukaan...",
      generatingSubtitle: "AI is polishing your tagline, structuring services & generating your WhatsApp link.",
    },
    categories: {
      Tailoring: {
        label: "Tailoring & Boutique",
        iconName: "Scissors",
        suggestions: ["Blouse Stitching", "Suit & Salwar Fitting", "Kurti Alterations", "Fall & Pico", "Designer Lehengas", "Urgent 24hr Delivery"],
      },
      "Tuition/Education": {
        label: "Tuition / Education",
        iconName: "GraduationCap",
        suggestions: ["Class 8-10 CBSE/State", "Maths & Science Batches", "1-on-1 Personal Attention", "Weekly Mock Tests", "Physics & Chemistry 11th-12th"],
      },
      "Clinic/Healthcare": {
        label: "Clinic / Healthcare",
        iconName: "Stethoscope",
        suggestions: ["General Physician Consultation", "BP & Sugar Checkup", "Vaccination", "Nebulization & First Aid", "Doctor Home Visits"],
      },
      "Mechanic/Repair": {
        label: "Mechanic / Vehicle Repair",
        iconName: "Wrench",
        suggestions: ["Two-Wheeler Servicing", "Oil Change & Tuning", "Puncture & Tube Repair", "Brake & Chain Overhaul", "Emergency Roadside Assistance"],
      },
      "Food/Catering": {
        label: "Food / Home Kitchen / Catering",
        iconName: "Utensils",
        suggestions: ["Daily Home-cooked Tiffin", "Pure Veg Thali", "Party Catering (20-100 pax)", "Traditional Sweets & Snacks", "Hygienic Home Kitchen"],
      },
      "Salon/Beauty": {
        label: "Salon / Beauty Parlour",
        iconName: "Sparkles",
        suggestions: ["Bridal Makeup & Hair", "Facial & Cleanup", "Threading & Waxing", "Hair Spa & Keratin", "Manicure & Pedicure"],
      },
      Other: {
        label: "Other Local Business",
        iconName: "Store",
        suggestions: ["Custom Order Inquiries", "Doorstep Service", "Quality Guaranteed", "Quick Turnaround"],
      },
    },
    common: {
      required: "Required",
      optional: "Optional",
      back: "Back",
      chatWhatsApp: "Chat on WhatsApp",
      callNow: "Call Now",
      shareStore: "Share Storefront & QR",
      openNow: "Open Now",
      closedNow: "Closed for the day",
      getDirections: "Open in Google Maps",
      servicesOffered: "Services & Offerings",
      aboutUs: "About Our Business",
      businessHours: "Working Hours",
      location: "Shop Address & Map",
      copiedLink: "Link Copied to Clipboard!",
      copyLink: "Copy Store Link",
      viewQr: "Scan or Download QR Poster",
      downloadQr: "Download QR Poster",
      scanToVisit: "Scan to visit storefront on phone",
    },
  },

  hi: {
    appName: "दुकान रेडी (Dukaan Ready)",
    tagline: "आपकी दुकान, सिर्फ 2 मिनट में ऑनलाइन",
    languageSelect: "भाषा बदलें (Select Language)",
    createStorefront: "अपनी दुकान का पेज बनाएं",
    myStorefronts: "मेरी दुकानें",
    heroHeadline: "आपकी दुकान, सिर्फ 2 मिनट में ऑनलाइन",
    heroSubheadline: "दर्जी, ट्यूशन टीचर, डॉक्टर, मैकेनिक, घरेलू टिफिन और ब्यूटी पार्लर के लिए आसान AI डिजिटल स्टोरफ्रंट।",
    twoMinutesBadge: "⚡ केवल 2 मिनट • 100% फ्री • कंप्यूटर की जरूरत नहीं",
    formTitle: "अपनी डिजिटल दुकान की जानकारी भरें",
    formSubtitle: "कुछ बुनियादी विवरण दें। हमारा AI आपके लिए सुंदर टैगलाइन, परिचय और व्हाट्सएप कैटलॉग तुरंत तैयार करेगा।",
    step1: "दुकान की जानकारी",
    step2: "सेवाएं और समय",
    step3: "व्हाट्सएप और पता",
    labels: {
      businessName: "दुकान / व्यवसाय का नाम",
      businessNamePlaceholder: "उदा. शर्मा टेलर्स एंड बुटीक / साईं कोचिंग क्लासेस",
      businessNameHelp: "यह नाम आपके ऑनलाइन पेज के सबसे ऊपर दिखेगा।",
      category: "व्यवसाय की श्रेणी (Category)",
      categorySelect: "श्रेणी चुनें",
      services: "दी जाने वाली सेवाएं (Services)",
      servicesPlaceholder: "उदा. ब्लाउज सिलाई, सूट फिटिंग, फॉल-पिको, कुर्ती आल्टरेशन",
      servicesHelp: "कॉमा (,) लगाकर लिखें या नीचे दिए गए सुझावों पर क्लिक करें।",
      quickAddServices: "अपनी दुकान के अनुसार तुरंत चुनें:",
      timings: "दुकान खुलने का समय (Timings)",
      timingsPlaceholder: "उदा. सुबह 9:30 से रात 9:00 बजे तक (सोमवार से शनिवार)",
      timingsHelp: "ग्राहक कब आपकी दुकान पर आ सकते हैं?",
      timingPresets: {
        morningToNight: "सुबह 9:00 से रात 9:00 (रोजाना)",
        commercial: "सुबह 10:00 से रात 8:30 (सोमवार-शनिवार)",
        sevenDays: "सुबह 8:00 से रात 10:00 (सातों दिन)",
        closedSunday: "सुबह 10:00 से रात 8:00 (रविवार बंद)",
      },
      address: "दुकान का पूरा पता (Address)",
      addressPlaceholder: "उदा. शॉप नं. 4, एमजी रोड, सिटी पोस्ट ऑफिस के पास, पुणे",
      addressHelp: "यह पता आपके पेज पर गूगल मैप्स में सीधे दिखाई देगा।",
      whatsapp: "संपर्क व्हाट्सएप नंबर (WhatsApp No.)",
      whatsappPlaceholder: "10 अंकों का मोबाइल नंबर (उदा. 9876543210)",
      whatsappHelp: "ग्राहक सीधे इस नंबर पर व्हाट्सएप मैसेज भेज सकेंगे।",
      priceRange: "कीमत / चार्ज (वैकल्पिक)",
      priceRangePlaceholder: "उदा. ₹250 से शुरू / ₹500 - ₹2,000",
      priceRangeHelp: "ग्राहकों को आपके काम की अनुमानित कीमत समझने में आसानी होगी।",
      description: "अपने काम के बारे में 1-2 बातें (वैकल्पिक)",
      descriptionPlaceholder: "उदा. 15 साल का अनुभव, सही फिटिंग की गारंटी, समय पर डिलीवरी...",
      descriptionHelp: "हमारा AI इसे एक आकर्षक और भरोसेमंद परिचय में बदल देगा।",
      submitButton: "मेरी दुकान का पेज बनाएं ✨",
      generatingTitle: "आपकी दुकान तैयार हो रही है...",
      generatingSubtitle: "AI आपकी टैगलाइन लिख रहा है और व्हाट्सएप लिंक तैयार कर रहा है।",
    },
    categories: {
      Tailoring: {
        label: "सिलाई / टेलरिंग बुटीक",
        iconName: "Scissors",
        suggestions: ["ब्लाउज सिलाई", "सूट-सलवार फिटिंग", "कुर्ती आल्टरेशन", "फॉल-पिको", "डिजाइनर लहंगा", "24 घंटे में अर्जेंट डिलीवरी"],
      },
      "Tuition/Education": {
        label: "ट्यूशन / कोचिंग क्लासेस",
        iconName: "GraduationCap",
        suggestions: ["कक्षा 8-10 वीं सीबीएसई/स्टेट बोर्ड", "गणित और विज्ञान स्पेशल बैच", "व्यक्तिगत ध्यान", "साप्ताहिक टेस्ट", "11वीं-12वीं फिजिक्स-केमिस्ट्री"],
      },
      "Clinic/Healthcare": {
        label: "दवाखाना / क्लिनिक / डॉक्टर",
        iconName: "Stethoscope",
        suggestions: ["सामान्य स्वास्थ्य जांच", "बीपी और शुगर चेकअप", "टीकाकरण (Vaccination)", "नेबुलाइजर व प्राथमिक उपचार", "घर पर डॉक्टर विजिट"],
      },
      "Mechanic/Repair": {
        label: "मैकेनिक / गैरेज / रिपेयर",
        iconName: "Wrench",
        suggestions: ["टू-व्हीलर सर्विसिंग", "इंजन ऑइल बदलना व ट्यूनिंग", "पंक्चर व ट्यूब रिपेयर", "ब्रेक और चेन काम", "इमरजेंसी रोडसाइड मदद"],
      },
      "Food/Catering": {
        label: "घर का खाना / टिफिन / केटरिंग",
        iconName: "Utensils",
        suggestions: ["दैनिक घर जैसा टिफिन", "शुद्ध शाकाहारी थाली", "छोटे आयोजनों के लिए केटरिंग", "घर की बनी मिठाइयां व नमकीन", "साफ-सुथरी रसोई"],
      },
      "Salon/Beauty": {
        label: "ब्यूटी पार्लर / सैलून",
        iconName: "Sparkles",
        suggestions: ["ब्राइडल मेकअप व हेयरस्टाइल", "फेशियल और क्लीनअप", "थ्रेडिंग और वैक्सिंग", "हेयर स्पा और केराटिन", "मेनिक्योर-पेडिक्योर"],
      },
      Other: {
        label: "अन्य स्थानीय व्यवसाय",
        iconName: "Store",
        suggestions: ["कस्टम ऑर्डर इंक्वायरी", "डोरस्टेप डिलीवरी", "संतुष्टि की गारंटी", "तेज सेवा"],
      },
    },
    common: {
      required: "ज़रूरी",
      optional: "वैकल्पिक",
      back: "वापस जाएं",
      chatWhatsApp: "व्हाट्सएप पर बात करें",
      callNow: "सीधे कॉल करें",
      shareStore: "दुकान शेयर करें और QR देखें",
      openNow: "अभी खुला है (Open)",
      closedNow: "आज के लिए बंद है (Closed)",
      getDirections: "गूगल मैप पर रास्ता देखें",
      servicesOffered: "हमारी सेवाएं व प्रोडक्ट्स",
      aboutUs: "हमारे बारे में",
      businessHours: "दुकान का समय",
      location: "दुकान का पता व मैप",
      copiedLink: "लिंक कॉपी हो गया!",
      copyLink: "दुकान का लिंक कॉपी करें",
      viewQr: "दुकान का QR कोड पोस्टर",
      downloadQr: "QR पोस्टर डाउनलोड करें",
      scanToVisit: "फोन से स्कैन करके पेज देखें",
    },
  },

  mr: {
    appName: "दुकान रेडी (Dukaan Ready)",
    tagline: "तुमची दुकान, अवघ्या २ मिनिटांत ऑनलाइन",
    languageSelect: "भाषा निवडा (Select Language)",
    createStorefront: "माझं दुकान ऑनलाइन सुरू करा",
    myStorefronts: "माझी दुकाने",
    heroHeadline: "तुमची दुकान, अवघ्या २ मिनिटांत ऑनलाइन",
    heroSubheadline: "शिंपी, ट्युशन शिक्षक, डॉक्टर, गॅरेज मॅकेनिक, घरगुती मेस आणि ब्युटी पार्लरसाठी खास AI डिजिटल दुकान.",
    twoMinutesBadge: "⚡ फक्त २ मिनिटे • १००% मोफत • कोणत्याही कोडिंगची गरज नाही",
    formTitle: "तुमच्या दुकानाची माहिती भरा",
    formSubtitle: "काही प्राथमिक माहिती भरा. आमचा AI तुमच्यासाठी सुंदर टॅगलाइन, परिचय आणि व्हॉट्सॲप कॅटलॉग लगेच तयार करेल.",
    step1: "दुकानाची माहिती",
    step2: "सेवा आणि वेळ",
    step3: "व्हॉट्सॲप आणि पत्ता",
    labels: {
      businessName: "दुकानाचे / व्यवसायाचे नाव",
      businessNamePlaceholder: "उदा. पाटील टेलर्स अँड बुटीक / समर्थ क्लासेस",
      businessNameHelp: "हे नाव तुमच्या ऑनलाइन पेजच्या सर्वात वर दिसेल.",
      category: "व्यवसायाचा प्रकार (Category)",
      categorySelect: "प्रकार निवडा",
      services: "दिली जाणारी कामे / सेवा (Services)",
      servicesPlaceholder: "उदा. ब्लाउज शिलाई, ड्रेस फिटिंग, फॉल-पिको, कुर्ती अल्टरेशन",
      servicesHelp: "स्वल्पविराम (,) देऊन लिहा किंवा खालील पर्यायांवर क्लिक करा.",
      quickAddServices: "तुमच्या व्यवसायासाठी काही नेहमीच्या सेवा:",
      timings: "दुकान उघडे असण्याची वेळ (Timings)",
      timingsPlaceholder: "उदा. सकाळी ९:३० ते रात्री ९:०० (सोमवार ते शनिवार)",
      timingsHelp: "ग्राहक कोणत्या वेळेत दुकानात किंवा संपर्क करू शकतात?",
      timingPresets: {
        morningToNight: "सकाळी ९:०० ते रात्री ९:०० (दररोज)",
        commercial: "सकाळी १०:०० ते रात्री ८:३० (सोम-शनि)",
        sevenDays: "सकाळी ८:०० ते रात्री १०:०० (सातो दिवस)",
        closedSunday: "सकाळी १०:०० ते रात्री ८:०० (रविवार सुट्टी)",
      },
      address: "दुकानाचा पत्ता (Address)",
      addressPlaceholder: "उदा. गाळा नं. ३, बस स्टँड जवळ, टिळक रोड, पुणे",
      addressHelp: "हा पत्ता आपोआप गुगल मॅप्सवर ग्राहकांना दिसेल.",
      whatsapp: "व्हॉट्सॲप नंबर (WhatsApp No.)",
      whatsappPlaceholder: "१० अंकी मोबाईल नंबर (उदा. 9876543210)",
      whatsappHelp: "ग्राहक या नंबरवर एका क्लिकवर व्हॉट्सॲप मेसेज पाठवू शकतील.",
      priceRange: "कामाचा दर / किंमत (ऐच्छिक)",
      priceRangePlaceholder: "उदा. ₹२०० पासून पुढे / ₹५०० - ₹२,५००",
      priceRangeHelp: "ग्राहकांना तुमच्या दरांचा अंदाज येण्यास मदत होईल.",
      description: "दुकानाबद्दल काही ओळी (ऐच्छिक)",
      descriptionPlaceholder: "उदा. १५ वर्षांचा अनुभव, परिपूर्ण फिटिंगची खात्री, वेळेवर काम...",
      descriptionHelp: "आमचा AI या माहितीचे रूपांतर एका विश्वासार्ह व आकर्षक परिचयात करेल.",
      submitButton: "माझे ऑनलाइन दुकान तयार करा ✨",
      generatingTitle: "तुमचे दुकान तयार होत आहे...",
      generatingSubtitle: "AI तुमच्यासाठी सुंदर माहिती आणि व्हॉट्सॲप लिंक तयार करत आहे.",
    },
    categories: {
      Tailoring: {
        label: "शिंपी काम / टेलरिंग बुटीक",
        iconName: "Scissors",
        suggestions: ["ब्लाउज शिलाई", "ड्रेस व सलवार फिटिंग", "कुर्ती अल्टरेशन", "फॉल-पिको", "डिझाइनर नववारी / लेहेंगा", "२४ तासांत तातडीने डिलिव्हरी"],
      },
      "Tuition/Education": {
        label: "ट्युशन / शिकवणी क्लासेस",
        iconName: "GraduationCap",
        suggestions: ["इयत्ता ८ वी ते १० वी स्टेट/CBSE", "गणित व विज्ञान स्पेशल बॅचेस", "वैयक्तिक मार्गदर्शन", "साप्ताहिक सराव परीक्षा", "११ वी व १२ वी सायन्स"],
      },
      "Clinic/Healthcare": {
        label: "दवाखाना / क्लिनिक / आरोग्य केंद्र",
        iconName: "Stethoscope",
        suggestions: ["सामान्य तपासणी", "रक्तदाब व शुगर तपासणी", "लसीकरण (Vaccination)", "नेब्युलायझर व प्रथमोपचार", "घरी जाऊन तपासणी"],
      },
      "Mechanic/Repair": {
        label: "गॅरेज / मेकॅनिक / वाहन दुरुस्ती",
        iconName: "Wrench",
        suggestions: ["टू-व्हीलर सर्विसिंग", "ऑईल बदलणे व ट्युनिंग", "पंक्चर व ट्यूब दुरुस्ती", "ब्रेक व चेन दुरुस्ती", "रस्त्यावर तातडीची मदत"],
      },
      "Food/Catering": {
        label: "घरगुती डबा / केटरिंग / खाणावळ",
        iconName: "Utensils",
        suggestions: ["दररोजचा रुचकर घरगुती डबा", "शुद्ध शाकाहारी जेवण / थाळी", "घरगुती सण व समारंभ जेवण", "पारंपारिक लाडू व फराळ", "स्वच्छ व चवदार अन्न"],
      },
      "Salon/Beauty": {
        label: "ब्युटी पार्लर / सलून",
        iconName: "Sparkles",
        suggestions: ["ब्रायडल मेकअप व हेअरस्टाईल", "फेशिअल व क्लिनअप", "थ्रेडिंग व व्हॅक्सिंग", "हेअर स्पा व केराटिन", "मॅनिक्युअर व पेडीक्युअर"],
      },
      Other: {
        label: "इतर स्थानिक व्यवसाय",
        iconName: "Store",
        suggestions: ["ऑर्डरनुसार काम", "घरोघरी सेवा", "कामाची खात्री", "तातडीने सेवा"],
      },
    },
    common: {
      required: "आवश्यक",
      optional: "ऐच्छिक",
      back: "मागे",
      chatWhatsApp: "व्हॉट्सॲपवर संपर्क करा",
      callNow: "कॉल करा",
      shareStore: "दुकान शेअर करा व QR बघा",
      openNow: "सध्या सुरू आहे (Open)",
      closedNow: "आज बंद आहे (Closed)",
      getDirections: "गुगल मॅपवर दिशा बघा",
      servicesOffered: "आमच्या सेवा व कामे",
      aboutUs: "आमच्याबद्दल",
      businessHours: "कामकाजाची वेळ",
      location: "पत्ता व नकाशा",
      copiedLink: "लिंक कॉपी झाली!",
      copyLink: "दुकान लिंक कॉपी करा",
      viewQr: "दुकान QR कोड पोस्टर",
      downloadQr: "QR पोस्टर डाऊनलोड करा",
      scanToVisit: "मोबाईलवरून स्कॅन करून दुकान बघा",
    },
  },
};
