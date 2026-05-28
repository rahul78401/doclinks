import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";
import doc4 from "@/assets/doctor-4.jpg";

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
  online: boolean;
  followers: string;
  rating: number;
  reviews: number;
  recommendation: number;
  badges: string[];
  fee: number;
  availableToday: boolean;
  nextSlot: string;
  languages: string[];
  gender: "Male" | "Female";
  treatments: string[];
};

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
    online: true,
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
    online: false,
    followers: "41.2k",
    rating: 4.8,
    reviews: 2104,
    recommendation: 96,
    badges: ["Trusted Specialist", "Most Contacted"],
    fee: 1200,
    availableToday: true,
    nextSlot: "Today, 7:00 PM",
    languages: ["English", "Hindi", "Marathi"],
    gender: "Male",
    treatments: ["Angioplasty", "ECG", "Pacemaker", "Heart Checkup"],
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
    online: true,
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
    online: false,
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
  },
];

export const getDoctor = (id: string) => doctors.find((d) => d.id === id);
