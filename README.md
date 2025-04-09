# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/models — папка с моделями данных
- src/components/views — папка с классами, отвечающими за отображение данных
- src/presenters — папка с классами, реализующими Presenter

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/ — папка с типами
- src/index.ts — точка входа приложения, реализация класса App
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами


## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Архитектура проекта
Приложение построено по MVP-архитектуре (событийно-ориентированная, с помощью брокера событий - EventEmitter).

### Model - классы, отвечающие за модель данных
- Model (базовый класс)
- CatalogModel
- BasketModel
- OrderModel

### View - классы, отвечающие за отображение данных
- View (базовый класс)
- HeaderView
- PageView
- ProductView
- SuccessView
- ModalView
- FormView
- DeliveryFormView
- ContactsFormView
- BasketView
- ProductInBasketView

### Presenter - классы, обеспечивающие связь между Model и View
- HeaderPresenter
- CatalogPresenter
- BasketPresenter
- OrderPresenter


## Базовые классы

### Api
Api - класс, обеспечивающий работу с API. 

Он позволяет:
- отправлять GET-запросы к серверу
- отправлять POST, DELETE-запросы к серверу
- обрабатывать ответы от сервера

### EventEmitter
EventEmitter - это класс, который позволяет обмениваться событиями между
разными частями приложения. Он обеспечивает разделение между компонентами,
которые отправляют события, и компонентами, которые их получают, 
разрешая компонентам не знать о существовании друг друга.

EventEmitter - это классическая реализация брокера событий. 
Он обеспечивает три основных метода: `on()` - для регистрации обработчика,
`emit()` - для отправки события, `off()` - для снятия обработчика.

### View
Класс View - это базовый класс для всех классов отображения. Он инициализирует контейнер, в котором будут отображаться данные, и обеспечивает доступ к объекту событий, который может использоваться для отправки событий.

Класс View имеет следующие методы:
- `toggleClass(className: string, condition: boolean)`: добавляет или удаляет CSS-класс
- `setText(value: unknown)`: устанавливает текстовое содержимое элемента
- `setImage(src: string, alt?: string)`: устанавливает изображение
- `setActivity(condition: boolean)`: блокирует или разблокирует элемент
- `render(data?: Partial<T>)`: возвращает HTML-контейнер, используя данные для заполнения

### Model
Абстрактный класс `Model` предназначен для управления данными и событиями в приложении. Класс обеспечивает базовую функциональность для работы с данными и событиями, предоставляя методы для инициации событий и обновления данных модели.
@template T - тип данных, который будет использоваться моделью.

Свойства:
- `_data` (protected): хранит текущие данные модели.
- `_events` (protected): объект для управления событиями.

Конструктор:
- принимает начальные данные и объект событий, которые сохраняются в соответствующих свойствах.
Методы:
- `emitEvent` (protected): инициирует событие с переданным именем и данными.
- `updateData` (protected): обновляет данные модели с использованием функции обновления.
- `data` (getter): возвращает текущие данные модели.


## Типы данных
### IBasketItem
```typescript
/**
 * Интерфейс для представления элемента корзины
 *
 * @property {string} id - уникальный идентификатор товара
 * @property {string} title - наименование товара
 * @property {number} price - цена товара
 * @property {boolean} inBasket - флаг, указывающий, есть ли товар в корзине
 */
interface IBasketItem extends Pick<IProduct, 'id' | 'title' | 'price'> {};
```

### IBasketModel
```typescript
/**
 * Интерфейс для модели корзины
 *
 * @method addItem - добавляет элемент в корзину
 * @param {IBasketItem} item - элемент корзины
 * @method removeItem - удаляет элемент из корзины
 * @param {string} id - уникальный идентификатор элемента корзины
 * @property {number} total - общая сумма корзины
 * @method clear - очищает корзину
 */
export interface IBasketModel {
    addItem(item: IBasketItem): void;
    removeItem(id: string): void;
    getLength(): number;
    clear(): void;
    get total(): number;
};
```

### Events
```typescript
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
```

### PaymentMethod
```typescript
/**
 * Тип способа оплаты
 */
type PaymentMethod = 'online' | 'offline';
```

### IOrderData
```typescript
/**
 * Интерфейс для представления данных заказа
 *
 * @property {PaymentMethod} payment - способ оплаты
 * @property {string} address - адрес доставки
 * @property {string} email - электронная почта
 * @property {string} phone - номер телефона
 */
interface IOrderData {
    payment: PaymentMethod;
    address: string;
    email: string;
    phone: string;
}
```

