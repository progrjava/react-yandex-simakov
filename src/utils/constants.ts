import { Category } from "../types/product";
import { ensureElement } from "./utils";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const CATEGORIES: Record<Category, string> = {
    'софт-скил': 'soft',
    'хард-скил': 'hard',
    'другое': 'other',
    'дополнительное': 'additional',
    'кнопка': 'button'
}

export const TEMPLATES = {
    headerElement: ensureElement<HTMLElement>('.header'),
    modalElement: ensureElement<HTMLElement>('#modal-container'),
    productInBasketTemplate: ensureElement<HTMLTemplateElement>('#card-basket'),
    basketTemplate: ensureElement<HTMLTemplateElement>('#basket'),
    productCatalogTemplate: ensureElement<HTMLTemplateElement>('#card-catalog'),
    productPreviewTemplate: ensureElement<HTMLTemplateElement>('#card-preview'),
    deliveryFormTemplate: ensureElement<HTMLTemplateElement>('#order'),
    contactsFormTemplate: ensureElement<HTMLTemplateElement>('#contacts'),
    successTemplate: ensureElement<HTMLTemplateElement>('#success'),
}
