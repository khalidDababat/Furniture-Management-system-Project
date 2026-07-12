import { HeroSlide } from "@/types";
import { ManufacturingStep } from "@/types";
import { Testimonial } from "@/types";
import { Category } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL;

async function fetchData<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API}/${endpoint}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}

export async function getCategories() {
  return fetchData<Category[]>("categories");
}

export async function getHeroSlides() {
  return fetchData<HeroSlide[]>("heroSlides");
}

export async function getStatistics() {
  return fetchData("statistics");
}

export async function getTestimonials() {
  return fetchData<Testimonial[]>("testimonials");
}

export async function getManufacturingSteps() {
  return fetchData<ManufacturingStep[]>("manufacturingSteps");
}
