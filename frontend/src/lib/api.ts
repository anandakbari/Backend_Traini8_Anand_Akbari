import { TrainingCenter } from "@/types";

const API_URL = 'http://localhost:8080/api/training-centers';

export const createTrainingCenter = async (data: Omit<TrainingCenter, 'id' | 'createdOn'>) => {
    try {
        console.log('Sending data:', JSON.stringify(data, null, 2)); // Debug log
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchTrainingCenters = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch centers');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
};