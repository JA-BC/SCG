import { AbstractType, InjectionToken, Type } from "@angular/core";

export type TProvider<T> = Type<T> | InjectionToken<T> | AbstractType<T>;

export type TConstructor<T> = new(...args: any) => T;

export type TPairs<TValue> = { key: string, value: TValue };
