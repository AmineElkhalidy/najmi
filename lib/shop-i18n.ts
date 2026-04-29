import type { Locale } from "@/lib/i18n";

export type ShopDictionary = {
  nav: {
    home: string;
    shop: string;
    men: string;
    women: string;
    kids: string;
    sunglasses: string;
    accessories: string;
    appointment: string;
    searchPlaceholder: string;
    cart: string;
    account: string;
    menu: string;
  };
  megaMenu: {
    shopAll: string;
    byShape: string;
    byMaterial: string;
    featured: string;
    newArrivals: string;
    bestsellers: string;
    seeCollection: string;
  };
  shop: {
    pageTitle: string;
    pageSubtitle: string;
    breadcrumbHome: string;
    breadcrumbShop: string;
    filtersTitle: string;
    clearFilters: string;
    applyFilters: string;
    showingResults: string;
    noResults: string;
    sortBy: string;
    sortNewest: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortRating: string;
    filterFrameShape: string;
    filterFaceShape: string;
    filterGender: string;
    filterPrice: string;
    filterCategory: string;
  };
  product: {
    backToShop: string;
    addToCart: string;
    selectLenses: string;
    virtualTryOn: string;
    virtualTryOnSoon: string;
    framePrice: string;
    lensesPrice: string;
    totalPrice: string;
    inStock: string;
    outOfStock: string;
    shipping: string;
    materials: string;
    faceShapeFit: string;
    highlights: string;
    description: string;
    relatedTitle: string;
  };
  lensFlow: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step2Upload: string;
    step2NoFile: string;
    step2HelpUploadLater: string;
    step3Title: string;
    step3Description: string;
    summaryTitle: string;
    confirm: string;
    back: string;
    next: string;
    finish: string;
    requiredPrescription: string;
  };
  cart: {
    title: string;
    empty: string;
    emptyHint: string;
    continueShopping: string;
    checkout: string;
    subtotal: string;
    shippingNote: string;
    remove: string;
    quantity: string;
    lensConfig: string;
    framesOnly: string;
  };
  footer: {
    tagline: string;
    shopHeading: string;
    helpHeading: string;
    legalHeading: string;
    visitHeading: string;
    newsletter: string;
    newsletterPlaceholder: string;
    newsletterCta: string;
    secureCheckout: string;
    freeShipping: string;
    returnPolicy: string;
    customerCare: string;
    rights: string;
    address: string;
  };
};

