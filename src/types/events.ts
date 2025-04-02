
/**
 * Типы событий
 */
export enum Events {
    CATALOG_LOADED = 'catalog:loaded', // Каталог товаров загружен

    PRODUCT_ADDED = 'product:added', // Товар добавлен в корзину
    PRODUCT_REMOVED = 'product:removed', // Товар удалён из корзины
    PRODUCT_PREVIEW = 'product:preview', // Просмотр карточки товара

    BASKET_OPEN = 'basket:open', // Открытие модалки корзины
    BASKET_UPDATE = 'basket:update', // Изменение состава корзины
    BASKET_CLEAR = 'basket:clear', // Корзина очищена
    BASKET_ORDER = 'basket:order', // Нажатие кнопки "Оформить" в корзине

    ORDER_PAYMENT_CHANGE = 'order:payment-change', // Изменение способа оплаты
    ORDER_ADDRESS_CHANGE = 'order:address-change', // Изменение адреса доставки
    ORDER_EMAIL_CHANGE = 'order:email-change', // Изменение email
    ORDER_PHONE_CHANGE = 'order:phone-change', // Изменение телефона
    ORDER_VALIDATE = 'order:validate', // Проверка валидности формы

    ORDER_DELIVERY_FORM_VALID = 'order:delivery-form-valid', // Форма доставки валидна
    ORDER_CONTACTS_FORM_VALID = 'order:contacts-form-valid', // Форма контактов валидна
    ORDER_DELIVERY_FORM_SUBMIT = 'order:delivery-form-submit', // Отправка данных доставки
    ORDER_CONTACTS_FORM_SUBMIT = 'order:contacts-form-submit', // Отправка данных контактов
    
    MODAL_OPEN = 'modal:open', // Открытие любого модального окна
    MODAL_CLOSE = 'modal:close', // Закрытие любого модального окна

    ORDER_SUCCESS = 'order:success', // Заказ оформлен
    ORDER_RESET  = 'order:reset', // Сброс состояния заказа

    FORM_ERROR = 'form:error', // Ошибка валидации формы
    API_ERROR = 'api:error' // Ошибка взаимодействия с API
};
