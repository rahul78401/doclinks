import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";
import doc4 from "@/assets/doctor-4.jpg";

export type DaySchedule = {
  day: string;
  short: string;
  open: string | null; // e.g. "10:00"
  close: string | null; // e.g. "18:30"
};

export type Doctor = {
  id: string;
  name: string;
  image: string;
  specialty: string;
  subSpecialty: string;
  experience: number;
  clinic: string;
  location: string;
  city: string;
  verified: boolean;
  followers: string;
  rating: number;
  reviews: number;
  recommendation: number;
  badges: string[];
  /** Some doctors don't publish fees — UI must fall back gracefully. */
  fee?: number;
  availableToday: boolean;
  nextSlot: string;
  languages: string[];
  gender: "Male" | "Female";
  treatments: string[];
  hours: DaySchedule[];
  socials?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    website?: string;
  };
};

const standardHours: DaySchedule[] = [
  { day: "Monday", short: "Mon", open: "10:00", close: "19:00" },
  { day: "Tuesday", short: "Tue", open: "10:00", close: "19:00" },
  { day: "Wednesday", short: "Wed", open: "10:00", close: "19:00" },
  { day: "Thursday", short: "Thu", open: "10:00", close: "19:00" },
  { day: "Friday", short: "Fri", open: "10:00", close: "19:00" },
  { day: "Saturday", short: "Sat", open: "11:00", close: "17:00" },
  { day: "Sunday", short: "Sun", open: null, close: null },
];

export const doctors: Doctor[] = [
  {
    id: "ananya-rao",
    name: "Dr. Ananya Rao",
    image: doc1,
    specialty: "Dermatologist",
    subSpecialty: "Hair & Skin Specialist",
    experience: 12,
    clinic: "Skinora Aesthetic Clinic",
    location: "Indiranagar",
    city: "Bengaluru",
    verified: true,
    followers: "24.6k",
    rating: 4.9,
    reviews: 1284,
    recommendation: 98,
    badges: ["Highly Recommended", "Top Rated"],
    fee: 800,
    availableToday: true,
    nextSlot: "Today, 5:30 PM",
    languages: ["English", "Hindi", "Kannada"],
    gender: "Female",
    treatments: ["Hair Transplant", "PRP Therapy", "Acne Treatment", "Laser"],
    hours: standardHours,
    socials: {
      instagram: "https://instagram.com/dr.ananyarao",
      youtube: "https://youtube.com/@dr.ananyarao",
      linkedin: "https://linkedin.com/in/ananyarao",
      website: "https://skinora.in",
    },
  },
  {
    id: "rohan-mehta",
    name: "Dr. Rohan Mehta",
    image: doc2,
    specialty: "Cardiologist",
    subSpecialty: "Interventional Cardiology",
    experience: 18,
    clinic: "Apollo Heart Centre",
    location: "Bandra West",
    city: "Mumbai",
    verified: true,
    followers: "41.2k",
    rating: 4.8,
    reviews: 2104,
    recommendation: 96,
    badges: ["Trusted Specialist", "Most Contacted"],
    // Fee intentionally omitted — UI should render "Fee available on call".
    availableToday: true,
    nextSlot: "Today, 7:00 PM",
    languages: ["English", "Hindi", "Marathi"],
    gender: "Male",
    treatments: ["Angioplasty", "ECG", "Pacemaker", "Heart Checkup"],
    hours: standardHours,
    socials: {
      linkedin: "https://linkedin.com/in/rohanmehta",
      website: "https://apolloheart.in",
      facebook: "https://facebook.com/dr.rohanmehta",
    },
  },
  {
    id: "priya-nair",
    name: "Dr. Priya Nair",
    image: doc3,
    specialty: "Gynecologist",
    subSpecialty: "Fertility & Obstetrics",
    experience: 14,
    clinic: "Cloudnine Hospital",
    location: "Jayanagar",
    city: "Bengaluru",
    verified: true,
    followers: "18.9k",
    rating: 4.9,
    reviews: 1567,
    recommendation: 97,
    badges: ["Highly Recommended"],
    fee: 950,
    availableToday: false,
    nextSlot: "Tomorrow, 10:00 AM",
    languages: ["English", "Hindi", "Malayalam"],
    gender: "Female",
    treatments: ["IVF", "Prenatal Care", "PCOS", "Laparoscopy"],
    hours: standardHours,
    socials: {
      instagram: "https://instagram.com/dr.priyanair",
      youtube: "https://youtube.com/@dr.priyanair",
      website: "https://cloudninecare.in",
    },
  },
  {
    id: "arjun-kapoor",
    name: "Dr. Arjun Kapoor",
    image: doc4,
    specialty: "Orthopedic",
    subSpecialty: "Joint Replacement Surgeon",
    experience: 22,
    clinic: "Fortis Bone & Joint Institute",
    location: "Vasant Kunj",
    city: "New Delhi",
    verified: true,
    followers: "33.4k",
    rating: 4.7,
    reviews: 1890,
    recommendation: 95,
    badges: ["Top Rated", "Trusted Specialist"],
    fee: 1500,
    availableToday: true,
    nextSlot: "Today, 6:15 PM",
    languages: ["English", "Hindi", "Punjabi"],
    gender: "Male",
    treatments: ["Knee Replacement", "Arthroscopy", "Sports Injury", "Spine Care"],
    hours: standardHours,
    socials: {
      linkedin: "https://linkedin.com/in/arjunkapoor",
      instagram: "https://instagram.com/dr.arjunkapoor",
      website: "https://fortishealthcare.com",
    },
  },
];

export const getDoctor = (id: string) => doctors.find((d) => d.id === id);

export const formatFee = (fee?: number) =>
  typeof fee === "number" ? `₹${fee}` : "Fee on call";

export const formatFeeLong = (fee?: number) =>
  typeof fee === "number" ? `₹${fee}` : "Call for fee details";
