export interface Book {
  id: number,
  title: string,
  author: string,
  year: number,
  description: string,
  imagePath?: string,
  pagesCount: number,
  rating?: number,
  viewCount: number,
  clickCount: number,
  isBooked: boolean
}