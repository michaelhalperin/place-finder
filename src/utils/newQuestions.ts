import { Question } from "@/types/types";

export const NEW_INITIAL_QUESTIONS: { [key: string]: Question } = {
  groupSize: {
    id: "groupSize",
    question: "How many people will be in your group?",
    type: "single",
    options: [
      { id: "1", value: "1", label: "Just me" },
      { id: "2", value: "2", label: "A couple (2 people)" },
      { id: "3", value: "3", label: "Three people" },
      { id: "4", value: "4", label: "Four people" },
      { id: "5", value: "5+", label: "Five or more" },
    ],
    nextQuestion: (answer) => {
      if (answer === "1") {
        return "soloActivity";
      } else if (["2", "4"].includes(answer)) {
        return "coupleOccasion";
      }
      return "groupOccasion";
    },
  },

  soloActivity: {
    id: "soloActivity",
    question: (prevAnswer) => {
      return prevAnswer === "1" 
        ? "What kind of activity are you looking for as a solo adventurer?"
        : "What would you like to do on your own?";
    },
    type: "single",
    options: [
      { id: "1", value: "relax", label: "Relax and unwind" },
      { id: "2", value: "explore", label: "Explore new places" },
      { id: "3", value: "adventure", label: "Adventure and excitement" },
      { id: "4", value: "learn", label: "Learn something new" },
      { id: "5", value: "creative", label: "Creative and artistic" },
    ],
    nextQuestion: (answer) => {
      if (answer === "relax") return "preferences";
      if (answer === "explore") return "budget";
      return "preferences";
    },
  },

  coupleOccasion: {
    id: "coupleOccasion",
    question: (prevAnswer) => {
      return prevAnswer === "2"
        ? "What's the occasion for you two?"
        : "What kind of shared activity are you planning?";
    },
    type: "single",
    options: [
      { id: "1", value: "romantic", label: "A romantic date" },
      { id: "2", value: "culinary", label: "Cooking or dining together" },
      { id: "3", value: "study", label: "A study or work session" },
      { id: "4", value: "tourist", label: "Exploring as tourists" },
      { id: "5", value: "trip", label: "A fun day trip" },
    ],
    nextQuestion: (answer) => {
      if (answer === "romantic") return "preferences";
      if (answer === "culinary") return "budget";
      return "preferences";
    },
  },

  groupOccasion: {
    id: "groupOccasion",
    question: (prevAnswer) => {
      return prevAnswer === "5+"
        ? "What brings your large group together?"
        : "What brings your group together?";
    },
    type: "single",
    options: [
      { id: "1", value: "friends", label: "A friends' hangout" },
      { id: "2", value: "family", label: "A family gathering" },
      { id: "3", value: "business", label: "A work or business event" },
      { id: "4", value: "celebration", label: "A celebration or party" },
      { id: "5", value: "trip", label: "A group day trip" },
    ],
    nextQuestion: (answer) => {
      if (answer === "friends") return "preferences";
      if (answer === "family") return "budget";
      return "preferences";
    },
  },

  preferences: {
    id: "preferences",
    question: (prevAnswer) => {
      if (prevAnswer === "relax") {
        return "Do you prefer a calm indoor or an outdoor setting?";
      } else if (prevAnswer === "romantic") {
        return "Would you like something intimate or adventurous?";
      } else {
        return "Do you have any specific preferences for the activity?";
      }
    },
    type: "single",
    options: [
      { id: "1", value: "outdoor", label: "Outdoor activity" },
      { id: "2", value: "indoor", label: "Indoor activity" },
      { id: "3", value: "relaxing", label: "Relaxing and calm" },
      { id: "4", value: "active", label: "Active and engaging" },
      { id: "5", value: "surprise", label: "Surprise me!" },
    ],
    nextQuestion: (answer) => {
      if (answer === "outdoor" || answer === "active") return "budget";
      return "budget";
    },
  },

  budget: {
    id: "budget",
    question: (prevAnswer) => {
      return prevAnswer === "luxury"
        ? "What kind of high-end experience are you looking for?"
        : "What's your budget per person for this activity?";
    },
    type: "single",
    options: [
      { id: "1", value: "budget", label: "Budget-friendly (up to ₪50)" },
      { id: "2", value: "moderate", label: "Moderate (₪50-₪100)" },
      { id: "3", value: "high", label: "High-end (₪100-₪200)" },
      { id: "4", value: "luxury", label: "Luxury (₪200+)" },
    ],
    nextQuestion: () => null, // No further questions
  },
};
