import { Category } from "../types/product";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const CATEGORIES: Record<Category, string> = {
    'софт-скил': 'soft',
    'хард-скил': 'hard',
    'другое': 'other',
    'дополнительное': 'additional',
    'кнопка': 'button'
}