import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const TIMEOUT = 10000; // 10 seconds

const GOOGLE_PLACES_API_KEY = ""

interface Location {
  lat: number;
  lng: number;
}

interface Geometry {
  location: Location;
  viewport?: {
    northeast: Location;
    southwest: Location;
  };
}

interface NearbyPlace {
  place_id: string;
  name: string;
  geometry: Geometry;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now: boolean;
  };
  types: string[];
}

interface PlaceDetails extends NearbyPlace {
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
  price_level?: number;
  international_phone_number?: string;
}

// Custom error class
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API client
export const placesApi = {
  async searchNearby(
    latitude: number,
    longitude: number,
    options: {
      radius?: number;
      type?: string;
      keyword?: string;
    } = {}
  ): Promise<NearbyPlace[]> {
    try {
      const { radius = 1500, type, keyword } = options;
      const response = await axios.get(`${BASE_URL}/nearbysearch/json`, {
        params: {
          location: `${latitude},${longitude}`,
          radius,
          type,
          keyword,
          key: GOOGLE_PLACES_API_KEY,
        },
        timeout: TIMEOUT,
      });

      if (response.data.status !== 'OK') {
        throw new ApiError(
          response.data.error_message || 'Failed to fetch nearby places',
          response.status,
          response.data.status
        );
      }

      return response.data.results;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          throw new ApiError('Request timed out. Please try again.');
        }
        if (error.response) {
          throw new ApiError(
            'Server error. Please try again later.',
            error.response.status
          );
        }
        throw new ApiError('Network error. Please check your connection.');
      }
      throw error;
    }
  },

  async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    try {
      const response = await axios.get(`${BASE_URL}/details/json`, {
        params: {
          place_id: placeId,
          key: GOOGLE_PLACES_API_KEY,
          fields: [
            'name',
            'formatted_address',
            'geometry',
            'photos',
            'rating',
            'formatted_phone_number',
            'website',
            'opening_hours',
            'reviews',
            'price_level',
          ].join(','),
        },
        timeout: TIMEOUT,
      });

      if (response.data.status !== 'OK') {
        throw new ApiError(
          response.data.error_message || 'Failed to fetch place details',
          response.status,
          response.data.status
        );
      }

      return response.data.result;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === 'ECONNABORTED') {
          throw new ApiError('Request timed out. Please try again.');
        }
        if (error.response) {
          throw new ApiError(
            'Server error. Please try again later.',
            error.response.status
          );
        }
        throw new ApiError('Network error. Please check your connection.');
      }
      throw error;
    }
  },

  // Helper method to get photo URL
  getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    return `${BASE_URL}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
  },
};
