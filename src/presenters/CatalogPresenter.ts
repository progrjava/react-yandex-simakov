import { EventEmitter } from "../components/base/events";
import { CatalogModel } from "../components/models/CatalogModel";
import { PageView } from "../components/views/PageView";
import { ProductView } from "../components/views/ProductView";
import { Events } from "../types/events";
import { IProduct } from "../types/product";
import { cloneTemplate } from "../utils/utils";

export class CatalogPresenter {
    /**
     * Презентер для отображения списка товаров
     *
     * @param {CatalogModel} _catalogModel - модель списка товаров
     * @param {PageView} _pageView - представление страницы
     * @param {EventEmitter} _events - объект для работы с событиями
     * @param {HTMLTemplateElement} _productCatalogTemplate - шаблон для отображения товара
     */
    constructor(
        private _catalogModel: CatalogModel,
        private _pageView: PageView,
        private _events: EventEmitter,
        private _productCatalogTemplate: HTMLTemplateElement
    ) {
        this._catalogModel.loadProducts();
        this.subscribe();
    }

    /**
     * Подписывается на события
     */
    private subscribe(): void {
        this._events.on<IProduct[]>(Events.CATALOG_LOADED, () => this.loadCatalog());         
    }

    /**
     * Загружает список товаров
     */
    private loadCatalog(): void {
        const elements = this._catalogModel.data.map((product) => {
            const productCard = new ProductView(
                'card',
                cloneTemplate(this._productCatalogTemplate),
                this._events,
                () => this._events.emit(Events.PRODUCT_PREVIEW, product)
            );
    
            return productCard.render({
                category: product.category,
                title: product.title,
                image: product.image,
                price: product.price,
            });
        });
        this._pageView.gallery = elements;
    }
}