export const shopDictionary: Record<Locale, ShopDictionary> = {
  fr: {
    nav: {
      home: "Accueil",
      shop: "Boutique",
      men: "Homme",
      women: "Femme",
      kids: "Enfant",
      sunglasses: "Lunettes de soleil",
      accessories: "Accessoires",
      appointment: "Rendez-vous",
      searchPlaceholder: "Rechercher des montures...",
      cart: "Panier",
      account: "Compte",
      menu: "Menu",
    },
    megaMenu: {
      shopAll: "Tout voir",
      byShape: "Par forme",
      byMaterial: "Par matériau",
      featured: "À la une",
      newArrivals: "Nouveautés",
      bestsellers: "Meilleures ventes",
      seeCollection: "Voir la collection",
    },
    shop: {
      pageTitle: "La Collection",
      pageSubtitle:
        "Des montures premium soigneusement sélectionnées pour chaque visage et chaque style.",
      breadcrumbHome: "Accueil",
      breadcrumbShop: "Boutique",
      filtersTitle: "Filtres",
      clearFilters: "Tout effacer",
      applyFilters: "Appliquer",
      showingResults: "résultats",
      noResults: "Aucun résultat. Essayez d'ajuster vos filtres.",
      sortBy: "Trier par",
      sortNewest: "Nouveautés",
      sortPriceAsc: "Prix croissant",
      sortPriceDesc: "Prix décroissant",
      sortRating: "Mieux notés",
      filterFrameShape: "Forme de monture",
      filterFaceShape: "Forme de visage",
      filterGender: "Genre",
      filterPrice: "Prix",
      filterCategory: "Catégorie",
    },
    product: {
      backToShop: "Retour à la boutique",
      addToCart: "Ajouter au panier",
      selectLenses: "Choisir les verres",
      virtualTryOn: "Essayage virtuel",
      virtualTryOnSoon: "Bientôt disponible",
      framePrice: "Monture",
      lensesPrice: "Verres",
      totalPrice: "Total",
      inStock: "En stock",
      outOfStock: "Rupture de stock",
      shipping: "Livraison gratuite à partir de 1500 MAD",
      materials: "Matériau",
      faceShapeFit: "Convient aux visages",
      highlights: "Caractéristiques",
      description: "Description",
      relatedTitle: "Vous aimerez aussi",
    },
    lensFlow: {
      title: "Choisissez vos verres",
      subtitle:
        "Personnalisez vos verres selon votre prescription et vos besoins.",
      step1Title: "1. Type de verres",
      step1Description: "Sélectionnez le type adapté à votre vision.",
      step2Title: "2. Ordonnance",
      step2Description: "Téléchargez votre ordonnance (PDF, JPG ou PNG).",
      step2Upload: "Choisir un fichier",
      step2NoFile: "Aucun fichier sélectionné",
      step2HelpUploadLater:
        "Vous pourrez aussi nous envoyer votre ordonnance plus tard par WhatsApp.",
      step3Title: "3. Améliorations",
      step3Description: "Ajoutez des traitements pour vos verres.",
      summaryTitle: "Récapitulatif",
      confirm: "Confirmer la sélection",
      back: "Précédent",
      next: "Suivant",
      finish: "Terminer",
      requiredPrescription: "Une ordonnance est requise pour ce type de verres.",
    },
    cart: {
      title: "Votre panier",
      empty: "Votre panier est vide",
      emptyHint: "Découvrez notre collection de montures premium.",
      continueShopping: "Continuer mes achats",
      checkout: "Passer à la caisse",
      subtotal: "Sous-total",
      shippingNote: "Frais de livraison calculés à l'étape suivante.",
      remove: "Retirer",
      quantity: "Quantité",
      lensConfig: "Configuration des verres",
      framesOnly: "Monture uniquement",
    },
    footer: {
      tagline: "Opticien premium à Laattaouia. Soins et style sous un même toit.",
      shopHeading: "Boutique",
      helpHeading: "Aide",
      legalHeading: "Légal",
      visitHeading: "Nous rendre visite",
      newsletter:
        "Recevez les nouveautés, conseils visuels, et offres exclusives.",
      newsletterPlaceholder: "Votre adresse e-mail",
      newsletterCta: "S'abonner",
      secureCheckout: "Paiement sécurisé",
      freeShipping: "Livraison offerte dès 1500 MAD",
      returnPolicy: "Retours sous 14 jours",
      customerCare: "Service client 7j/7",
      rights: "Tous droits réservés.",
      address: "Près de BIM, Route Lycée Rahali El Farouk, Laattaouia",
    },
  },
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      men: "Men",
      women: "Women",
      kids: "Kids",
      sunglasses: "Sunglasses",
      accessories: "Accessories",
      appointment: "Appointment",
      searchPlaceholder: "Search frames...",
      cart: "Cart",
      account: "Account",
      menu: "Menu",
    },
    megaMenu: {
      shopAll: "Shop all",
      byShape: "By shape",
      byMaterial: "By material",
      featured: "Featured",
      newArrivals: "New arrivals",
      bestsellers: "Bestsellers",
      seeCollection: "See collection",
    },
    shop: {
      pageTitle: "The Collection",
      pageSubtitle:
        "Premium frames hand-curated for every face shape and every style.",
      breadcrumbHome: "Home",
      breadcrumbShop: "Shop",
      filtersTitle: "Filters",
      clearFilters: "Clear all",
      applyFilters: "Apply",
      showingResults: "results",
      noResults: "No results. Try adjusting your filters.",
      sortBy: "Sort by",
      sortNewest: "Newest",
      sortPriceAsc: "Price: low to high",
      sortPriceDesc: "Price: high to low",
      sortRating: "Top rated",
      filterFrameShape: "Frame shape",
      filterFaceShape: "Face shape",
      filterGender: "Gender",
      filterPrice: "Price",
      filterCategory: "Category",
    },
    product: {
      backToShop: "Back to shop",
      addToCart: "Add to cart",
      selectLenses: "Select lenses",
      virtualTryOn: "Virtual Try-On",
      virtualTryOnSoon: "Coming soon",
      framePrice: "Frame",
      lensesPrice: "Lenses",
      totalPrice: "Total",
      inStock: "In stock",
      outOfStock: "Out of stock",
      shipping: "Free shipping over 1500 MAD",
      materials: "Material",
      faceShapeFit: "Fits face shapes",
      highlights: "Highlights",
      description: "Description",
      relatedTitle: "You may also like",
    },
    lensFlow: {
      title: "Select your lenses",
      subtitle: "Customize your lenses based on your prescription and needs.",
      step1Title: "1. Lens type",
      step1Description: "Choose the lens type that matches your vision.",
      step2Title: "2. Prescription",
      step2Description: "Upload your prescription (PDF, JPG, or PNG).",
      step2Upload: "Choose file",
      step2NoFile: "No file selected",
      step2HelpUploadLater:
        "You can also send us your prescription later via WhatsApp.",
      step3Title: "3. Upgrades",
      step3Description: "Add coatings and treatments to your lenses.",
      summaryTitle: "Summary",
      confirm: "Confirm selection",
      back: "Back",
      next: "Next",
      finish: "Finish",
      requiredPrescription: "A prescription is required for this lens type.",
    },
    cart: {
      title: "Your cart",
      empty: "Your cart is empty",
      emptyHint: "Discover our collection of premium frames.",
      continueShopping: "Continue shopping",
      checkout: "Checkout",
      subtotal: "Subtotal",
      shippingNote: "Shipping calculated at the next step.",
      remove: "Remove",
      quantity: "Quantity",
      lensConfig: "Lens configuration",
      framesOnly: "Frame only",
    },
    footer: {
      tagline:
        "Premium optician in Laattaouia. Care and style under one roof.",
      shopHeading: "Shop",
      helpHeading: "Help",
      legalHeading: "Legal",
      visitHeading: "Visit us",
      newsletter:
        "Get new arrivals, vision tips, and exclusive offers in your inbox.",
      newsletterPlaceholder: "Your email address",
      newsletterCta: "Subscribe",
      secureCheckout: "Secure checkout",
      freeShipping: "Free shipping from 1500 MAD",
      returnPolicy: "14-day returns",
      customerCare: "Customer care 7/7",
      rights: "All rights reserved.",
      address: "Near BIM, Route Lycée Rahali El Farouk, Laattaouia",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      shop: "المتجر",
      men: "رجالي",
      women: "نسائي",
      kids: "أطفال",
      sunglasses: "نظارات شمسية",
      accessories: "إكسسوارات",
      appointment: "حجز موعد",
      searchPlaceholder: "ابحث عن الإطارات...",
      cart: "السلة",
      account: "الحساب",
      menu: "القائمة",
    },
    megaMenu: {
      shopAll: "عرض الكل",
      byShape: "حسب الشكل",
      byMaterial: "حسب المادة",
      featured: "مميزة",
      newArrivals: "وصل حديثاً",
      bestsellers: "الأكثر مبيعاً",
      seeCollection: "اطلع على التشكيلة",
    },
    shop: {
      pageTitle: "التشكيلة",
      pageSubtitle: "إطارات راقية مختارة بعناية لكل وجه وكل ذوق.",
      breadcrumbHome: "الرئيسية",
      breadcrumbShop: "المتجر",
      filtersTitle: "الفلاتر",
      clearFilters: "مسح الكل",
      applyFilters: "تطبيق",
      showingResults: "نتيجة",
      noResults: "لا توجد نتائج. حاول تعديل الفلاتر.",
      sortBy: "ترتيب حسب",
      sortNewest: "الأحدث",
      sortPriceAsc: "السعر: من الأقل إلى الأعلى",
      sortPriceDesc: "السعر: من الأعلى إلى الأقل",
      sortRating: "الأعلى تقييماً",
      filterFrameShape: "شكل الإطار",
      filterFaceShape: "شكل الوجه",
      filterGender: "الجنس",
      filterPrice: "السعر",
      filterCategory: "التصنيف",
    },
    product: {
      backToShop: "العودة للمتجر",
      addToCart: "أضف إلى السلة",
      selectLenses: "اختر العدسات",
      virtualTryOn: "التجربة الافتراضية",
      virtualTryOnSoon: "قريباً",
      framePrice: "الإطار",
      lensesPrice: "العدسات",
      totalPrice: "المجموع",
      inStock: "متوفر",
      outOfStock: "غير متوفر",
      shipping: "شحن مجاني للطلبات فوق 1500 درهم",
      materials: "المادة",
      faceShapeFit: "يناسب أشكال الوجه",
      highlights: "المميزات",
      description: "الوصف",
      relatedTitle: "قد يعجبك أيضاً",
    },
    lensFlow: {
      title: "اختر العدسات",
      subtitle: "خصص عدساتك حسب وصفتك واحتياجاتك.",
      step1Title: "1. نوع العدسات",
      step1Description: "اختر النوع المناسب لرؤيتك.",
      step2Title: "2. الوصفة الطبية",
      step2Description: "حمّل وصفتك الطبية (PDF أو JPG أو PNG).",
      step2Upload: "اختيار ملف",
      step2NoFile: "لم يتم اختيار ملف",
      step2HelpUploadLater:
        "يمكنك أيضاً إرسال الوصفة لاحقاً عبر واتساب.",
      step3Title: "3. التحسينات",
      step3Description: "أضف معالجات وطلاءات لعدساتك.",
      summaryTitle: "ملخص",
      confirm: "تأكيد الاختيار",
      back: "السابق",
      next: "التالي",
      finish: "إنهاء",
      requiredPrescription: "الوصفة الطبية مطلوبة لهذا النوع من العدسات.",
    },
    cart: {
      title: "السلة",
      empty: "السلة فارغة",
      emptyHint: "اكتشف تشكيلتنا من الإطارات الفاخرة.",
      continueShopping: "متابعة التسوق",
      checkout: "إتمام الطلب",
      subtotal: "المجموع الفرعي",
      shippingNote: "يتم احتساب الشحن في الخطوة التالية.",
      remove: "إزالة",
      quantity: "الكمية",
      lensConfig: "إعدادات العدسات",
      framesOnly: "الإطار فقط",
    },
    footer: {
      tagline: "بصري راقٍ في العطاوية. عناية وأناقة تحت سقف واحد.",
      shopHeading: "المتجر",
      helpHeading: "المساعدة",
      legalHeading: "قانوني",
      visitHeading: "زورونا",
      newsletter: "استقبل آخر الوصول، النصائح البصرية، والعروض الخاصة.",
      newsletterPlaceholder: "بريدك الإلكتروني",
      newsletterCta: "اشترك",
      secureCheckout: "دفع آمن",
      freeShipping: "شحن مجاني من 1500 درهم",
      returnPolicy: "إرجاع خلال 14 يوم",
      customerCare: "خدمة الزبناء 7/7",
      rights: "جميع الحقوق محفوظة.",
      address: "بالقرب من BIM، طريق ثانوية الرحالي الفاروق، العطاوية",
    },
  },
};
