import type { Note } from "../types";

export const getNoteIdFromPath = (pathname: string): number | null => {
  const pathPart = pathname.split("/note/")[1];
  return pathPart && pathPart !== "New_Note" ? Number(pathPart) : null;
};

export const findNoteById = (notes: Note[], id: number): Note | undefined => {
  return notes.find((n) => n.id === id);
};

export const getBaseRoute = (pathname: string): string => {
  if (pathname.startsWith("/Archived-Note")) {
    return "/Archived-Note";
  }
  if (pathname.startsWith("/TaggedNote")) {
    return "/TaggedNote";
  }
  return "/All-NOTE";
};

