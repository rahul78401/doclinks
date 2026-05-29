import heart from "@/assets/article-heart.jpg";
import nutrition from "@/assets/article-nutrition.jpg";
import mind from "@/assets/article-mind.jpg";
import child from "@/assets/article-child.jpg";
import mag1 from "@/assets/mag-1.jpg";
import mag2 from "@/assets/mag-2.jpg";
import mag3 from "@/assets/mag-3.jpg";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  readMins: number;
  date: string;
  author: { name: string; role: string };
  trending?: boolean;
  featured?: boolean;
  body: string[];
};

export const articles: Article[] = [
  {
    id: "heart-health-checkups",
    title: "The 6 heart-health checkups every adult should know about",
    excerpt:
      "Cardiologists explain the screenings that catch silent disease early — and when to start asking for them.",
    category: "Heart Health",
    cover: heart,
    readMins: 7,
    date: "May 24, 2026",
    author: { name: "Dr. Anaya Rao", role: "Cardiologist · Apollo" },
    featured: true,
    trending: true,
    body: [
      "Heart disease remains the leading cause of death in India, yet the earliest signs are almost always invisible without the right tests. The good news: a small set of screenings, repeated at the right cadence, catches most issues long before symptoms show up.",
      "Start with a baseline lipid profile in your late twenties. Add a fasting glucose and HbA1c every two years from age thirty. After thirty-five, an annual blood pressure check, ECG and waist-to-hip ratio paint a clear cardiac picture.",
      "If your family history includes early heart attacks, ask your doctor about a coronary calcium score — a five-minute scan that quantifies plaque years before a stress test would.",
    ],
  },
  {
    id: "nutrition-plate-india",
    title: "Building the perfect Indian plate, backed by nutrition science",
    excerpt:
      "A practical framework that balances dal, sabzi, grains and protein without abandoning your favourite flavours.",
    category: "Nutrition",
    cover: nutrition,
    readMins: 5,
    date: "May 21, 2026",
    author: { name: "Dr. Meera Iyer", role: "Clinical Nutritionist" },
    trending: true,
    body: [
      "Forget restrictive diets. The healthiest Indian plates follow a simple rule: half vegetables, a quarter protein, a quarter complex carbs — with a small portion of healthy fat for satiety.",
      "Lentils, paneer, eggs and curd cover most protein needs. Pair them with millets, brown rice or whole-wheat roti, and finish with a tadka of mustard or sesame oil.",
    ],
  },
  {
    id: "mental-wellness-rituals",
    title: "Five-minute mental wellness rituals that actually work",
    excerpt: "Small, repeatable practices that lower stress hormones — no apps or expensive retreats required.",
    category: "Mental Wellness",
    cover: mind,
    readMins: 4,
    date: "May 18, 2026",
    author: { name: "Dr. Kabir Shah", role: "Psychiatrist · NIMHANS" },
    body: [
      "Mental fitness, like physical fitness, compounds. Two to five minutes of intentional breathing, journaling or a sensory grounding exercise — done daily — measurably lowers cortisol.",
    ],
  },
  {
    id: "child-immunity-monsoon",
    title: "A paediatrician's monsoon guide to childhood immunity",
    excerpt: "Common monsoon infections, vaccines that matter, and home-care signals every parent should recognise.",
    category: "Child Care",
    cover: child,
    readMins: 6,
    date: "May 12, 2026",
    author: { name: "Dr. Priya Menon", role: "Paediatrician · Manipal" },
    body: [
      "Monsoon brings a spike in viral fevers, gastrointestinal infections and skin issues for children under ten. Hand hygiene, boiled water and timely vaccination cover most preventable cases.",
    ],
  },
];

export type Magazine = {
  id: string;
  title: string;
  topic: string;
  issue: string;
  date: string;
  pages: number;
  cover: string;
  badge?: "Featured" | "New" | "Trending";
  tint: string;
};

export const magazines: Magazine[] = [
  {
    id: "health-mag-may",
    title: "The Longevity Issue",
    topic: "Health",
    issue: "Issue 04",
    date: "May 2026",
    pages: 84,
    cover: mag1,
    badge: "Featured",
    tint: "from-[#dff4f0] to-[#f0faf9]",
  },
  {
    id: "wellness-spring",
    title: "Quiet Mornings",
    topic: "Wellness",
    issue: "Issue 12",
    date: "Apr 2026",
    pages: 72,
    cover: mag2,
    badge: "Trending",
    tint: "from-[#fff1e6] to-[#fff7f0]",
  },
  {
    id: "nutrition-q2",
    title: "Eat For Energy",
    topic: "Nutrition",
    issue: "Issue 08",
    date: "Mar 2026",
    pages: 96,
    cover: mag3,
    tint: "from-[#eaf5e6] to-[#f4faf0]",
  },
];

export const categories = [
  { label: "Heart Health", icon: "❤️", tint: "bg-[#fde7e9] text-[#a83247]" },
  { label: "Diabetes Care", icon: "🩸", tint: "bg-[#ffeede] text-[#a85a1f]" },
  { label: "Mental Wellness", icon: "🧠", tint: "bg-[#e8e7ff] text-[#4a3fad]" },
  { label: "Women's Health", icon: "🌸", tint: "bg-[#ffe7f2] text-[#a83274]" },
  { label: "Child Care", icon: "👶", tint: "bg-[#fff4d6] text-[#8a6a1a]" },
  { label: "Nutrition", icon: "🥗", tint: "bg-[#e6f6e0] text-[#3d7a2d]" },
  { label: "Skin Care", icon: "✨", tint: "bg-[#f5e7ff] text-[#6a3aa8]" },
  { label: "Preventive", icon: "🛡️", tint: "bg-[#dff4f0] text-[#1e6b60]" },
  { label: "Fitness", icon: "🏃", tint: "bg-[#e2eeff] text-[#2a4f9c]" },
];
