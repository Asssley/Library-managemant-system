/**
 * DTO for transport books in response
 */
export interface FullBookDTO {
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

/**
 * DTO for transport book info partialy 
 */
export interface ShortBookDTO {
  title: string,
  author: string,
  imagePath: string | null
}

/**
 * DTO for transport book info to admin table 
 */
export interface AdminBookDTO {
  id: number
  title: string,
  author: string,
  year: number,
  imagePath?: string,
  clickCount: number,
}