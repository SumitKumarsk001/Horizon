
import type { IconType } from "react-icons";
import api from "../api/axios";

export interface SearchResult {
  title: string;
  path: string;
  icon:IconType;
}

export const searchPagesApi = (
  query: string,
  signal?: AbortSignal
) => {
  return api.get<SearchResult[]>("/search", {
    params: {
      q: query,
    },
    signal,
  });
};