export interface ReviewStatistic {
  averageRating: number,
  namberReviews: number,
  percentages: { [key: number]: number };
}