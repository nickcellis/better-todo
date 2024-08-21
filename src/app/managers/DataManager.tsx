"use server";
import { promises as fs } from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'public', 'app', 'data.json');

export async function saveJSON(data: TodoProps[]) {
    const toJson = JSON.stringify(data, null, 2);
    try {
        await fs.writeFile(FILE_PATH, toJson, 'utf-8');
    } catch (error) {
        console.error("Error writing JSON to file:", error);
        throw new Error("Failed to save data");
    }
}

export async function readJSON() {
    try {
        const file = await fs.readFile(FILE_PATH, 'utf8');
        return JSON.parse(file);
    } catch (error) {
        console.error("Error reading JSON from file:", error);
        throw new Error("Failed to read data");
    }
}
