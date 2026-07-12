export interface HeroSlide {
  id: number;
  image: string;
  headline: string;
  cta: string;
}

export interface ManufacturingStep {
  id: number;
  title: string;
  desc: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Statistic {
  id: number;
  value: string;
  label: string;
}
