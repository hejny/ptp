import type { WritableDeep } from 'type-fest';

/**
 * @@@
 */
export function deepClone<TObject>(objectValue: TObject): WritableDeep<TObject> {
    return JSON.parse(JSON.stringify(objectValue)) as WritableDeep<TObject>;

    /*
    TODO: [🧠] Is there a better implementation?
    > const propertyNames = Object.getOwnPropertyNames(objectValue);
    > for (const propertyName of propertyNames) {
    >     const value = (objectValue as really_any)[propertyName];
    >     if (value && typeof value === 'object') {
    >         deepClone(value);
    >     }
    > }
    > return Object.assign({}, objectValue);
    */
}

/**
 * TODO: [🔼] Export from `@promptbook/utils`
 * TODO: [🧠] Is there a way how to meaningfully test this utility
 */
