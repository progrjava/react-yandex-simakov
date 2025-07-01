// Селекторы для основных элементов интерфейса
const userNameContainer = '[data-cy="user-name"]';
const bunsList = '[data-cy="data-buns"]';
const mainsList = '[data-cy="data-mains"]';
const sausesList = '[data-cy="data-sauses"]';
const burgerConstructor = '[data-cy="burger-constructor"]';
const constructorElement = '[data-cy="constructor-element"]'
const modal = '[data-cy="modal-element"]';
const closeModalButton = '[data-cy="close-modal-button"]';
const modalOverlay = '[data-cy="modal-overlay"]';
const checkoutButton = '[data-cy="checkout-button"]';

describe('Конструктор бургеров', () => {
  beforeEach(() => {
    // Мокирование API-запросов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'account.json' }).as(
      'getUser'
    );

    // Установка данных аутентификации
    cy.fixture('login.json').then((loginData) => {
      window.localStorage.setItem('refreshToken', loginData.refreshToken);
      cy.setCookie('accessToken', loginData.accessToken);
    });

    // Посещение тестируемой страницы и ожидание загрузки данных
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('Имя пользователя', () => {
    it('Должен отображать имя пользователя', () => {
      cy.fixture('account.json').then((accountData) => {
        cy.get(userNameContainer).should('contain', accountData.user.name);
      });
    });
  });

  describe('Добавление ингредиентов', () => {
    it('Должен добавлять булку в конструктор', () => {
      cy.get(bunsList).find('button').first().click();
      cy.get(burgerConstructor).find(constructorElement).should('have.length', 2);
    });

    it('Должен добавлять начинку в конструктор', () => {
      cy.get(mainsList).find('button').first().click();
      cy.get(sausesList).find('button').first().click();
      cy.get(burgerConstructor).find(constructorElement).should('have.length', 2);
    });
  });

  describe('Модальные окна', () => {
    it('Должен открывать модальное окно ингредиента', () => {
      cy.get(modal).should('not.exist');
      cy.get(mainsList).children().first().click();
      cy.get(modal).contains('Детали ингредиента').should('exist');
    });

    it('Должен закрывать модальное окно ингредиента по нажатию на крестик', () => {
      cy.get(mainsList).children().first().click();
      cy.get(closeModalButton).click();
      cy.get(modal).should('not.exist');
    });

    it('Должен закрывать модальное окно ингредиента по нажатию на оверлей', () => {
      cy.get(mainsList).children().first().click();
      cy.get(modalOverlay).click({ force: true });
      cy.get(modal).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Должен создавать заказ и работать с модальными окнами', () => {
      // сборка бургера
      cy.get(bunsList).find('button').first().click();
      cy.get(mainsList).find('button').first().click();
      cy.get(sausesList).find('button').first().click();
      cy.get(burgerConstructor).find(constructorElement).should('have.length', 4);

      // клик по кнопке "Оформить заказ"
      cy.get(checkoutButton).should('exist').click();
      cy.get(modal).contains('999999').should('exist');

      // проверка отправки заказа
      cy.wait('@createOrder').then((interception) => {
        expect(interception.request.headers).to.have.property('authorization');
        expect(interception.request.body.ingredients).to.have.length(3);
      });

      // закрытие модального окна
      cy.get(closeModalButton).should('exist').click();
      cy.get(modal).should('not.exist');

      // конструктор пуст
      cy.get(burgerConstructor).find(constructorElement).should('have.length', 0);
    });
  });
});
