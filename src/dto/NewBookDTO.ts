/**
 * DTO for creating new book
 */
export default interface NewBookDTO {
  title: string,
  author: string,
  year: number,
  description: string,
  imagePath?: string,
  pagesCount: number,
  rating?: number,
  viewCount: number,
  clickCount: number
}