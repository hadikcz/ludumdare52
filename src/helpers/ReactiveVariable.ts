import { Subject } from 'rxjs';

export default class ReactiveVariable<T> {

    public $: Subject<T>;
    private value: T;

    constructor (value: T) {
        this.$ = new Subject<T>();
        this.value = value;
    }

    getValue (): T {
        return this.value;
    }

    setValue (value: T): void {
        this.value = value;

        this.$.next(value);
    }
}
