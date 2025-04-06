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
- AppStateModel

### View - классы, отвечающие за отображение данных
- View (базовый класс)
- PageView
- ProductPreviewView
- SuccessView
- ModalView
- FormView
- DeliveryFormView
- ContactsFormView
- BasketView
- CatalogView

### Presenter - классы, обеспечивающие связь между Model и View
- CatalogPresenter
- BasketPresenter
- PagePresenter
- OrderPresenter
- AppStatePresenter
- ProductPreviewPresenter
- SuccessPresenter
- ModalPresenter


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
View - это абстрактный класс, который обеспечивает работу с отображением.

Он имеет следующие методы:
- `render(data?: T): HTMLElement` - абстрактный метод, который отображает данные на странице.
- `toggleClass(element: HTMLElement | string, className: string, force?: boolean)` - переключает CSS-класс на элементе.
- `setText(element: HTMLElement | string, value: unknown)` - изменяет текстовое содержимое элемента.
- `setImage(element: HTMLImageElement | string, src: string, alt?: string)` - изменяет изображение на странице.

View - это класс, который необходимо наследовать при создании классов отображения.

### Model
Model - это абстрактный класс, который обеспечивает работу с данными. 
Он содержит приватное свойство `_data` для хранения данных и приватное свойство `_events` для работы с событиями. 

В классе Model есть следующие методы:
- `emitEvent(eventName: string, data?: object)`: инициирует событие
- `updateData(updater: (currentData: T) => T)`: обновляет данные модели
- `get data(): T`: возвращает данные модели


## Типы данных

### ModalType
```typescript
/**
 * Тип модального окна
 */
type ModalType =
    | 'product'
    | 'basket'
    | 'delivery'
    | 'contacts'
    | 'success';
```

### IAppState
```typescript
/**
 * Интерфейс для хранения состояния приложения
 *
 * @property {ModalType | null} activeModal - тип активного модального окна
 * @property {string[]} validationErrors - список ошибок валидации форм
 */
interface IAppState {
    activeModal: ModalType | null;
    validationErrors: string[];
}
```

### IAppStateModel
```typescript
/**
 * Интерфейс для модели состояния приложения
 *
 * @property {ModalType | null} data.activeModal - тип активного модального окна
 * @property {string[]} data.validationErrors - список ошибок валидации форм
 *
 * @method openModal - открыть модальное окно
 * @param {ModalType} modal - тип модального окна
 * @method closeModal - закрыть модальное окно
 * @method setValidationErrors - установить список ошибок валидации форм
 * @param {string[]} errors - список ошибок
 */
interface IAppStateModel extends IModel<IAppState> {
    openModal(modal: ModalType): void;
    closeModal(): void;
    setValidationErrors(errors: string[]): void;
}
```

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
interface IBasketItem extends Pick<IProduct, 'id' | 'title' | 'price' | 'inBasket'> {};
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
 */
interface IBasketModel {
    addItem(item: IBasketItem): void;
    removeItem(id: string): void;
    get total(): number;
};
```

### Events
```typescript
/**
 * Типы событий
 */
