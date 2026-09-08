import { get, post, put, remove } from "./api";
import type { Company, HeroSlide } from "@/types";

export const companyService = {
  getCompany() {
    return get<Company>("/company");
  },
  getHeroSlides() {
    return get<HeroSlide[]>("/heroSlides");
  },
};
