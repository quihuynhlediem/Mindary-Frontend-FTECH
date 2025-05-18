import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Define an interface for environment variables (for better type safety)
interface EnvConfig {
    PRODUCTION: string;
    LOCALHOST: string;
    PROD: string;
}

// Access environment variables with type safety
const env: EnvConfig = {
    PRODUCTION: process.env.NEXT_PUBLIC_PRODUCTION || '0',
    LOCALHOST: process.env.NEXT_PUBLIC_LOCALHOST || 'http://localhost:8080',
    PROD: process.env.NEXT_PUBLIC_PROD || 'http://mindary-alb-1862688611.ap-southeast-2.elb.amazonaws.com',
};

// Determine the base backend URL based on the environment
const BACKEND_BASE_URL = env.PRODUCTION !== '0' ? env.PROD : env.LOCALHOST;

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    const backendUrl = `${BACKEND_BASE_URL}/api/v1/${params.path.join('/')}`;
    try {
        const response = await axios.get(backendUrl, {
            headers: {
                Authorization: request.headers.get('Authorization') || '',
            },
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Proxy request failed' },
            { status: error.response?.status || 500 }
        );
    }
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
    const backendUrl = `${BACKEND_BASE_URL}/api/v1/${params.path.join('/')}`;
    const body = await request.json();
    try {
        const response = await axios.post(backendUrl, body, {
            headers: {
                Authorization: request.headers.get('Authorization') || '',
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Proxy request failed' },
            { status: error.response?.status || 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
    const backendUrl = `${BACKEND_BASE_URL}/api/v1/${params.path.join('/')}`;
    const body = await request.json();
    try {
        const response = await axios.put(backendUrl, body, {
            headers: {
                Authorization: request.headers.get('Authorization') || '',
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Proxy request failed' },
            { status: error.response?.status || 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
    const backendUrl = `${BACKEND_BASE_URL}/api/v1/${params.path.join('/')}`;
    try {
        const response = await axios.delete(backendUrl, {
            headers: {
                Authorization: request.headers.get('Authorization') || '',
            },
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Proxy request failed' },
            { status: error.response?.status || 500 }
        );
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
    const backendUrl = `${BACKEND_BASE_URL}/api/v1/${params.path.join('/')}`;
    const body = await request.json();
    try {
        const response = await axios.patch(backendUrl, body, {
            headers: {
                Authorization: request.headers.get('Authorization') || '',
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Proxy request failed' },
            { status: error.response?.status || 500 }
        );
    }
}