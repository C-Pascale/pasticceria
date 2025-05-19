import type { Dolce } from "../types";

const API_URL = "http://localhost:3001";

export async function getDolci(): Promise<Dolce[]> {
  const res = await fetch(`${API_URL}/dolci`);
  return res.json();
}

export async function createDolce(dolce: Dolce) {
  return fetch(`${API_URL}/dolci`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dolce),
  });
}

export async function updateDolce(id: string, dolce: Dolce) {
  return fetch(`${API_URL}/dolci/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dolce),
  });
}

export async function deleteDolce(id: string) {
  return fetch(`${API_URL}/dolci/${id}`, { method: "DELETE" });
}

export function getPrezzoAttuale(dolce: Dolce): number | null {
  const oggi = new Date();
  const dataVendita = new Date(dolce.data);
  const giorniPassati = Math.floor((oggi.getTime() - dataVendita.getTime()) / (1000 * 60 * 60 * 24));

  if (giorniPassati === 0) return dolce.prezzo;
  if (giorniPassati === 1) return +(dolce.prezzo * 0.8).toFixed(2);
  if (giorniPassati === 2) return +(dolce.prezzo * 0.2).toFixed(2);
  return null; // non commestibile
}

export async function login(user: string, pass: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/utenti?user=${user}&pass=${pass}`);
  const users = await res.json();
  return users.length > 0;
}

export async function register(user: string, pass: string): Promise<boolean> {
  // Controlla se esiste un utente con lo stesso username
  const check = await fetch(`${API_URL}/utenti?user=${user}`);
  const users = await check.json();

  // Se esiste almeno un utente con lo stesso nome, registrazione fallisce
  if (users.length > 0) return false;

  // Altrimenti registra normalmente
  const res = await fetch(`${API_URL}/utenti`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass }),
  });

  return res.ok;
}
