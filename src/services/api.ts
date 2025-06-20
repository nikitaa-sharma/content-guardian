const API_BASE_URL = 'http://localhost:5000/api';

export interface ContentRegistration {
    content: string;
    title: string;
    type: 'text' | 'image';
}

export interface ContentVerification {
    content: string;
    type: 'text' | 'image';
}

export interface LicenseCreation {
    contentId: string;
    licenseType: string;
    permissions: string[];
}

export const api = {
    async registerContent(data: ContentRegistration) {
        const response = await fetch(`${API_BASE_URL}/content/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async verifyContent(data: ContentVerification) {
        const response = await fetch(`${API_BASE_URL}/content/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async createLicense(data: LicenseCreation) {
        const response = await fetch(`${API_BASE_URL}/licenses/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
}; 