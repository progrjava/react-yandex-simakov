/**
 * Тип модального окна
 */
export type ModalType =
    | 'product'
    | 'basket'
    | 'delivery'
    | 'contacts'
    | 'success';

/**
 * Интерфейс для модели состояния приложения
 * @method openModal - открыть модальное окно
 * @param {ModalType} modal - тип модального окна
 * 
 * @method closeModal - закрыть модальное окно
 */
export interface IAppStateModel {
    openModal(modal: ModalType): void;
    closeModal(): void;
}
