import h1 from "@/assets/hospital-1.jpg";
import h2 from "@/assets/hospital-2.jpg";
import h3 from "@/assets/hospital-3.jpg";
import h4 from "@/assets/hospital-4.jpg";
import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";
import doc4 from "@/assets/doctor-4.jpg";

export type Hospital = {
  id: string;
  name: string;
  cover: string;
  gallery: string[];
  category: string;
  type: string;
  location: string;
  address: string;
  city: string;
  established: number;
  openNow: boolean;
  emergency: boolean;
  verified: boolean;
  accreditations: string[];
  badges: string[];
  services: string[];
  doctors: { id: string; name: string; specialty: string; experience: number; image: string }[];
  stats: { doctors: number; experience: number; followers: string; rating: number };
  about: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    website?: string;
  };
};

export const hospitals: Hospital[] = [
  {
    id: "shalby-multispeciality",
    name: "Shalby Multi-Speciality Hospital",
    cover: h1,
    gallery: [h2, h3, h4, h1],
    category: "Multi-Speciality",
    type: "Super Speciality Hospital",
    location: "SG Highway",
    address: "Opp. Karnavati Club, SG Highway, Ahmedabad 380015",
    city: "Ahmedabad",
    established: 1994,
    openNow: true,
    emergency: true,
    verified: true,
    accreditations: ["NABH", "NABL", "ISO 9001"],
    badges: ["Multi-Speciality", "Most Contacted", "Emergency Ready"],
    services: [
      "Cataract Surgery",
      "LASIK",
      "Retina Treatment",
      "Cornea Care",
      "Cardiology",
      "Orthopedic",
      "Oncology",
      "Neurology",
      "IVF",
      "Dialysis",
      "Bariatric Surgery",
      "Pediatrics",
      "Radiology",
    ],
    doctors: [
      { id: "ananya-rao", name: "Dr. Ananya Rao", specialty: "Dermatologist", experience: 12, image: doc1 },
      { id: "rohan-mehta", name: "Dr. Rohan Mehta", specialty: "Cardiologist", experience: 18, image: doc2 },
      { id: "priya-nair", name: "Dr. Priya Nair", specialty: "Gynecologist", experience: 14, image: doc3 },
      { id: "arjun-kapoor", name: "Dr. Arjun Kapoor", specialty: "Orthopedic", experience: 22, image: doc4 },
    ],
    stats: { doctors: 120, experience: 30, followers: "48.2k", rating: 4.8 },
    about:
      "Shalby Multi-Speciality Hospital is a leading tertiary-care facility offering advanced treatment across 40+ specialties. With three decades of clinical excellence, world-class infrastructure and a panel of internationally trained surgeons, Shalby is trusted by patients across India and abroad.",
    socials: {
      instagram: "https://instagram.com/shalbyhospital",
      facebook: "https://facebook.com/shalbyhospital",
      youtube: "https://youtube.com/@shalbyhospital",
      linkedin: "https://linkedin.com/company/shalby",
      website: "https://shalby.org",
    },
  },
  {
    id: "apollo-navrangpura",
    name: "Apollo Hospitals",
    cover: h2,
    gallery: [h1, h3, h4, h2],
    category: "Multi-Speciality",
    type: "Super Speciality Hospital",
    location: "Navrangpura",
    address: "Plot 1A, Bhat GIDC Estate, Navrangpura, Ahmedabad 380009",
    city: "Ahmedabad",
    established: 1988,
    openNow: true,
    emergency: true,
    verified: true,
    accreditations: ["NABH", "JCI"],
    badges: ["Multi-Speciality", "Emergency Ready"],
    services: [
      "Cardiology",
      "Cardiac Surgery",
      "Neurology",
      "Neurosurgery",
      "Oncology",
      "Organ Transplant",
      "Orthopedic",
      "Pediatrics",
      "Urology",
      "Nephrology",
    ],
    doctors: [
      { id: "rohan-mehta", name: "Dr. Rohan Mehta", specialty: "Cardiologist", experience: 18, image: doc2 },
      { id: "arjun-kapoor", name: "Dr. Arjun Kapoor", specialty: "Orthopedic", experience: 22, image: doc4 },
      { id: "priya-nair", name: "Dr. Priya Nair", specialty: "Gynecologist", experience: 14, image: doc3 },
    ],
    stats: { doctors: 180, experience: 36, followers: "62.4k", rating: 4.9 },
    about:
      "Apollo Hospitals Ahmedabad is part of Asia's largest integrated healthcare network. JCI-accredited and equipped with cutting-edge robotic surgery, advanced cath labs and a 24×7 trauma centre.",
    socials: {
      instagram: "https://instagram.com/apollohospitals",
      facebook: "https://facebook.com/apollohospitalsindia",
      website: "https://apollohospitals.com",
    },
  },
  {
    id: "sterling-satellite",
    name: "Sterling Hospital",
    cover: h3,
    gallery: [h4, h2, h1, h3],
    category: "Multi-Speciality",
    type: "Tertiary Care Hospital",
    location: "Satellite",
    address: "Sterling Hospital Road, Memnagar, Satellite, Ahmedabad 380054",
    city: "Ahmedabad",
    established: 2001,
    openNow: false,
    emergency: true,
    verified: true,
    accreditations: ["NABH"],
    badges: ["Multi-Speciality", "Emergency Ready"],
    services: [
      "Cardiology",
      "Orthopedic",
      "Neurology",
      "Gastroenterology",
      "Oncology",
      "ENT",
      "Pulmonology",
    ],
    doctors: [
      { id: "ananya-rao", name: "Dr. Ananya Rao", specialty: "Dermatologist", experience: 12, image: doc1 },
      { id: "arjun-kapoor", name: "Dr. Arjun Kapoor", specialty: "Orthopedic", experience: 22, image: doc4 },
    ],
    stats: { doctors: 90, experience: 23, followers: "21.7k", rating: 4.6 },
    about:
      "Sterling Hospital, Satellite is a NABH-accredited tertiary care centre offering specialised care in cardiology, oncology and minimally invasive surgery with a patient-first approach.",
    socials: {
      facebook: "https://facebook.com/sterlinghospitals",
      website: "https://sterlinghospitals.com",
    },
  },
];

export const getHospital = (id: string) => hospitals.find((h) => h.id === id);
