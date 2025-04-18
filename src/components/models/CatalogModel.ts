import { ICatalogModel, IProduct } from "../../types/product";
import { API_URL, CDN_URL } from "../../utils/constants";
import { Api, ApiListResponse } from "../base/api";
import { IEvents } from "../base/events";
import { Events } from "../../types/events";
import { Model } from "./base/Model";


export class CatalogModel extends Model<IProduct[]> implements ICatalogModel {
    constructor(events: IEvents) {
        super([], events);
    }

    async loadProducts(): Promise<void> {
        const api = new Api(API_URL);
        try {
            const response = await api.get('/product') as ApiListResponse<IProduct>;
            this.updateData(() => response.items.map((item) => ({
                ...item,
                image: `${CDN_URL}${item.image}`,
            })));
            this.emitEvent(Events.CATALOG_LOADED);
        } catch (error) {
            this.emitEvent(Events.API_ERROR, {error});
        }
    }
}