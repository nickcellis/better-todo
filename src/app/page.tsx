"use server";
import { saveJSON, readJSON } from "./managers/DataManager";
import React from "react";
import ClientHome from "./ClientHome"

export default async function Home() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1; // Months start at 0!
  const dd = today.getDate();

  const formattedDate = `${dd}/${mm}/${yyyy}`;
  return <ClientHome formattedDate={formattedDate}/>;
}
