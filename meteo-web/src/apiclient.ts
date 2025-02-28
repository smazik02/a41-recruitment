import { WeatherReport } from './types.ts';
import { IReportForm } from './pages/ReportForm.tsx';
import { NotFoundError } from './errors.ts';

export async function fetchReports() {
    const response = await fetch('http://localhost:8000/api/reports');
    const reports: WeatherReport[] = await response.json();
    return reports;
}

export async function fetchReport(reportId: string) {
    const response = await fetch(`http://localhost:8000/api/reports/${reportId}`);
    if (response.status != 200) {
        throw new NotFoundError('Not Found');
    }

    const report: WeatherReport = await response.json();
    return report;
}

export async function addReport(report: IReportForm) {
    const response = await fetch('http://localhost:8000/api/reports', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    });

    if (response.status != 200) {
        throw new Error('Something went wrong!');
    }
}

export async function saveReport(reportId: string, report: IReportForm) {
    const response = await fetch(`http://localhost:8000/api/reports/${reportId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    });

    if (response.status !== 200) {
        throw new Error('Something went wrong!');
    }
}

export async function deleteReport(reportId: string) {
    const response = await fetch(`http://localhost:8000/api/reports/${reportId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error('Something went wrong!');
    }
}