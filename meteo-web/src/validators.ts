import ReportForm from './pages/ReportForm.tsx';
import { TemperatureUnit } from './types.ts';

export class EmptyFieldError extends Error {
    constructor(message: string, readonly fields: Set<string>) {
        super(message);
        this.name = 'EmptyFieldError';
        Object.setPrototypeOf(this, EmptyFieldError.prototype);
    }
}

export function validateForm(form: ReportForm) {
    const missingFields = new Set<string>;
    if (form.temperature === undefined) missingFields.add('temperature');
    if (form.date === '') missingFields.add('date');
    if (form.city === '') missingFields.add('city');
    if (missingFields.size != 0) {
        throw new EmptyFieldError('Missing fields!', missingFields);
    }

    if (temperatureToKelvin(form.temperature as number, form.unit) < 0) {
        throw new Error('Temperature cannot go below 0 K!');
    }
}

export function temperatureToKelvin(temperature: number, unit: TemperatureUnit) {
    switch (unit) {
        case 'C': {
            return temperature + 273;
        }
        case 'F': {
            return Math.round((temperature + 459.67) * 5 / 9);
        }
        case 'K': {
            return temperature;
        }
    }
}