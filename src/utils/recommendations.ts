import { Activity, Description, UserSettings } from "@/types/types";

export function getRecommendations(
  userAnswers: UserSettings,
  activities: Activity[]
): { searchTerm: string; recommendations: Activity[] } {
  if (!userAnswers || !activities.length) {
    return { searchTerm: "", recommendations: activities };
  }
  const scoredActivities = activities.map((activity) => {
    let score = 0;

    if (
      activity.tags.some((tag) => tag.includes(userAnswers.q1?.toLowerCase()))
    ) {
      score += 3;
    }
    if (activity.difficulty === userAnswers.q3) {
      score += 2;
    }
    if (activity.duration === userAnswers.q4) {
      score += 2;
    }
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
    recommendations,
  };
}

/**
 * Generates a personalized description based on user preferences.
 */
export function getPersonalizedDescription(
  userAnswers: UserSettings
): Description {
  if (!userAnswers || Object.keys(userAnswers).length === 0) {
    return {
      interests: [],
      specifics: [],
      text: "Complete the questionnaire to get personalized recommendations.",
      needsQuestionnaire: true,
    };
  }

  // Extract interests directly from userAnswers instead of using getRecommendations
  const interests = Object.values(userAnswers)
    .filter(Boolean)
    .map((answer) => answer.toString().trim());

  return {
    interests,
    specifics: [],
    text: `Based on your preferences, we've picked these activities for you.`,
    needsQuestionnaire: false,
  };
}
