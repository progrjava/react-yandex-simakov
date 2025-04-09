
/**
 * Типы событий
 */
export enum Events {
    CATALOG_LOADED = 'catalog:loaded', // Каталог товаров загружен

    PRODUCT_ADDED = 'product:added', // Товар добавлен в корзину
    PRODUCT_REMOVED = 'product:removed', // Товар удалён из корзины
    PRODUCT_PREVIEW = 'product:preview', // Просмотр карточки товара
    PRODUCT_DATA_LOADED = 'product:data-loaded', // Данные товара загружены

    BASKET_OPEN = 'basket:open', // Открытие модалки корзины
    BASKET_UPDATE = 'basket:update', // Изменение состава корзины
    BASKET_CLEAR = 'basket:clear', // Корзина очищена

    ORDER_PAYMENT_CHANGE = 'order:payment-change', // Изменение способа оплаты
    ORDER_ADDRESS_CHANGE = 'order:address-change', // Изменение адреса доставки
    CONTACTS_EMAIL_CHANGE = 'contacts:email-change', // Изменение email
    CONTACTS_PHONE_CHANGE = 'contacts:phone-change', // Изменение телефона

    ORDER_DELIVERY_FORM_VALID = 'order:order-form-valid', // Форма доставки валидна
    ORDER_DELIVERY_FORM_OPEN = 'order:order-form-open', // Форма доставки открыта
    ORDER_CONTACTS_FORM_VALID = 'order:contacts-form-valid', // Форма контактов валидна
    ORDER_CONTACTS_FORM_OPEN = 'order:contacts-form-open', // Форма контактов открыта
    ORDER_DELIVERY_FORM_SUBMIT = 'order:order-form-submit', // Отправка данных доставки
    ORDER_CONTACTS_FORM_SUBMIT = 'order:contacts-form-submit', // Отправка данных контактов
    
    MODAL_OPEN = 'modal:open', // Открытие любого модального окна
    MODAL_CLOSE = 'modal:close', // Закрытие любого модального окна

    ORDER_SUCCESS = 'order:success', // Заказ оформлен
    ORDER_RESET  = 'order:reset', // Сброс состояния заказа

    FORM_ERROR = 'form:error', // Ошибка валидации формы
    API_ERROR = 'api:error' // Ошибка взаимодействия с API
};
