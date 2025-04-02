/**
 * Интерфейс для модели данных
 *
 * @property {T} data - свойства модели, доступные для чтения
 * @method update - обновляет свойства модели
 * @param {Partial<T>} data - новые значения свойств модели
 * @method reset - сбрасывает свойства модели до начальных значений
 */
export interface IModel<T> {
    get data(): T;
    update(data: Partial<T>): void;
    reset(): void;
}
