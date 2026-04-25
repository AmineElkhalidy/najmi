export const locales = ["en", "fr", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

type LandingDictionary = {
  nav: {
    services: string;
    collection: string;
    reviews: string;
    contact: string;
    whatsapp: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    whatsapp: string;
    location: string;
  };
  why: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };
  collection: {
    title: string;
    subtitle: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    items: Array<{ name: string; text: string }>;
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    book: string;
    mapTitle: string;
  };
  footer: {
    aboutTitle: string;
    aboutText: string;
    hoursTitle: string;
    hoursWeek: string;
    hoursSunday: string;
    followTitle: string;
    rights: string;
  };
  mobileWhatsapp: string;
};

export const dictionary: Record<Locale, LandingDictionary> = {
  en: {
    nav: {
      services: "Services",
      collection: "Collection",
      reviews: "Reviews",
      contact: "Contact",
      whatsapp: "WhatsApp Us",
    },
    hero: {
      badge: "Premium Optician in Laattaouia",
      title: "Vision Care & Premium Eyewear in One Place.",
      subtitle:
        "State-of-the-art eye exams and a wide collection of frames for all ages in Laattaouia.",
      whatsapp: "Contact via WhatsApp",
      location: "View Location",
    },
    why: {
      title: "Why Choose Najmi Optic",
      subtitle:
        "Premium care, trusted expertise, and modern eyewear for your family.",
      items: [
        {
          title: "Advanced Eye Testing Equipment",
          description:
            "State-of-the-art diagnostics for precise, reliable eye examinations.",
        },
        {
          title: "5-Star Google Rated",
          description:
            "Trusted by families in Laattaouia for quality service and warm care.",
        },
        {
          title: "Wide Variety of Frames",
          description:
            "Classic, modern, and premium glasses styles for every face and age.",
        },
        {
          title: "Affordable Prices",
          description:
            "Beautiful eyewear and medical-grade care at fair pricing.",
        },
      ],
    },
    services: {
      title: "Services",
      subtitle: "Medical precision and modern style under one roof.",
      items: [
        {
          title: "Eye Examination",
          description:
            "Professional eye examinations with accurate screening and guidance.",
        },
        {
          title: "Prescription Glasses",
          description:
            "Lunettes de vue crafted for comfort, style, and visual precision.",
        },
        {
          title: "Sunglasses",
          description:
            "UV-protected lunettes de soleil with premium designs for every lifestyle.",
        },
      ],
    },
    collection: {
      title: "Discover Our Frame Collection",
      subtitle:
        "From minimal elegance to bold statement looks, we curate frames that fit your face, personality, and budget.",
    },
    reviews: {
      title: "5-Star Testimonials",
      subtitle: "Social proof from happy customers in Laattaouia.",
      items: [
        {
          name: "Sanae B.",
          text: "Top service. The team is professional and very welcoming. I found perfect lunettes for daily wear.",
        },
        {
          name: "Youssef A.",
          text: "Najmi Optic is the best optician in town. Eye exam was fast, clear, and very professional.",
        },
        {
          name: "Khadija M.",
          text: "Excellent quality, affordable prices, and great after-sales support. Highly recommended.",
        },
      ],
    },
    contact: {
      title: "Visit Najmi Optic Today",
      subtitle:
        "Get trusted eye care and premium lunettes in a welcoming local boutique.",
      address: "Near BIM, Route Lycée Rahali El Farouk, Laattaouia",
      book: "Book Appointment",
      mapTitle: "Najmi Optic location map",
    },
    footer: {
      aboutTitle: "Najmi Optic",
      aboutText:
        "Premium eye care and eyewear in Laattaouia. A trusted optician for all ages.",
      hoursTitle: "Opening Hours",
      hoursWeek: "Mon - Sat: 9:00 AM - 8:00 PM",
      hoursSunday: "Sunday: 10:00 AM - 2:00 PM",
      followTitle: "Follow Us",
      rights: "All rights reserved.",
    },
    mobileWhatsapp: "WhatsApp",
  },
  fr: {
    nav: {
      services: "Services",
      collection: "Collection",
      reviews: "Avis",
      contact: "Contact",
      whatsapp: "WhatsApp",
    },
    hero: {
      badge: "Opticien premium à Laattaouia",
      title: "Soins de la vision et lunettes premium au même endroit.",
      subtitle:
        "Examen de vue de haute précision et large collection de montures pour tous les âges à Laattaouia.",
      whatsapp: "Contacter via WhatsApp",
      location: "Voir la localisation",
    },
    why: {
      title: "Pourquoi choisir Najmi Optic",
      subtitle:
        "Un service premium, une expertise fiable, et un style moderne pour toute la famille.",
      items: [
        {
          title: "Équipements de test avancés",
          description:
            "Diagnostic moderne pour un examen de vue précis et fiable.",
        },
        {
          title: "Noté 5 étoiles sur Google",
          description:
            "Recommandé par les familles de Laattaouia pour la qualité du service.",
        },
        {
          title: "Large variété de montures",
          description:
            "Styles classiques, modernes et premium pour tous les visages.",
        },
        {
          title: "Prix abordables",
          description:
            "Des lunettes élégantes et des soins de qualité à des prix justes.",
        },
      ],
    },
    services: {
      title: "Nos services",
      subtitle: "Précision médicale et élégance moderne sous un même toit.",
      items: [
        {
          title: "Examen de vue",
          description:
            "Contrôle visuel professionnel avec dépistage précis et conseils adaptés.",
        },
        {
          title: "Lunettes de vue",
          description:
            "Confort, style et correction optimale pour votre vision quotidienne.",
        },
        {
          title: "Lunettes de soleil",
          description:
            "Protection UV et designs premium pour chaque style de vie.",
        },
      ],
    },
    collection: {
      title: "Découvrez notre collection de montures",
      subtitle:
        "Du style minimaliste aux modèles audacieux, nous sélectionnons des montures adaptées à votre visage et votre budget.",
    },
    reviews: {
      title: "Avis 5 étoiles",
      subtitle: "La confiance de nos clients à Laattaouia.",
      items: [
        {
          name: "Sanae B.",
          text: "Service top. L'équipe est professionnelle et très accueillante. J'ai trouvé des lunettes parfaites.",
        },
        {
          name: "Youssef A.",
          text: "Najmi Optic est le meilleur opticien de la ville. Examen rapide, clair et professionnel.",
        },
        {
          name: "Khadija M.",
          text: "Excellente qualité, prix abordables et bon suivi après-vente. Je recommande vivement.",
        },
      ],
    },
    contact: {
      title: "Venez chez Najmi Optic",
      subtitle:
        "Profitez de soins visuels fiables et de lunettes premium dans une boutique locale chaleureuse.",
      address: "Près de BIM, Route Lycée Rahali El Farouk, Laattaouia",
      book: "Prendre rendez-vous",
      mapTitle: "Carte - Najmi Optic",
    },
    footer: {
      aboutTitle: "Najmi Optic",
      aboutText:
        "Soins visuels premium et lunettes à Laattaouia. Votre opticien de confiance pour tous les âges.",
      hoursTitle: "Horaires",
      hoursWeek: "Lun - Sam : 9h00 - 20h00",
      hoursSunday: "Dimanche : 10h00 - 14h00",
      followTitle: "Suivez-nous",
      rights: "Tous droits réservés.",
    },
    mobileWhatsapp: "WhatsApp",
  },
  ar: {
    nav: {
      services: "الخدمات",
      collection: "التشكيلة",
      reviews: "آراء الزبناء",
      contact: "اتصل بنا",
      whatsapp: "راسلنا واتساب",
    },
    hero: {
      badge: "بصريات فاخرة في العطاوية",
      title: "العناية بالبصر والنظارات الراقية في مكان واحد.",
      subtitle:
        "فحوصات نظر دقيقة بأجهزة حديثة وتشكيلة واسعة من الإطارات لجميع الأعمار في العطاوية.",
      whatsapp: "تواصل عبر واتساب",
      location: "عرض الموقع",
    },
    why: {
      title: "لماذا تختار Najmi Optic",
      subtitle: "ثقة وجودة وخدمة راقية لعائلتك.",
      items: [
        {
          title: "أجهزة فحص متطورة",
          description: "تشخيص حديث لفحص نظر دقيق وموثوق.",
        },
        {
          title: "تقييم 5 نجوم على Google",
          description: "موصى به من طرف عائلات العطاوية لجودة الخدمة.",
        },
        {
          title: "تشكيلة واسعة من الإطارات",
          description: "موديلات كلاسيكية وعصرية تناسب جميع الأذواق.",
        },
        {
          title: "أسعار مناسبة",
          description: "نظارات أنيقة وعناية طبية بجودة عالية وبسعر معقول.",
        },
      ],
    },
    services: {
      title: "الخدمات",
      subtitle: "دقة طبية وأناقة عصرية تحت سقف واحد.",
      items: [
        {
          title: "فحص النظر",
          description: "فحص احترافي مع تشخيص دقيق وتوجيه مناسب.",
        },
        {
          title: "نظارات طبية",
          description: "راحة وأناقة ودقة بصرية للحياة اليومية.",
        },
        {
          title: "نظارات شمسية",
          description: "حماية من الأشعة فوق البنفسجية بتصاميم راقية.",
        },
      ],
    },
    collection: {
      title: "اكتشف تشكيلتنا من الإطارات",
      subtitle:
        "من الأناقة البسيطة إلى الموديلات الجريئة، نختار لك ما يناسب وجهك وميزانيتك.",
    },
    reviews: {
      title: "آراء 5 نجوم",
      subtitle: "تجارب زبناء سعداء من العطاوية.",
      items: [
        {
          name: "سناء ب.",
          text: "خدمة ممتازة. الطاقم محترف ومرحّب. لقيت نظارات مناسبة بزاف.",
        },
        {
          name: "يوسف أ.",
          text: "Najmi Optic أحسن محل بصريات فالمدينة. الفحص كان سريع وواضح واحترافي.",
        },
        {
          name: "خديجة م.",
          text: "جودة ممتازة وأسعار مناسبة وخدمة ما بعد البيع رائعة.",
        },
      ],
    },
    contact: {
      title: "زوروا Najmi Optic اليوم",
      subtitle: "عناية بصرية موثوقة ونظارات فاخرة في محل محلي مريح.",
      address: "بالقرب من BIM، طريق ثانوية الرحالي الفاروق، العطاوية",
      book: "احجز موعدك",
      mapTitle: "موقع Najmi Optic على الخريطة",
    },
    footer: {
      aboutTitle: "Najmi Optic",
      aboutText:
        "عناية بصرية راقية ونظارات فاخرة في العطاوية. بصري موثوق لجميع الأعمار.",
      hoursTitle: "أوقات العمل",
      hoursWeek: "الاثنين - السبت: 9:00 صباحا - 8:00 مساء",
      hoursSunday: "الأحد: 10:00 صباحا - 2:00 زوالا",
      followTitle: "تابعنا",
      rights: "جميع الحقوق محفوظة.",
    },
    mobileWhatsapp: "واتساب",
  },
};
