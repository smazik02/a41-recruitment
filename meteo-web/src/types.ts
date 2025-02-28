import * as React from 'react';

export interface WeatherReport {
    id: string;
    temperature: number;
    unit: TemperatureUnit;
    city: string;
    date: string;
}

export type TemperatureUnit = 'C' | 'K' | 'F';

export interface LayoutProps {
    children: React.ReactNode;
}