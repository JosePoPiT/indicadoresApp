export interface CurrencyData {
    [key: string]: Currency[]
}

export interface Currency {
    Valor: string | number;
    Fecha: string;
}