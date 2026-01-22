import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Função padrão do shadcn/ui
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata hora: 18:30
 */
export function formatTime(date: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}
