import { useState } from 'react';
import { gptApi } from '../api/gpt';
import { placesApi } from '../api/api';
import { GPTResponse, UserPreferences } from '../types/types';

export const useDataFetching = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GPT-related fetching
  const fetchQuestions = async (userPreferences?: UserPreferences) => {
    try {
      setLoading(true);
      setError(null);
      const response = await gptApi.generateQuestions(userPreferences);
      return response;
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async (answers: Record<string, string>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await gptApi.getPersonalizedRecommendations(answers);
      return response;
    } catch (error: any) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Places API fetching
  const fetchNearbyPlaces = async (
    latitude: number,
    longitude: number,
    options?: {
      radius?: number;
      type?: string;
      keyword?: string;
    }
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await placesApi.searchNearby(latitude, longitude, options);
      return response;
    } catch (error: any) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await placesApi.getPlaceDetails(placeId);
      return response;
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchQuestions,
    fetchRecommendations,
    fetchNearbyPlaces,
    fetchPlaceDetails,
  };
};