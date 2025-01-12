import { Activity, Description, UserSettings } from "@/types/types";

export function getRecommendations(
  userAnswers: UserSettings,
  activities: Activity[]
): { searchTerm: string; recommendations: Activity[] } {
  if (!userAnswers || !activities.length) {
    return { searchTerm: "", recommendations: activities };
  }

  // Score each activity based on matching criteria
  const scoredActivities = activities.map(activity => {
    let score = 0;

    // Match tags with user preferences
    if (activity.tags.some(tag => tag.includes(userAnswers.q1?.toLowerCase()))) {
      score += 3;
    }
    
    // Match difficulty
    if (activity.difficulty === userAnswers.q3) {
      score += 2;
    }

    // Match duration
    if (activity.duration === userAnswers.q4) {
      score += 2;
    }

    // Match time of day
    if (activity.timeOfDay === userAnswers.q5) {
      score += 2;
    }

    return { ...activity, score };
  });

  // Sort by score and return top matches
  const recommendations = scoredActivities
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .map(({ score, ...activity }) => activity);

  return {
    searchTerm: Object.values(userAnswers).filter(Boolean).join(", "),
    recommendations
  };
}

/**
 * Generates a personalized description based on user preferences.
 */
export function getPersonalizedDescription(
  userAnswers: UserSettings
): Description {
  const { searchTerm } = getRecommendations(userAnswers, []);
  if (!userAnswers || Object.keys(userAnswers).length === 0) {
    return {
      interests: [],
      specifics: [],
      text: "Complete the questionnaire to get personalized recommendations.",
      needsQuestionnaire: true,
    };
  }
  const interests = searchTerm.split(",").map((term) => term.trim());

  return {
    interests,
    specifics: [],
    text: `Based on your preferences, we've picked these activities for you.`,
    needsQuestionnaire: false,
  };
}
