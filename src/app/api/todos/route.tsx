import { NextResponse } from 'next/server';
import { saveJSON, readJSON } from '../../managers/DataManager'; // Adjust the path

export async function GET(request: Request) {
    try {
        const data = await readJSON();
        return NextResponse.json({
            success: true,
            data
        });
    } catch (error) {
        console.error('Error reading JSON:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to retrieve data'
        }, { status: 500 });
    }
}