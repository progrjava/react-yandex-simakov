import { ICatalogModel, IProduct } from "../../types/product";
import { CDN_URL } from "../../utils/constants";
import { Api, ApiListResponse } from "../base/api";
import { IEvents } from "../base/events";
import { Events } from "../../types/events";
import { Model } from "./base/Model";


/**
 * Модель списка товаров
 *
 * @class CatalogModel
 * @implements ICatalogModel
 */
export class CatalogModel extends Model<IProduct[]> implements ICatalogModel {
    /**
     * API-интерфейс, используемый для загрузки списка товаров
     * @private
     */
    private _api: Api;

    /**
     * Конструктор модели
     * @param {Api} api - API-интерфейс
     * @param {IEvents} events - объект событий
     */
    constructor(api: Api, events: IEvents) {
        super([], events);
        this._api = api;
    }

    /**
     * Загружает список товаров
     * @returns {Promise<void>}
     */
    async loadProducts(): Promise<void> {
        try {
            const response = await this._api.get('/product') as ApiListResponse<IProduct>;
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
