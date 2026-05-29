export type LabTest = {
  id: string;
  name: string;
  parameters: number;
  price: number;
  originalPrice: number;
  popular?: boolean;
  category: "blood" | "diabetes" | "thyroid" | "vitamin" | "liver" | "kidney";
  fastingHours?: number;
  reportIn: string;
  sampleType: "Blood" | "Urine" | "Swab";
};

export type HealthPackage = {
  id: string;
  name: string;
  testCount: number;
  price: number;
  originalPrice: number;
  popular?: boolean;
  description: string;
  highlights: string[];
  tone: "teal" | "violet" | "amber" | "rose";
};

export type City = {
  slug: string;
  name: string;
  state: string;
  labs: number;
  homeCollection: boolean;
};

export const LAB_TESTS: LabTest[] = [
  {
    id: "esr-1hr",
    name: "ESR 1 Hour",
    parameters: 1,
    price: 100,
    originalPrice: 200,
    popular: true,
    category: "blood",
    reportIn: "Same day",
    sampleType: "Blood",
  },
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    parameters: 26,
    price: 299,
    originalPrice: 499,
    popular: true,
    category: "blood",
    reportIn: "Same day",
    sampleType: "Blood",
  },
  {
    id: "hba1c",
    name: "HbA1c (Glycated Haemoglobin)",
    parameters: 2,
    price: 349,
    originalPrice: 600,
    popular: true,
    category: "diabetes",
    reportIn: "24 hrs",
    sampleType: "Blood",
  },
  {
    id: "thyroid-tsh",
    name: "Thyroid Profile (T3 T4 TSH)",
    parameters: 3,
    price: 399,
    originalPrice: 750,
    category: "thyroid",
    reportIn: "24 hrs",
    sampleType: "Blood",
  },
  {
    id: "vitamin-d",
    name: "Vitamin D (25-OH)",
    parameters: 1,
    price: 699,
    originalPrice: 1400,
    popular: true,
    category: "vitamin",
    reportIn: "48 hrs",
    sampleType: "Blood",
  },
  {
    id: "lft",
    name: "Liver Function Test (LFT)",
    parameters: 11,
    price: 449,
    originalPrice: 900,
    category: "liver",
    fastingHours: 8,
    reportIn: "Same day",
    sampleType: "Blood",
  },
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: "basic-combo",
    name: "DocLinks Basic Health Combo",
    testCount: 9,
    price: 399.2,
    originalPrice: 499,
    popular: true,
    description: "Essential daily health markers in one quick check-up.",
    highlights: ["CBC", "Lipid", "Sugar"],
    tone: "teal",
  },
  {
    id: "full-body",
    name: "Full Body Wellness Plus",
    testCount: 78,
    price: 1599,
    originalPrice: 2999,
    popular: true,
    description: "Comprehensive screening across 9 organ systems.",
    highlights: ["Thyroid", "Liver", "Kidney", "Vitamins"],
    tone: "violet",
  },
  {
    id: "women-care",
    name: "Women Care Advanced",
    testCount: 42,
    price: 1299,
    originalPrice: 2400,
    description: "Hormone, thyroid and iron profile for women.",
    highlights: ["Hormones", "Iron", "Vitamin B12"],
    tone: "rose",
  },
  {
    id: "diabetes-care",
    name: "Diabetes Care Package",
    testCount: 22,
    price: 899,
    originalPrice: 1800,
    description: "Track diabetes risk with HbA1c and renal panel.",
    highlights: ["HbA1c", "Fasting Sugar", "KFT"],
    tone: "amber",
  },
];

export const CITIES: City[] = [
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", labs: 142, homeCollection: true },
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka", labs: 218, homeCollection: true },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", labs: 264, homeCollection: true },
  { slug: "delhi", name: "Delhi", state: "Delhi NCR", labs: 290, homeCollection: true },
  { slug: "pune", name: "Pune", state: "Maharashtra", labs: 156, homeCollection: true },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", labs: 178, homeCollection: true },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", labs: 164, homeCollection: true },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", labs: 132, homeCollection: true },
];

export function getCityBySlug(slug: string) {
  return CITIES.find((c) => c.slug === slug);
}

export function getTestById(id: string) {
  return LAB_TESTS.find((t) => t.id === id);
}

export function getPackageById(id: string) {
  return HEALTH_PACKAGES.find((p) => p.id === id);
}

export function discountPct(price: number, original: number) {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}
