/**
 * DTO fror transport books in response
 */
export interface BookDTO {
  id: number
  title: string,
  author: string,
  year: number,
  description: string,
  imagePath?: string,
  pagesCount: number,
  rating?: number,
}

/**
 * DTO for creating new book
 */
export interface NewBookDTO {
  title: string,
  author: string,
  year: number,
  description: string,
  imagePath?: string,
  pagesCount: number,
  rating?: number,
}