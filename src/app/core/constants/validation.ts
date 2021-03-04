export interface Validation {
    minLength: (length: number) => string;
    required: string;
    pattern: string;
    digitOnly: string;
}

export const VALIDATIONS: { [key: string]: Partial<Validation> } = {
    email: {
        required: 'Este campo es obligatorio',
        pattern: 'Debe colocar un correo valido'
    },
    password: {
        minLength: (length: number) => `Minimo ${length} caracteres`,
        required: 'Este campo debe ser valido',
        pattern: 'Debe contener al menos 1 mayuscula y numeros'
    },
    username: {
        required: 'Este campo debe ser valido',
        pattern: 'Debe contener letras, numeros y simbolos (-, _)',
        minLength: (length: number) => `Minimo ${length} caracteres`,
    },
    newPassword: {
        minLength: (length: number) => `Minimo ${length} caracteres`,
        required: 'Este campo debe ser valido',
        pattern: 'Debe contener al menos 1 mayuscula y numeros'
    },
    costo: {
        required: 'Este campo es obligatorio',
        pattern: 'No se admiten numeros menores que 0 o decimales'
    }
};
