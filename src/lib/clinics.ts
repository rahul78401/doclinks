import clinic1 from "@/assets/clinic-1.jpg";
import h1 from "@/assets/hospital-1.jpg";
import h2 from "@/assets/hospital-2.jpg";
import h3 from "@/assets/hospital-3.jpg";
import h4 from "@/assets/hospital-4.jpg";
import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";
import doc4 from "@/assets/doctor-4.jpg";

export type ClinicDoctor = {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  image: string;
  verified?: boolean;
};

export type ClinicHours = { day: string; hours: string; closed?: boolean }[];

export type Clinic = {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  specialties: string[];
  services: string[];
  address: string;
  area: string;
  city: string;
  distanceKm: number;
  followers: number;
  established?: number;
  verified: boolean;
  openNow: boolean;
  homeCollection: boolean;
  emergency: boolean;
  consultationAvailable: boolean;
  about: string;
  hours: ClinicHours;
  doctors: ClinicDoctor[];
  socials?: { instagram?: string; facebook?: string; linkedin?: string; website?: string };
};

export const clinics: Clinic[] = [
  {
    id: "laxmi-pathology-lab",
    name: "Laxmi Pathology Lab",
    image: clinic1,
    gallery: [clinic1, h2, h3, h4, h1],
    specialties: ["General Physician", "Cardiologist", "Dermatologist"],
    services: [
      "Complete Blood Count",
      "Lipid Profile",
      "Thyroid Panel",
      "Diabetes Screening",
      "Liver Function",
      "Vitamin D Test",
    ],
    address: "12, Shanti Plaza, Navrangpura, Ahmedabad",
    area: "Navrangpura",
    city: "Ahmedabad",
    distanceKm: 1.2,
    followers: 0,
    established: 2012,
    verified: true,
    openNow: true,
    homeCollection: true,
    emergency: false,
    consultationAvailable: true,
    about:
      "Laxmi Pathology Lab is a neighbourhood diagnostic centre trusted by families across Navrangpura. NABL-certified with home sample collection and same-day reports for routine blood work.",
    hours: [
      { day: "Mon", hours: "7:00 AM – 9:00 PM" },
      { day: "Tue", hours: "7:00 AM – 9:00 PM" },
      { day: "Wed", hours: "7:00 AM – 9:00 PM" },
      { day: "Thu", hours: "7:00 AM – 9:00 PM" },
      { day: "Fri", hours: "7:00 AM – 9:00 PM" },
      { day: "Sat", hours: "8:00 AM – 6:00 PM" },
      { day: "Sun", hours: "Closed", closed: true },
    ],
    doctors: [
      { id: "ananya-rao", name: "Dr. Ananya Rao", specialty: "Dermatologist", experience: 12, image: doc1, verified: true },
      { id: "rohan-mehta", name: "Dr. Rohan Mehta", specialty: "Cardiologist", experience: 18, image: doc2, verified: true },
    ],
    socials: { instagram: "#", facebook: "#", website: "#" },
  },
  {
    id: "sanjeevani-care-clinic",
    name: "Sanjeevani Care Clinic",
    image: h2,
    gallery: [h2, clinic1, h3, h4],
    specialties: ["General Physician", "Pediatrician", "ENT"],
    services: ["OPD Consultation", "Vaccinations", "Minor Procedures", "Health Checkup"],
    address: "Plot 8, Satellite Road, Ahmedabad",
    area: "Satellite",
    city: "Ahmedabad",
    distanceKm: 2.4,
    followers: 184,
    established: 2008,
    verified: true,
    openNow: true,
    homeCollection: false,
    emergency: false,
    consultationAvailable: true,
    about:
      "Sanjeevani Care Clinic is a warm community clinic offering family medicine, paediatrics and ENT consultations with experienced doctors and a calm waiting environment.",
    hours: [
      { day: "Mon", hours: "9:00 AM – 8:00 PM" },
      { day: "Tue", hours: "9:00 AM – 8:00 PM" },
      { day: "Wed", hours: "9:00 AM – 8:00 PM" },
      { day: "Thu", hours: "9:00 AM – 8:00 PM" },
      { day: "Fri", hours: "9:00 AM – 8:00 PM" },
      { day: "Sat", hours: "10:00 AM – 5:00 PM" },
      { day: "Sun", hours: "Closed", closed: true },
    ],
    doctors: [
      { id: "priya-nair", name: "Dr. Priya Nair", specialty: "Pediatrician", experience: 14, image: doc3, verified: true },
      { id: "arjun-kapoor", name: "Dr. Arjun Kapoor", specialty: "ENT", experience: 22, image: doc4 },
    ],
    socials: { instagram: "#", facebook: "#" },
  },
  {
    id: "arogya-skin-dental",
    name: "Arogya Skin & Dental",
    image: h3,
    gallery: [h3, clinic1, h1, h4],
    specialties: ["Dermatologist", "Dentist", "Cosmetology"],
    services: ["Skin Consultation", "Acne Treatment", "Teeth Cleaning", "Root Canal", "Laser Treatment"],
    address: "C-204, Vastrapur Lake Road, Ahmedabad",
    area: "Vastrapur",
    city: "Ahmedabad",
    distanceKm: 3.1,
    followers: 412,
    established: 2016,
    verified: true,
    openNow: false,
    homeCollection: false,
    emergency: false,
    consultationAvailable: true,
    about:
      "Arogya Skin & Dental is a modern aesthetic clinic offering dermatology, dentistry and cosmetology under one roof — designed for personal, unhurried care.",
    hours: [
      { day: "Mon", hours: "10:00 AM – 8:00 PM" },
      { day: "Tue", hours: "10:00 AM – 8:00 PM" },
      { day: "Wed", hours: "10:00 AM – 8:00 PM" },
      { day: "Thu", hours: "10:00 AM – 8:00 PM" },
      { day: "Fri", hours: "10:00 AM – 8:00 PM" },
      { day: "Sat", hours: "11:00 AM – 6:00 PM" },
      { day: "Sun", hours: "Closed", closed: true },
    ],
    doctors: [
      { id: "ananya-rao", name: "Dr. Ananya Rao", specialty: "Dermatologist", experience: 12, image: doc1, verified: true },
    ],
    socials: { instagram: "#", website: "#" },
  },
];

export const getClinic = (id: string) => clinics.find((c) => c.id === id);