enum Events {
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
 * @property {PaymentMethod} data.payment - способ оплаты
 * @property {string} data.address - адрес доставки
 * @property {string} data.email - электронная почта
 * @property {string} data.phone - номер телефона
 *
 * @method validatePayment - проверяет валидность способа оплаты
 * @method validateAddress - проверяет валидность адреса доставки
 * @method validateEmail - проверяет валидность электронной почты
 * @method validatePhone - проверяет валидность номера телефона
 */
interface IOrderModel {
    validatePayment(): boolean;
    validateAddress(): boolean;
    validateEmail(): boolean;
    validatePhone(): boolean;
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
    inBasket: boolean;
}
```

### ICatalogModel
```typescript
/**
 * Интерфейс для модели списка товаров
 *
 * @method loadProducts - загрузить список товаров
 * @returns {Promise<void>} - промис, который разрешается после загрузки списка товаров
 */
export interface ICatalogModel {
    loadProducts(): Promise<void>;
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

### 4. AppStateModel
AppStateModel - это класс, который хранит информацию о текущем состоянии приложения. Он имеет следующие свойства и методы:
- activeModal - свойство, которое хранит тип активного модального окна.
- errors - свойство, которое хранит ошибки валидации.
- openModal(type: ModalType) - метод, который открывает модальное окно с указанным типом.
- closeModal() - метод, который закрывает все модальные окна.
- setValidationErrors(errors: string[]) - метод, который обновляет ошибки валидации.


## Отображение данных
Классы, которые отвечают за отображение данных на странице.

### 1. PageView
Класс `PageView` расширяет базовый класс `View` и отвечает за отображение элементов, связанных с корзиной на странице. Он содержит два приватных свойства: `basketCounter` и `basketButton`, которые представляют собой HTML-элементы для отображения счетчика корзины и кнопки корзины соответственно.

Также устанавливается обработчик события `click` на `basketButton`, который при срабатывании вызывает метод `emit` объекта `events` для отправки события `Events.BASKET_OPEN`.

### 2. ProductPreviewView
ProductPreviewView - это класс, который отвечает за отображение превью карточки товара на странице. Он содержит приватные свойства: `addButton`, `priceElement`, `descriptionElement`, `imageElement`, `categoryElement`, `titleElement`, которые представляют собой HTML-элементы для отображения кнопки "Добавить", цены, описания, изображения, категории и заголовка товара соответственно.

В конструкторе класса `ProductPreviewView` устанавливаются обработчики события `click` на `addButton`, который при срабатывании вызывает метод `emit` объекта `events` для отправки события `Events.PRODUCT_ADD` или `Events.PRODUCT_REMOVE`, в зависимости от значения свойства `inBasket` объекта `data`, переданного в методе `render`.

В методе `render` происходит отображение данных фильма на странице.

### 3. SuccessView
SuccessView - это класс, который отвечает за отображение результата заказа на странице. 
Он содержит приватные свойства: `closeButton` - кнопка закрытия модального окна, `description` - текстовое описание результата заказа. 

В конструкторе класса `SuccessView` устанавливаются обработчики события `click` на `closeButton`, который при срабатывании вызывает метод `emit` объекта `events` для отправки событий `ORDER_RESET` и `MODAL_CLOSE`. 

В методе `render` происходит отображение данных результата заказа на странице.

### 4. ModalView
ModalView - это класс, который отвечает за отображение модального окна на странице. Он содержит приватные свойства: `closeButton` - кнопка закрытия модального окна, `content` - контейнер для отображения контента модального окна.

В конструкторе класса `ModalView` устанавливаются обработчики события `click` на `closeButton`, который при срабатывании вызывает метод `emit` объекта `events` для отправки события `Events.MODAL_CLOSE`, и обработчик события `click` на контейнер модального окна, который при срабатывании вызывает метод `emit` объекта `events` для отправки события `Events.MODAL_CLOSE`, если целевым элементом не является контейнер модального окна.

В методе `render` происходит отображение контента модального окна, если он передан в качестве параметра, и отображение самого модального окна. Метод `close` скрывает модальное окно.

### 5. BasketView
BasketView - это класс, который отвечает за отображение корзины на странице. Он содержит приватные свойства: 
- `list` - список товаров в корзине,
- `total` - общая сумма заказа,
- `submitButton` - кнопка отправки заказа.

В конструкторе класса `BasketView` устанавливаются обработчики события `click` на кнопку отправки заказа, который при срабатывании вызывает метод `emit` объекта `events` для отправки события `Events.BASKET_ORDER`, и обработчики события `click` на кнопки удаления товаров из корзины, которые при срабатывании вызывают метод `emit` объекта `events` для отправки события `Events.PRODUCT_REMOVED` с id удаляемого товара.

В методе `render` происходит отображение списка товаров в корзине, общей суммы заказа, и кнопки отправки заказа.

### 6. CatalogView
CatalogView - это класс, который отвечает за отображение каталога фильмов на странице. Он содержит приватное свойство `itemsContainer`, которое представляют собой HTML-элемент, содержащий контейнер для отображения элементов каталога.

В конструкторе класса `CatalogView` устанавливаются обработчики события `click` на каждый из элементов каталога, которые при срабатывании вызывают метод `emit` объекта `events` для отправки события `Events.PRODUCT_PREVIEW` с id фильма, и обработчики события `click` на кнопки "Купить" или "Удалить" у каждого из элементов каталога, которые при срабатывании вызывают метод `emit` объекта `events` для отправки события `Events.PRODUCT_ADDED` или `Events.PRODUCT_REMOVED` с id фильма, в зависимости от текста на кнопке.

### 7. FormView
FormView - это абстрактный класс, который обеспечивает отображение и логику работы с формой на странице.
Он содержит следующие приватные свойства:
- submitButton - кнопка отправки формы;
- errors - элемент, который отображает ошибки валидации;
- form - сам элемент формы.
Методы:
- setupInputHandler - метод, который настраивает поле ввода, добавляя слушатель события input;
- setFormField - метод, который изменяет значение поля ввода и отправляет событие с id поля ввода;
- setSubmitState - метод, который изменяет состояние кнопки отправки формы, добавляя или удаляя CSS-класс button_disabled;
- setErrors - метод, который изменяет текст ошибок валидации;
- resetForm - метод, который очищает форму и текст ошибок валидации.

### 8. DeliveryFormView
Класс DeliveryFormView - это абстрактный класс, который обеспечивает отображение и логику работы с формой доставки на странице.
Он содержит следующие приватные свойства:
- paymentButtons - массив кнопок выбора способа оплаты;
- setupInputHandler - метод, который настраивает поле ввода, добавляя слушатель события input;
- setFormField - метод, который изменяет значение поля ввода и отправляет событие с id поля ввода;
- setSubmitState - метод, который изменяет состояние кнопки отправки формы, добавляя или удаляя CSS-класс button_disabled;
- togglePaymentActive - метод, который изменяет состояние кнопки выбора способа оплаты, добавляя или удаляя CSS-класс button_alt-active;
- render - метод, который отображает форму доставки на странице, изменяет значения полей ввода, отправляет события с id полей ввода, и изменяет состояние кнопки отправки формы.

### 9. ContactsFormView
ContactsFormView - это класс, который обеспечивает отображение и логику работы с формой контактов на странице.
Он содержит приватные свойства:
- emailInput - поле ввода email;
- phoneInput - поле ввода телефона;
- submitButton - кнопка отправки формы;
- errors - контейнер для отображения ошибок валидации.

В конструкторе класса ContactsFormView устанавливаются слушатели событий input на поля ввода email и телефона, которые при срабатывании отправляют события с id ORDER_EMAIL_CHANGE и ORDER_PHONE_CHANGE соответственно.
Также устанавливаются слушатели событий click на кнопку отправки формы, который при срабатывании отправляет событие с id ORDER_FORM2_SUBMIT.

В методе render происходит отображение формы контактов на странице, изменяется текст ошибок валидации.
В методе setErrors происходит изменение текста ошибок валидации.


## Презентеры

### 1. CatalogPresenter
CatalogPresenter - это класс, который работает с моделью и представлением каталога. Он содержит следующие приватные свойства:
- `model`: объект типа `IProductModel`, который представляет собой модель данных каталога;
- `view`: объект типа `CatalogView`, который отвечает за отображение каталога на странице;
- `events`: объект типа `EventEmitter`, который используется для обмена событиями между моделью и представлением.

### 2. BasketPresenter
BasketPresenter - это класс, который работает с моделью и представлением корзины. Он содержит следующие приватные свойства:
- `model`: объект типа `IBasketModel`, который представляет собой модель данных корзины;
- `view`: объект типа `BasketView`, который отвечает за отображение корзины на странице;
- `events`

### 3. PagePresenter
PagePresenter - это класс, который работает с моделью корзины и представлением страницы. Он содержит следующие приватные свойства:
- `view`: объект типа `PageView`, который отвечает за отображение страницы;
- `basketModel`: объект типа `IBasketModel`, который представляет собой модель данных корзины;
- `events`

### 4. OrderPresenter
OrderPresenter - это класс, который работает с моделью и представлениями доставки и контактов заказа. Он содержит следующие приватные свойства:
- `model`: объект типа `IOrderModel`, который представляет собой модель данных заказа;
- `deliveryFormView`: объект типа `DeliveryFormView`, который отвечает за отображение формы доставки на странице;
- `contactsFormView`: объект типа `ContactsFormView`, который отвечает за отображение формы контактов на странице;
- `events`

### 5. ProductPreviewPresenter
ProductPreviewPresenter - это класс, который работает с моделью каталога и представлением превью карточки товара. Он содержит следующие приватные свойства:
- `view`: объект типа `ProductPreviewView`, который отвечает за отображение превью карточки товара на странице;
- `catalogModel`: объект типа `ICatalogModel`, который представляет собой модель данных каталога;
- `events`

### 6. SuccessPresenter
SuccessPresenter - это класс, который работает с моделью корзины и представлением модального окна успешной покупки. Он содержит следующие приватные свойства:
- `view`: объект типа `SuccessView`, который отвечает за отображение модального окна успеха;
- `basketModel`: объект типа `IBasketModel`, который представляет собой модель данных корзины;
- `events`

### 7. ModalPresenter
ModalPresenter - это класс, который работает с моделью состояния приложения и представлением модального окна. Он содержит следующие приватные свойства:
- `model`: объект типа `IAppStateModel`, который представляет собой модель состояния приложения;
- `view`: объект типа `ModalView`, который отвечает за отображение модального окна на странице;
- `events`


## Интеграция
В файле index.ts создается экземпляр класса App, который инициализирует приложение.
В классе App создается 
- экземпляр класса EventEmitter, который используется для отправки и приема событий;
- экземпляр класса Api, который используется для работы с API;
- экземпляры моделей, которые хранят данные;
- экземпляры представлений, которые отвечают за отображение данных на странице;
- экземпляры презентеров, которые реализуют логику работы с моделью и представлением;