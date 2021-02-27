import { Injector } from "@angular/core";
import { TProvider } from "../interfaces/type";

export class AppInjector {

    private static _injector: Injector;

    private constructor() { }

    static getInstance<T>(instanceType: TProvider<T>) {
        return AppInjector._injector.get(instanceType, null);
    }

    static setInjector(injector: Injector) {
        return AppInjector._injector = injector;
    }

}
