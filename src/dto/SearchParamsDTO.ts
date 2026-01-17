/**
 * DTO for transport search parameters and filters
 */
export default interface SeacrhParamsDTO {
  searchLine?: string,
  author?: string,
  year?: number,
  sortBy?: "title" | "year" | "pagesCount" | "rating" | "clickCount",
  sortDirection?: "asc" | "desc"
}