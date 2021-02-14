import { AbstractType, InjectionToken, Type } from "@angular/core";

export type TProvider<T> = Type<T> | InjectionToken<T> | AbstractType<T>;

export type TConstructor<T> = new(...args: any) => T;

export type TPairs<TValue> = { key: string, value: TValue };

export const API_URL_TOKEN = new InjectionToken('API_URL');
