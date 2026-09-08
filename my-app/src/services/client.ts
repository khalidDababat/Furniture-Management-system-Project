import { get } from "./api";
import type { Client } from "@/types";

export const clientService = {
  getClients() {
    return get<Client[]>("/clients");
  },
};
