import { DealInterface } from "./dealInterface";

  
  export interface DealDetailsInterface extends DealInterface {
    gameID: string;
    steamAppID: string;
    cheapestPrice: string;
    cheapestPriceDate: number;
    releaseDate: number;
    publisher: string;
    steamRatingText: string;
    steamRatingPercent: string;
    steamRatingCount: string;
    metacriticScore: string;
    metacriticLink: string;
    dealRating: string;
    storeID: string;
    storeName: string;
    price: string;
    retailPrice: string;
    savings: string;
  }