### FormErrors
```typescript
/**
 * Тип для ошибок валидации полей формы заказа
 *
 * @property {string} payment - ошибка валидации способа оплаты
 * @property {string} address - ошибка валидации адреса доставки
 * @property {string} email - ошибка валидации электронной почты
 * @property {string} phone - ошибка валидации номера телефона
 */
export type FormErrors = {
    [K in keyof IOrderData]: K extends 'payment' ? string : string;
};
```

### IOrderModel
```typescript
/**
 * Интерфейс для модели заказа
 *
 * @method validatePayment - проверяет валидность способа оплаты
 * @method validateAddress - проверяет валидность адреса доставки
 * @method validateEmail - проверяет валидность электронной почты
 * @method validatePhone - проверяет валидность номера телефона
 * @method validateDeliveryForm - проверяет валидность формы доставки
 * @method validateContactsForm - проверяет валидность формы контактов
 * @method reset - сбрасывает данные форм
 */
export interface IOrderModel {
    validatePayment(): void;
    validateAddress(): void;
    validateEmail(): void;
    validatePhone(): void;
    validateDeliveryForm(): boolean;
    validateContactsForm(): boolean;
    reset(): void;
};
```

### Category
```typescript
/**
 * Тип категории товара
 */
type Category = 
    | 'софт-скил'
    | 'хард-скил'
    | 'другое'
    | 'дополнительное'
    | 'кнопка';
```

### IProduct
```typescript
/**
 * Интерфейс для представления товара
 *
 * @property {string} id - уникальный идентификатор товара
 * @property {Category} category - категория товара
 * @property {string} title - наименование товара
 * @property {string} description - описание товара
 * @property {string} image - URL изображения товара
 * @property {number} price - цена товара
 * @property {boolean} inBasket - флаг добавления товара в корзину
 */
interface IProduct {
    id: string;
    category: Category;
    title: string;
    description: string;
    image: string;
    price: number;
}
```

### ICatalogModel
```typescript
/**
 * Интерфейс для модели списка товаров
 *
 * @method loadProducts - загрузить список товаров
 * @returns {Promise<void>} - промис, который разрешается после загрузки списка товаров
 * 
 * @method getProductById - загрузить данные товара по id
 * @param {string} id - id товара
 * @returns {Promise<void>} - промис, который разрешается после загрузки товара
 */
export interface ICatalogModel {
    loadProducts(): Promise<void>;
    getProductById(id: string): Promise<void>;
}
```


## Модели данных
Модели данных - классы, содержащие данные, которые нужно отобразить на странице.

### 1. CatalogModel
ProductModel - это класс, который работает с API каталога. Он обеспечивает загрузку товаров с API, а также хранит информацию о них.

### 2. BasketModel
BasketModel - это класс, который хранит информацию о товарах, добавленных в корзину. Он обеспечивает добавление и удаление товаров из корзины, а также хранит общую сумму заказа.

### 3. OrderModel
OrderModel - класс, который отвечает за хранение и управление данными заказа. Он предоставляет методы для обновления полей данных заказа и их валидации.


## Отображение данных
Классы, которые отвечают за отображение данных на странице.

### 1. HeaderView
HeaderView - это класс, отвечающий за отображение и управление элементами заголовка страницы, такими как корзина. Он наследуется от базового класса View и реализует интерфейс IHeaderView. В классе используются приватные свойства `_basketCounter` и `_basketButton`, которые представляют собой HTML-элементы, отображающие количество товаров в корзине и кнопку корзины соответственно. Конструктор класса принимает контейнер и объект событий, инициализирует элементы заголовка и добавляет обработчик события клика по кнопке корзины, который вызывает событие открытия корзины. Метод `set counter` используется для обновления текстового содержимого счетчика корзины.

### 2. PageView
Класс PageView - это класс, который отвечает за отображение католога товаров на странице. Он наследуется от базового класса View и реализует интерфейс IPageView. В классе используется приватное свойство `_gallery`, которое хранит HTML-элемент, в который будут отображены элементы страницы. Конструктор класса принимает контейнер и объект событий, инициализирует HTML-элемент галереи и добавляет обработчики событий. Метод `set gallery` используется для обновления содержимого галереи.

### 3. ProductView
Класс `ProductView` отвечает за отображение информации о продукте на веб-странице. Он наследуется от базового класса `View`, обеспечивая взаимодействие с HTML-элементами, представляющими данные продукта, такие как название, описание, цена, изображение, категория и кнопка действия. В конструкторе класса инициализируются HTML-элементы, которые будут использованы для отображения соответствующих данных.
Таким образом, `ProductView` обеспечивает инкапсуляцию логики отображения продуктов на странице, позволяя динамически обновлять интерфейс в ответ на изменения данных.

