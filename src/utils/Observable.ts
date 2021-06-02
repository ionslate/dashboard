type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export default class Observable<T> {
  private listeners: Listener<T>[] = [];

  constructor(private val: T) {
    this.val = val;
  }

  get value(): T {
    return this.val;
  }

  setValue(val: T) {
    if (this.val !== val) {
      this.val = val;
      this.listeners.forEach((listener) => listener(val));
    }
  }

  subscribe(newListener: Listener<T>): Unsubscriber {
    this.listeners.push(newListener);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => newListener !== listener,
      );
    };
  }
}
