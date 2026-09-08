// Domain types for the Ziad Shakhshir Factory storefront.
// All user-facing content is bilingual: *_ar (Arabic) and *_en (English).

export type Lang = "ar" | "en";

export interface Category {
  id: number;

  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  image: string;
  slug?: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name_ar: string;
  name_en: string;
  desc_ar: string;
  desc_en: string;
  longdesc_ar?: string;
  longdesc_en?: string;
  price: number;
  currency: string;
  image: string;
  featured: boolean;
  badge_ar?: string;
  badge_en?: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  headline_ar: string;
  headline_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  cta_ar: string;
  cta_en: string;
}

export interface WhyItem {
  id: number;
  icon: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
}

export interface Project {
  id: number;
  title_ar: string;
  title_en: string;
  sector_ar: string;
  sector_en: string;
  desc_ar: string;
  desc_en: string;
  image: string;
}

export interface Client {
  id: number;
  image: string;
  name_ar: string;
  name_en: string;
}

export interface Branch {
  id: number;
  city_ar: string;
  city_en: string;
  address_ar: string;
  address_en: string;
  main: boolean;
}

export interface Stat {
  id: number;
  value: string;
  label_ar: string;
  label_en: string;
}

export interface Company {
  id: number;
  name_ar: string;
  name_en: string;
  tagline_ar: string;
  tagline_en: string;
  established: number;
  about_ar: string;
  about_en: string;
  phones: string[];
  email: string;
  whatsapp: string;
  socials: { facebook: string; instagram: string; linkedin: string };
  branches: Branch[];
  mapEmbed: string;
  stats: Stat[];
}

export interface Job {
  id: number;
  title_ar: string;
  title_en: string;
  type_ar: string;
  type_en: string;
  location_ar: string;
  location_en: string;
  department_ar: string;
  department_en: string;
  desc_ar: string;
  desc_en: string;
  postedAt: string;
}

export interface JobApplication {
  id?: number;
  jobId: number;
  jobTitle: string;
  fullName: string;
  mobile: string;
  coverLetter: string;
  resumeName: string;
  resumeType: string;
  resumeData: string; // base64 data URL of the uploaded r\u00e9sum\u00e9
  createdAt?: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  phone?: string;
  avatar?: string; // base64 data URL
}

export interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinedAt: string;
  active: boolean;
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  qty: number;
}

export type OrderStatus = "new" | "processing" | "completed" | "canceled";

export interface Order {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  notes?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface HomeData {
  company: Company;
  heroSlides: HeroSlide[];
  categories: Category[];
  products: Product[];
  whyChooseUs: WhyItem[];
  projects: Project[];
  clients: Client[];
  jobs: Job[];
}

// Helper: pick the field for the active language, e.g. tr(product, "name", lang)
export type Localizable = Record<string, unknown>;
