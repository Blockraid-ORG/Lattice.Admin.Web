import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toObjectQuery = (params: URLSearchParams): Record<string, string> => {
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

export const toUrlAsset = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  } else {
    const baseUrl = process.env.baseUrl;
    return `${baseUrl}/${path}`
  }
}
