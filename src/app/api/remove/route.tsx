import { NextResponse } from 'next/server';
import { saveJSON, readJSON } from '../../managers/DataManager'; // Adjust the path

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const listofTodos = body.todos;
        saveJSON(listofTodos)
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error reading JSON:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to retrieve data'
        }, { status: 500 });
    }
}