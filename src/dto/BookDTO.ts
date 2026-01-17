/**
 * DTO fror transport books in response
 */
export default interface BookDTO {
  id: number
  title: string,
  author: string,
  year: number,
  description: string,
  imagePath?: string,
  pagesCount: number,
  rating?: number,
}