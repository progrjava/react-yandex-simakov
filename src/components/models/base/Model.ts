import { IEvents } from "../../base/events";

/**
 * Абстрактный класс для модели, содержащей данные и события
 */
export abstract class Model<T> {
    protected _data: T;
    protected _events: IEvents;

    /**
     * @constructor
     * @param {T} initialData - изначальные данные
     * @param {IEvents} events - объект событий
     */
    constructor(initialData: T, protected events: IEvents) {
        this._data = initialData;
        this._events = events;
    }

    /**
     * Инициирует событие
     * @protected
     * @param {string} eventName - имя события
     * @param {object} [data={}] - данные, передаваемые в событие
     */
    protected emitEvent(eventName: string, data?: object) {
        this._events.emit(eventName, data ?? {});
    }

    /**
     * Обновляет данные модели
     *
     * @protected
     * @param {function(currentData: T): T} updater - функция обновления
     */
    protected updateData(updater: (currentData: T) => T): void {
        this._data = updater(this._data);
    }

    get data(): T {
        return this._data;
    }
}
