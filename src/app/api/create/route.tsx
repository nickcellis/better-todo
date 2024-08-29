import { NextResponse } from 'next/server';
import { saveJSON, readJSON } from '../../managers/DataManager'; // Adjust the path

export async function POST(request: Request) {
  try {
   const [body, jsonData] = await Promise.all([
      request.json(), // Parses the JSON body from the request
      readJSON()      // Reads the existing JSON data
    ]);
    
    const { startDate, endDate, title, archive } = body.todo;
    const todoProps = { startDate, endDate, title, archive }

    const existingTodoIndex = jsonData.findIndex((todo: any) => todo.title === title);

    if (existingTodoIndex > -1) {
      jsonData[existingTodoIndex] = { ...jsonData[existingTodoIndex], ...todoProps };
    } else {
      jsonData.push(todoProps);
    }

    await saveJSON(jsonData);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
