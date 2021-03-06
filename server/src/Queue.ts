import {getOrDefault} from './Helper';

export class Queue<T> {
  private _size: number;
  private _data: T[];

  constructor(size?: number) {
    this._size = getOrDefault(size, 100);
    this._data = [];
  }

  append(object: T): void {
    this._data.push(object);
    while (this._data.length > this._size) {
      this._data.splice(0, 1);
    }
  }

  get data(): T[] {
    return this._data;
  }

  get dataReversed(): T[] {
    const akku: T[] = [];
    for(let i = this._data.length - 1; i >= 0; --i) {
      akku.push(this._data[i]);
    }
    return akku;
  }

  get length(): number {
    return this._data.length;
  }
}