### 4. SuccessView
Класс SuccessView - это класс, который отвечает за отображение модального окна со ссылкой на успешную покупку. Он наследуется от базового класса View. В конструкторе класса инициализируются HTML-элементы модального окна, а также добавляется обработчик события на кнопку закрытия модального окна.

### 5. ModalView
Класс ModalView - это класс, который отвечает за отображение модального окна на странице. Он наследуется от базового класса View и реализует интерфейс IModalView. Класс обеспечивает отображение модального окна, а также добавляет обработчики событий.

### 6. FormView
Класс `FormView` - это абстрактный класс, который предназначен для отображения формы на странице. Он наследуется от базового класса `View` и реализует интерфейс `IFormView`. Класс обеспечивает отображение формы, а также добавляет обработчики событий для полей ввода и
обработки событий отправки формы. Метод `render` позволяет установить значения полей формы, а также отобразить ошибки валидации.

### 7. DeliveryFormView
Класс DeliveryFormView - это класс, который обеспечивает отображение формы доставки на странице. Он наследуется от абстрактного класса FormView и реализует интерфейс IDeliveryForm. Класс добавляет обработчики событий для кнопок выбора способа оплаты и отправки формы. Метод `render` позволяет установить значения полей формы, а также отобразить ошибки валидации.

### 8. ContactsFormView
Класс ContactsFormView - это класс, который обеспечивает отображение формы контактов на странице. Он наследуется от абстрактного класса FormView и реализует интерфейс IContactsForm. Класс добавляет обработчики событий для кнопок отправки формы. Метод `render` позволяет установить значения полей формы, а также отобразить ошибки валидации.

### 9. BasketView
Класс `BasketView` отвечает за отображение корзины на странице. Он наследуется от базового класса `View` и реализует интерфейс `IBasketView`. Этот класс обеспечивает управление отображением списка продуктов в корзине, общей суммы и кнопки для перехода к оформлению заказа.
Класс `BasketView` обеспечивает динамическое обновление элементов отображения корзины и позволяет пользователю взаимодействовать с интерфейсом для перехода к следующему шагу в процессе оформления заказа.

### 10. ProductInBasketView
Класс `ProductInBasketView` - это класс, который обеспечивает отображение элементов корзины на странице. Он наследуется от базового класса `View` и реализует интерфейс `IProductInBasketView`. Класс `ProductInBasketView` обеспечивает динамическое обновление элементов отображения элемента корзины, включая порядковый номер, наименование, цену и кнопку для удаления элемента.


## Презентеры
### 1. HeaderPresenter
HeaderPresenter - это класс, который работает с моделью корзины и представлением шапки сайта. Он содержит следующие свойства:
- `model`: объект типа `IBasketModel`;
- `view`: объект типа `HeaderView`;
- `events`: объект типа `EventEmitter`, который используется для обмена событиями между моделью и представлением.

### 2. CatalogPresenter
CatalogPresenter - это класс, который работает с моделью каталога и представлением тела страницы.
Он содержит следующие свойства:
- `model`: объект типа `ICatalogModel`;
- `view`: объект типа `PageView`;
- `events`: аналогично.

### 3. BasketPresenter
BasketPresenter - это класс, который работает с моделью корзины и представлениями корзины и модального окна.
Он содержит следующие свойства:
- `model`: объект типа `IBasketModel`;
- `basketView`: объект типа `BasketView`;
- `modalView`: объект типа `ModalView`;
- `events`: аналогично.

### 4. OrderPresenter
OrderPresenter - это класс, который работает с моделью заказа и представлениями формы и модального окна.
Он содержит следующие свойства:
- `model`: объект типа `IOrderModel`;
- `deliveryView`: объект типа `DeliveryFormView`;
- `contactsView`: объект типа `ContactsFormView`;
- `modalView`: объект типа `ModalView`;
- `events`: аналогично.

## Интеграция
В файле index.ts создается экземпляр класса App, который инициализирует приложение.
В классе App создается 
- экземпляр класса EventEmitter, который используется для отправки и приема событий;
- экземпляр класса Api, который используется для работы с API;
- экземпляры моделей, которые хранят данные;
- экземпляры представлений, которые отвечают за отображение данных на странице;
- экземпляры презентеров, которые реализуют логику работы с моделью и представлением;