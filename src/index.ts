import './scss/styles.scss';

import { BasketModel } from './components/models/BasketModel';
import { CatalogModel } from './components/models/CatalogModel';
import { OrderModel } from './components/models/OrderModel';

import { PageView } from './components/views/PageView';
import { HeaderView } from './components/views/HeaderView';
import { BasketView } from './components/views/BasketView';
import { DeliveryFormView } from './components/views/DeliveryFormView';
import { ContactsFormView } from './components/views/ContactsFormView';
import { ModalView } from './components/views/ModalView';

import { EventEmitter } from './components/base/events';
import { cloneTemplate } from './utils/utils';

import { Api } from './components/base/api';
import { API_URL, TEMPLATES } from './utils/constants';

import { ModalPresenter } from './presenters/ModalPresenter';
import { OrderPresenter } from './presenters/OrderPresenter';
import { PostOrderPresenter } from './presenters/PostOrderPresenter';
import { BasketPresenter } from './presenters/BasketPresenter';
import { CatalogPresenter } from './presenters/CatalogPresenter';


class App {
    private _events: EventEmitter;
    private _api: Api;

    private _models: {
        basket: BasketModel,
        catalog: CatalogModel,
        order: OrderModel
    };

    private _views: {
        header: HeaderView,
        page: PageView,
        modal: ModalView,
        basket: BasketView,
        deliveryForm: DeliveryFormView,
        contactsForm: ContactsFormView
    };

    private _presenters: {
        modal: ModalPresenter,
        order: OrderPresenter,
        postOrder: PostOrderPresenter,
        basket: BasketPresenter,
        catalog: CatalogPresenter
    };

    constructor() {
        this.initCore();
        this.initModels();
        this.initViews();
        this.initPresenters();
    }

    private initCore() {
        this._events = new EventEmitter();
        this._api = new Api(API_URL);
    }

    private initModels() {
        this._models = {
            basket: new BasketModel(this._events),
            catalog: new CatalogModel(this._events),
            order: new OrderModel(this._events)
        };
    }

    private initViews() {
        this._views = {
            header: new HeaderView(TEMPLATES.headerElement, this._events),
            page: new PageView(document.body, this._events),
            modal: new ModalView(TEMPLATES.modalElement, this._events),
            basket: new BasketView(cloneTemplate(TEMPLATES.basketTemplate), this._events),
            deliveryForm: new DeliveryFormView(cloneTemplate(TEMPLATES.deliveryFormTemplate), this._events),
            contactsForm: new ContactsFormView(cloneTemplate(TEMPLATES.contactsFormTemplate), this._events)
        };
    }

    private initPresenters() {
        this._presenters = {
            modal: new ModalPresenter(
                TEMPLATES.productPreviewTemplate,
                this._models.basket,
                this._models.order,
                this._views.basket,
                this._views.page,
                this._views.modal,
                this._views.contactsForm,
                this._views.deliveryForm,
                this._events
            ),
            order: new OrderPresenter(
                this._models.order,
                this._views.deliveryForm,
                this._views.contactsForm,
                this._events
            ),
            postOrder: new PostOrderPresenter(
                TEMPLATES.successTemplate,
                this._models.basket,
                this._models.order,
                this._views.modal,
                this._events,
                this._api
            ),
            basket: new BasketPresenter(
                TEMPLATES.productInBasketTemplate,
                this._models.basket,
                this._views.basket,
                this._views.header,
                this._events
            ),
            catalog: new CatalogPresenter(
                this._models.catalog,
                this._views.page,
                this._events,
                TEMPLATES.productCatalogTemplate
            )
        };
    }
};

new App();