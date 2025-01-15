import { Question } from "@/types/types";

export const INITIAL_QUESTIONS: { [key: string]: Question } = {
  q1: {
    id: "q1",
    question: "What type of experience are you looking for?",
    options: [
      {
        id: "adventure",
        label: "Adventure & Outdoors",
        nextQuestions: {
          q2: {
            id: "q2",
            question: "What kind of adventure interests you?",
            options: [
              {
                id: "hiking",
                label: "Hiking & Trekking",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What's your preferred difficulty level?",
                    options: [
                      {
                        id: "easy",
                        label: "Easy Trails",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "How long would you like to hike?",
                            options: [
                              {
                                id: "short",
                                label: "1-2 hours",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "What time of day do you prefer?",
                                    options: [
                                      { id: "morning", label: "Early Morning" },
                                      { id: "midday", label: "Midday" },
                                      { id: "afternoon", label: "Afternoon" },
                                      { id: "sunset", label: "Sunset" },
                                      { id: "night", label: "Night Hike" },
                                    ],
                                  },
                                },
                              },
                              { id: "medium", label: "2-4 hours" },
                              { id: "long", label: "4-6 hours" },
                              { id: "fullday", label: "Full Day" },
                              { id: "multi", label: "Multi-Day" },
                            ],
                          },
                        },
                      },
                      { id: "moderate", label: "Moderate Trails", 
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "How long would you like to hike?",
                            options: [
                              {
                                id: "short",
                                label: "1-2 hours",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "What time of day do you prefer?",
                                    options: [
                                      { id: "morning", label: "Early Morning" },
                                      { id: "midday", label: "Midday" },
                                      { id: "afternoon", label: "Afternoon" },
                                      { id: "sunset", label: "Sunset" },
                                      { id: "night", label: "Night Hike" },
                                    ],
                                  },
                                },
                              },
                              { id: "medium", label: "2-4 hours" },
                              { id: "long", label: "4-6 hours" },
                              { id: "fullday", label: "Full Day" },
                              { id: "multi", label: "Multi-Day" },
                            ],
                          },
                        },
                      },
                      { id: "challenging", label: "Challenging Routes",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "How long would you like to hike?",
                            options: [
                              {
                                id: "medium",
                                label: "2-4 hours",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "What time of day do you prefer?",
                                    options: [
                                      { id: "morning", label: "Early Morning" },
                                      { id: "midday", label: "Midday" },
                                      { id: "afternoon", label: "Afternoon" },
                                      { id: "sunset", label: "Sunset" },
                                      { id: "night", label: "Night Hike" },
                                    ],
                                  },
                                },
                              },
                              { id: "long", label: "4-6 hours" },
                              { id: "fullday", label: "Full Day" },
                              { id: "multi", label: "Multi-Day" },
                            ],
                          },
                        },
                      },
                      { id: "expert", label: "Expert Level",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What duration are you looking for?",
                            options: [
                              {
                                id: "fullday",
                                label: "Full Day",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Do you need a guide?",
                                    options: [
                                      { id: "guide", label: "Professional Guide" },
                                      { id: "self", label: "Self-Guided" },
                                      { id: "group", label: "Group Expedition" },
                                      { id: "custom", label: "Custom Arrangement" },
                                      { id: "training", label: "With Training Session" }
                                    ]
                                  }
                                }
                              },
                              { id: "multi", label: "Multi-Day" },
                              { id: "expedition", label: "Expedition (7+ days)" },
                              { id: "challenge", label: "Technical Challenge" }
                            ]
                          }
                        }
                      },
                      { id: "mixed", label: "Mixed Difficulty" },
                    ],
                  },
                },
              },
              { id: "water", label: "Water Sports",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of water activity?",
                    options: [
                      {
                        id: "kayaking",
                        label: "Kayaking",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What duration would you prefer?",
                            options: [
                              {
                                id: "short",
                                label: "1-2 hours",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "What time of day?",
                                    options: [
                                      { id: "morning", label: "Morning" },
                                      { id: "afternoon", label: "Afternoon" },
                                      { id: "sunset", label: "Sunset" },
                                      { id: "fullday", label: "Full Day" },
                                    ],
                                  },
                                },
                              },
                              { id: "halfday", label: "Half Day" },
                              { id: "fullday", label: "Full Day" },
                              { id: "multi", label: "Multi-Day Trip" },
                            ],
                          },
                        },
                      },
                      { id: "surfing", label: "Surfing",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What's your experience level?",
                            options: [
                              {
                                id: "beginner",
                                label: "Beginner",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "What type of lesson?",
                                    options: [
                                      { id: "private", label: "Private Lesson" },
                                      { id: "group", label: "Group Class" },
                                      { id: "semi", label: "Semi-Private" },
                                      { id: "camp", label: "Surf Camp" },
                                      { id: "trial", label: "Trial Lesson" }
                                    ]
                                  }
                                }
                              },
                              { id: "intermediate", label: "Intermediate" },
                              { id: "advanced", label: "Advanced" },
                              { id: "pro", label: "Professional" }
                            ]
                          }
                        }
                      },
                      { id: "snorkeling", label: "Snorkeling",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Choose your experience:",
                            options: [
                              {
                                id: "guided",
                                label: "Guided Tour",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Additional preferences?",
                                    options: [
                                      { id: "photo", label: "With Photography" },
                                      { id: "gear", label: "Equipment Included" },
                                      { id: "boat", label: "Boat Trip" },
                                      { id: "beach", label: "Beach Access" },
                                      { id: "combo", label: "Combo Package" }
                                    ]
                                  }
                                }
                              },
                              { id: "self", label: "Self-Guided" },
                              { id: "lesson", label: "With Lesson" },
                              { id: "rental", label: "Equipment Rental" }
                            ]
                          }
                        }
                      },
                      { id: "rafting", label: "White Water Rafting",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Choose difficulty level:",
                            options: [
                              {
                                id: "beginner",
                                label: "Beginner (Class I-II)",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Trip duration?",
                                    options: [
                                      { id: "half", label: "Half Day" },
                                      { id: "full", label: "Full Day" },
                                      { id: "multi", label: "Multi-Day" },
                                      { id: "training", label: "With Training" },
                                      { id: "family", label: "Family Trip" }
                                    ]
                                  }
                                }
                              },
                              { id: "intermediate", label: "Intermediate (Class III)" },
                              { id: "advanced", label: "Advanced (Class IV)" },
                              { id: "expert", label: "Expert (Class V)" }
                            ]
                          }
                        }
                      },
                      { id: "sailing", label: "Sailing",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Type of sailing experience?",
                            options: [
                              {
                                id: "cruise",
                                label: "Leisure Cruise",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Additional options?",
                                    options: [
                                      { id: "sunset", label: "Sunset Sail" },
                                      { id: "lunch", label: "With Lunch" },
                                      { id: "private", label: "Private Charter" },
                                      { id: "group", label: "Group Tour" },
                                      { id: "learn", label: "Learning Experience" }
                                    ]
                                  }
                                }
                              },
                              { id: "lesson", label: "Sailing Lesson" },
                              { id: "race", label: "Racing Experience" },
                              { id: "yacht", label: "Yacht Charter" }
                            ]
                          }
                        }
                      },
                    ],
                  },
                },
              },
              { id: "climbing", label: "Rock Climbing",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What's your experience level?",
                    options: [
                      {
                        id: "beginner",
                        label: "Beginner",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What type of climbing?",
                            options: [
                              {
                                id: "indoor",
                                label: "Indoor Climbing",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Would you like instruction?",
                                    options: [
                                      { id: "private", label: "Private Lesson" },
                                      { id: "group", label: "Group Class" },
                                      { id: "self", label: "Self-Guided" },
                                      { id: "rental", label: "Equipment Rental Only" },
                                      { id: "package", label: "Complete Package" }
                                    ]
                                  }
                                }
                              },
                              { id: "bouldering", label: "Bouldering" },
                              { id: "toprope", label: "Top Rope" },
                              { id: "outdoor", label: "Outdoor Basics" }
                            ]
                          }
                        }
                      },
                      { id: "intermediate", label: "Intermediate",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What type of climbing?",
                            options: [
                              {
                                id: "sport",
                                label: "Sport Climbing",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Additional services needed?",
                                    options: [
                                      { id: "gear", label: "Gear Rental" },
                                      { id: "guide", label: "With Guide" },
                                      { id: "partner", label: "Partner Matching" },
                                      { id: "transport", label: "Transportation" },
                                      { id: "course", label: "Technique Course" }
                                    ]
                                  }
                                }
                              },
                              { id: "trad", label: "Traditional Climbing" },
                              { id: "boulder", label: "Bouldering" },
                              { id: "multi", label: "Multi-pitch" }
                            ]
                          }
                        }
                      },
                      { id: "advanced", label: "Advanced",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Choose your challenge:",
                            options: [
                              {
                                id: "project",
                                label: "Project Routes",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Support services?",
                                    options: [
                                      { id: "coaching", label: "Technical Coaching" },
                                      { id: "video", label: "Video Analysis" },
                                      { id: "spotter", label: "Professional Spotter" },
                                      { id: "equipment", label: "Advanced Equipment" },
                                      { id: "custom", label: "Custom Support" }
                                    ]
                                  }
                                }
                              },
                              { id: "competition", label: "Competition Training" },
                              { id: "expedition", label: "Climbing Expedition" },
                              { id: "alpine", label: "Alpine Routes" }
                            ]
                          }
                        }
                      },
                      { id: "expert", label: "Expert" }
                    ]
                  }
                }
              },
              { id: "cycling", label: "Mountain Biking",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of trail do you prefer?",
                    options: [
                      {
                        id: "crosscountry",
                        label: "Cross Country",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "How long would you like to ride?",
                            options: [
                              {
                                id: "short",
                                label: "1-2 hours",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Do you need equipment?",
                                    options: [
                                      { id: "fullrental", label: "Full Bike & Gear Rental" },
                                      { id: "bikeonly", label: "Bike Rental Only" },
                                      { id: "gearonly", label: "Safety Gear Only" },
                                      { id: "own", label: "Have Own Equipment" },
                                      { id: "guide", label: "Guide & Equipment" }
                                    ]
                                  }
                                }
                              },
                              { id: "halfday", label: "Half Day" },
                              { id: "fullday", label: "Full Day" },
                              { id: "multi", label: "Multi-Day Trip" }
                            ]
                          }
                        }
                      },
                      { id: "downhill", label: "Downhill",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Select your trail type:",
                            options: [
                              {
                                id: "beginner",
                                label: "Beginner Trails",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "What support do you need?",
                                    options: [
                                      { id: "instruction", label: "Basic Instruction" },
                                      { id: "equipment", label: "Full Equipment" },
                                      { id: "shuttle", label: "Shuttle Service" },
                                      { id: "guide", label: "Trail Guide" },
                                      { id: "package", label: "Complete Package" }
                                    ]
                                  }
                                }
                              },
                              { id: "intermediate", label: "Technical Trails" },
                              { id: "advanced", label: "Expert Runs" },
                              { id: "park", label: "Bike Park" }
                            ]
                          }
                        }
                      },
                      { id: "enduro", label: "Enduro",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Choose your adventure:",
                            options: [
                              {
                                id: "singleday",
                                label: "Single Day Ride",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Additional requirements?",
                                    options: [
                                      { id: "bike", label: "Enduro Bike Rental" },
                                      { id: "protection", label: "Protection Gear" },
                                      { id: "guide", label: "Local Guide" },
                                      { id: "transport", label: "Trail Transport" },
                                      { id: "maintenance", label: "Bike Maintenance" }
                                    ]
                                  }
                                }
                              },
                              { id: "multiday", label: "Multi-Day Trip" },
                              { id: "race", label: "Race Experience" },
                              { id: "training", label: "Skills Training" }
                            ]
                          }
                        }
                      },
                      { id: "scenic", label: "Scenic Routes",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Preferred scenery type:",
                            options: [
                              {
                                id: "coastal",
                                label: "Coastal Views",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Tour additions:",
                                    options: [
                                      { id: "photo", label: "Photo Stops" },
                                      { id: "picnic", label: "Picnic Package" },
                                      { id: "cultural", label: "Cultural Stops" },
                                      { id: "support", label: "Support Vehicle" },
                                      { id: "flexible", label: "Flexible Schedule" }
                                    ]
                                  }
                                }
                              },
                              { id: "mountain", label: "Mountain Views" },
                              { id: "countryside", label: "Countryside" },
                              { id: "urban", label: "Urban Scenic" }
                            ]
                          }
                        }
                      },
                      { id: "camping", label: "Camping",
                        nextQuestions: {
                          q3: {
                            id: "q3",
                            question: "What style of camping?",
                            options: [
                              {
                                id: "tent",
                                label: "Tent Camping",
                                nextQuestions: {
                                  q4: {
                                    id: "q4",
                                    question: "How many nights?",
                                    options: [
                                      {
                                        id: "onenight",
                                        label: "One Night",
                                        nextQuestions: {
                                          q5: {
                                            id: "q5",
                                            question: "What amenities do you need?",
                                            options: [
                                              { id: "basic", label: "Basic (Toilets Only)" },
                                              { id: "standard", label: "Standard (Toilets & Showers)" },
                                              { id: "comfort", label: "Comfort (Full Facilities)" },
                                              { id: "luxury", label: "Luxury Camping" },
                                              { id: "primitive", label: "No Amenities" }
                                            ]
                                          }
                                        }
                                      },
                                      { id: "weekend", label: "Weekend" },
                                      { id: "extended", label: "3-5 Days" },
                                      { id: "week", label: "Week or More" }
                                    ]
                                  }
                                }
                              },
                              { id: "rv", label: "RV Camping",
                                nextQuestions: {
                                  q4: {
                                    id: "q4",
                                    question: "RV site preference:",
                                    options: [
                                      {
                                        id: "full",
                                        label: "Full Hookup",
                                        nextQuestions: {
                                          q5: {
                                            id: "q5",
                                            question: "Additional amenities:",
                                            options: [
                                              { id: "wifi", label: "WiFi Access" },
                                              { id: "clubhouse", label: "Clubhouse Access" },
                                              { id: "activities", label: "Organized Activities" },
                                              { id: "laundry", label: "Laundry Facilities" },
                                              { id: "store", label: "Camp Store" }
                                            ]
                                          }
                                        }
                                      },
                                      { id: "partial", label: "Partial Hookup" },
                                      { id: "basic", label: "Basic Site" },
                                      { id: "luxury", label: "Luxury RV Resort" }
                                    ]
                                  }
                                }
                              },
                              { id: "glamping", label: "Glamping" },
                              { id: "backcountry", label: "Backcountry" }
                            ]
                          }
                        }
                      },
                    ]
                  }
                }
              },
            ]
          },
        },
      },
      {
        id: "culture",
        label: "Cultural & Arts",
        nextQuestions: {
          q2: {
            id: "q2",
            question: "Which cultural aspects interest you most?",
            options: [
              {
                id: "museums",
                label: "Museums & Galleries",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of art interests you?",
                    options: [
                      {
                        id: "modern",
                        label: "Modern Art",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "How much time do you want to spend?",
                            options: [
                              {
                                id: "quick",
                                label: "Quick Visit (1-2 hrs)",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question:
                                      "Would you like additional activities?",
                                    options: [
                                      { id: "guided", label: "Guided Tour" },
                                      { id: "workshop", label: "Art Workshop" },
                                      {
                                        id: "lecture",
                                        label: "Artist Lecture",
                                      },
                                      { id: "shopping", label: "Gift Shop" },
                                      { id: "cafe", label: "Museum Café" },
                                    ],
                                  },
                                },
                              },
                              { id: "half", label: "Half Day" },
                              { id: "full", label: "Full Day" },
                              { id: "multiple", label: "Multiple Visits" },
                              { id: "membership", label: "Get Membership" },
                            ],
                          },
                        },
                      },
                      { id: "classical", label: "Classical Art" },
                      { id: "contemporary", label: "Contemporary" },
                      { id: "photography", label: "Photography" },
                      { id: "mixed", label: "Mixed Media" },
                    ],
                  },
                },
              },
              { id: "historical", label: "Historical Sites",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of historical site?",
                    options: [
                      {
                        id: "ancient",
                        label: "Ancient Ruins",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "How would you like to explore?",
                            options: [
                              {
                                id: "guided",
                                label: "Guided Tour",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Tour duration preference?",
                                    options: [
                                      { id: "short", label: "1-2 Hours" },
                                      { id: "medium", label: "Half Day" },
                                      { id: "full", label: "Full Day" },
                                      { id: "private", label: "Private Tour" },
                                      { id: "group", label: "Group Tour" }
                                    ]
                                  }
                                }
                              },
                              { id: "self", label: "Self-Guided" },
                              { id: "virtual", label: "Virtual Tour" },
                              { id: "photo", label: "Photography Tour" }
                            ]
                          }
                        }
                      },
                      { id: "medieval", label: "Medieval Sites" },
                      { id: "religious", label: "Religious Sites" },
                      { id: "military", label: "Military History" }
                    ]
                  }
                }
              },
              { id: "local", label: "Local Traditions",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What aspects interest you most?",
                    options: [
                      {
                        id: "customs",
                        label: "Local Customs",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "How would you like to experience this?",
                            options: [
                              {
                                id: "workshop",
                                label: "Interactive Workshop",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Group size preference?",
                                    options: [
                                      { id: "private", label: "Private Session" },
                                      { id: "small", label: "Small Group (2-5)" },
                                      { id: "medium", label: "Medium Group (6-10)" },
                                      { id: "large", label: "Large Group (11+)" },
                                      { id: "family", label: "Family Session" }
                                    ]
                                  }
                                }
                              },
                              { id: "demonstration", label: "Demonstration" },
                              { id: "participation", label: "Active Participation" },
                              { id: "observation", label: "Observation Only" }
                            ]
                          }
                        }
                      },
                      { id: "dance", label: "Traditional Dance" },
                      { id: "music", label: "Folk Music" },
                      { id: "ceremony", label: "Ceremonies" }
                    ]
                  }
                }
              },
              { id: "festivals", label: "Festivals & Events",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of festival?",
                    options: [
                      {
                        id: "cultural",
                        label: "Cultural Festival",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "When do you want to attend?",
                            options: [
                              {
                                id: "daytime",
                                label: "Daytime Events",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "What's your participation level?",
                                    options: [
                                      { id: "spectator", label: "Watch Only" },
                                      { id: "partial", label: "Some Participation" },
                                      { id: "full", label: "Full Participation" },
                                      { id: "vip", label: "VIP Experience" },
                                      { id: "backstage", label: "Behind the Scenes" }
                                    ]
                                  }
                                }
                              },
                              { id: "evening", label: "Evening Events" },
                              { id: "fullday", label: "Full Day" },
                              { id: "multiday", label: "Multiple Days" }
                            ]
                          }
                        }
                      },
                      { id: "music", label: "Music Festival" },
                      { id: "food", label: "Food Festival" },
                      { id: "seasonal", label: "Seasonal Events" }
                    ]
                  }
                }
              },
              { id: "crafts", label: "Arts & Crafts",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of craft interests you?",
                    options: [
                      {
                        id: "pottery",
                        label: "Pottery Making",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Choose your experience level:",
                            options: [
                              {
                                id: "beginner",
                                label: "Beginner",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Select your class format:",
                                    options: [
                                      { id: "single", label: "Single Class" },
                                      { id: "series", label: "Class Series" },
                                      { id: "workshop", label: "Intensive Workshop" },
                                      { id: "private", label: "Private Lesson" },
                                      { id: "group", label: "Group Session" }
                                    ]
                                  }
                                }
                              },
                              { id: "intermediate", label: "Intermediate" },
                              { id: "advanced", label: "Advanced" },
                              { id: "master", label: "Master Class" }
                            ]
                          }
                        }
                      },
                      { id: "weaving", label: "Traditional Weaving" },
                      { id: "painting", label: "Local Painting" },
                      { id: "sculpture", label: "Sculpture" }
                    ]
                  }
                }
              },
            ],
          },
        },
      },
      {
        id: "food",
        label: "Food & Dining",
        nextQuestions: {
          q2: {
            id: "q2",
            question: "What's your preferred dining experience?",
            options: [
              {
                id: "local",
                label: "Local Street Food",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What's your spice preference?",
                    options: [
                      {
                        id: "mild",
                        label: "Mild",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What's your budget per meal?",
                            options: [
                              {
                                id: "budget",
                                label: "Under $10",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Preferred dining time?",
                                    options: [
                                      { id: "breakfast", label: "Breakfast" },
                                      { id: "lunch", label: "Lunch" },
                                      { id: "dinner", label: "Dinner" },
                                      { id: "latenight", label: "Late Night" },
                                      { id: "anytime", label: "Anytime" },
                                    ],
                                  },
                                },
                              },
                              { id: "mid", label: "$10-20" },
                              { id: "high", label: "$20-30" },
                              { id: "premium", label: "$30+" },
                              { id: "any", label: "Any Budget" },
                            ],
                          },
                        },
                      },
                      { id: "medium", label: "Medium" },
                      { id: "spicy", label: "Spicy" },
                      { id: "very", label: "Very Spicy" },
                      { id: "mixed", label: "Mixed" },
                    ],
                  },
                },
              },
              { id: "fine", label: "Fine Dining",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of cuisine?",
                    options: [
                      {
                        id: "international",
                        label: "International",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What's your preferred dining time?",
                            options: [
                              {
                                id: "dinner",
                                label: "Dinner",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Any dietary preferences?",
                                    options: [
                                      { id: "regular", label: "No Restrictions" },
                                      { id: "vegetarian", label: "Vegetarian" },
                                      { id: "vegan", label: "Vegan" },
                                      { id: "gluten", label: "Gluten-Free" },
                                      { id: "halal", label: "Halal" }
                                    ]
                                  }
                                }
                              },
                              { id: "lunch", label: "Lunch" },
                              { id: "brunch", label: "Weekend Brunch" },
                              { id: "tasting", label: "Tasting Menu" }
                            ]
                          }
                        }
                      },
                      { id: "french", label: "French" },
                      { id: "italian", label: "Italian" },
                      { id: "japanese", label: "Japanese" }
                    ]
                  }
                }
              },
              { id: "cafe", label: "Cafes & Bakeries",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What interests you most?",
                    options: [
                      {
                        id: "coffee",
                        label: "Coffee Specialist",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What's your coffee preference?",
                            options: [
                              {
                                id: "espresso",
                                label: "Espresso Based",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Additional options?",
                                    options: [
                                      { id: "pastry", label: "With Pastry" },
                                      { id: "breakfast", label: "With Breakfast" },
                                      { id: "light", label: "Light Snacks" },
                                      { id: "dessert", label: "With Dessert" },
                                      { id: "takeaway", label: "Takeaway" }
                                    ]
                                  }
                                }
                              },
                              { id: "filter", label: "Filter Coffee" },
                              { id: "cold", label: "Cold Brew" },
                              { id: "specialty", label: "Specialty Drinks" }
                            ]
                          }
                        }
                      },
                      { id: "bakery", label: "Fresh Bakery" },
                      { id: "brunch", label: "Brunch Spot" },
                      { id: "dessert", label: "Dessert Cafe" }
                    ]
                  }
                }
              },
              { id: "markets", label: "Food Markets",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of market experience?",
                    options: [
                      {
                        id: "local",
                        label: "Local Market",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What interests you most?",
                            options: [
                              {
                                id: "produce",
                                label: "Fresh Produce",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Would you like additional activities?",
                                    options: [
                                      { id: "tour", label: "Guided Tour" },
                                      { id: "tasting", label: "Food Tasting" },
                                      { id: "cooking", label: "Cooking Demo" },
                                      { id: "shopping", label: "Shopping Help" },
                                      { id: "photo", label: "Photo Tour" }
                                    ]
                                  }
                                }
                              },
                              { id: "prepared", label: "Prepared Foods" },
                              { id: "specialty", label: "Specialty Items" },
                              { id: "mixed", label: "Mixed Experience" }
                            ]
                          }
                        }
                      },
                      { id: "night", label: "Night Market" },
                      { id: "farmers", label: "Farmers Market" },
                      { id: "artisan", label: "Artisan Market" }
                    ]
                  }
                }
              },
              { id: "cooking", label: "Cooking Classes",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of cuisine?",
                    options: [
                      {
                        id: "local",
                        label: "Local Cuisine",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Class format preference?",
                            options: [
                              {
                                id: "hands-on",
                                label: "Hands-on Cooking",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Group size preference?",
                                    options: [
                                      { id: "private", label: "Private Class" },
                                      { id: "small", label: "Small Group (2-6)" },
                                      { id: "medium", label: "Medium Group (7-12)" },
                                      { id: "large", label: "Large Group (13+)" },
                                      { id: "family", label: "Family Class" }
                                    ]
                                  }
                                }
                              },
                              { id: "demo", label: "Demonstration" },
                              { id: "market", label: "Market to Kitchen" },
                              { id: "intensive", label: "Intensive Course" }
                            ]
                          }
                        }
                      },
                      { id: "international", label: "International" },
                      { id: "pastry", label: "Pastry & Baking" },
                      { id: "vegetarian", label: "Vegetarian" }
                    ]
                  }
                }
              },
            ],
          },
        },
      },
      {
        id: "relax",
        label: "Relaxation & Wellness",
        nextQuestions: {
          q2: {
            id: "q2",
            question: "How would you like to relax?",
            options: [
              {
                id: "spa",
                label: "Spa & Massage",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of treatment?",
                    options: [
                      {
                        id: "massage",
                        label: "Massage",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "How long would you like the session?",
                            options: [
                              {
                                id: "30min",
                                label: "30 Minutes",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Additional preferences?",
                                    options: [
                                      {
                                        id: "aromatherapy",
                                        label: "Aromatherapy",
                                      },
                                      { id: "music", label: "Calming Music" },
                                      {
                                        id: "quiet",
                                        label: "Complete Silence",
                                      },
                                      { id: "temp", label: "Warm Temperature" },
                                      { id: "dark", label: "Dim Lighting" },
                                    ],
                                  },
                                },
                              },
                              { id: "60min", label: "60 Minutes" },
                              { id: "90min", label: "90 Minutes" },
                              { id: "120min", label: "120 Minutes" },
                              { id: "package", label: "Full Package" },
                            ],
                          },
                        },
                      },
                      { id: "facial", label: "Facial" },
                      { id: "body", label: "Body Treatment" },
                      { id: "hydro", label: "Hydrotherapy" },
                      { id: "combo", label: "Combination" },
                    ],
                  },
                },
              },
              { id: "beach", label: "Beach Relaxation",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of beach experience?",
                    options: [
                      {
                        id: "private",
                        label: "Private Beach",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What amenities would you like?",
                            options: [
                              {
                                id: "cabana",
                                label: "Private Cabana",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Additional services?",
                                    options: [
                                      { id: "food", label: "Food & Beverage Service" },
                                      { id: "massage", label: "Beach Massage" },
                                      { id: "activities", label: "Water Activities" },
                                      { id: "butler", label: "Butler Service" },
                                      { id: "basic", label: "Basic Setup Only" }
                                    ]
                                  }
                                }
                              },
                              { id: "lounger", label: "Beach Loungers" },
                              { id: "umbrella", label: "Umbrella Setup" },
                              { id: "equipment", label: "Water Equipment" }
                            ]
                          }
                        }
                      },
                      { id: "public", label: "Public Beach" },
                      { id: "secluded", label: "Secluded Cove" },
                      { id: "resort", label: "Resort Beach" }
                    ]
                  }
                }
              },
              { id: "yoga", label: "Yoga & Meditation",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of practice?",
                    options: [
                      {
                        id: "hatha",
                        label: "Hatha Yoga",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Choose your session type:",
                            options: [
                              {
                                id: "private",
                                label: "Private Session",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Preferred location?",
                                    options: [
                                      { id: "indoor", label: "Indoor Studio" },
                                      { id: "beach", label: "Beach Session" },
                                      { id: "garden", label: "Garden Setting" },
                                      { id: "rooftop", label: "Rooftop" },
                                      { id: "poolside", label: "Poolside" }
                                    ]
                                  }
                                }
                              },
                              { id: "group", label: "Group Class" },
                              { id: "couple", label: "Couple's Session" },
                              { id: "workshop", label: "Workshop" }
                            ]
                          }
                        }
                      },
                      { id: "vinyasa", label: "Vinyasa Flow" },
                      { id: "meditation", label: "Meditation" },
                      { id: "mindfulness", label: "Mindfulness" }
                    ]
                  }
                }
              },
              { id: "nature", label: "Nature Retreats",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of retreat?",
                    options: [
                      {
                        id: "forest",
                        label: "Forest Retreat",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Duration of stay?",
                            options: [
                              {
                                id: "daytrip",
                                label: "Day Trip",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Include which activities?",
                                    options: [
                                      { id: "meditation", label: "Forest Meditation" },
                                      { id: "walking", label: "Nature Walking" },
                                      { id: "workshop", label: "Nature Workshop" },
                                      { id: "photography", label: "Nature Photography" },
                                      { id: "therapy", label: "Forest Therapy" }
                                    ]
                                  }
                                }
                              },
                              { id: "weekend", label: "Weekend Retreat" },
                              { id: "week", label: "Week-long Program" },
                              { id: "custom", label: "Custom Duration" }
                            ]
                          }
                        }
                      },
                      { id: "mountain", label: "Mountain Retreat" },
                      { id: "lakeside", label: "Lakeside Escape" },
                      { id: "eco", label: "Eco Lodge" }
                    ]
                  }
                }
              },
              { id: "thermal", label: "Thermal Springs",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of thermal experience?",
                    options: [
                      {
                        id: "private",
                        label: "Private Pool",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Additional treatments?",
                            options: [
                              {
                                id: "package",
                                label: "Spa Package",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Duration preference?",
                                    options: [
                                      { id: "hour2", label: "2 Hours" },
                                      { id: "hour4", label: "4 Hours" },
                                      { id: "halfday", label: "Half Day" },
                                      { id: "fullday", label: "Full Day" },
                                      { id: "custom", label: "Custom Package" }
                                    ]
                                  }
                                }
                              },
                              { id: "massage", label: "With Massage" },
                              { id: "facial", label: "With Facial" },
                              { id: "basic", label: "Pool Only" }
                            ]
                          }
                        }
                      },
                      { id: "public", label: "Public Springs" },
                      { id: "cave", label: "Cave Springs" },
                      { id: "outdoor", label: "Outdoor Springs" }
                    ]
                  }
                }
              }
            ],
          },
        },
      },
      {
        id: "nightlife",
        label: "Nightlife & Entertainment",
        nextQuestions: {
          q2: {
            id: "q2",
            question: "What's your ideal night out?",
            options: [
              {
                id: "bars",
                label: "Bars & Pubs",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What's your drink preference?",
                    options: [
                      {
                        id: "cocktails",
                        label: "Cocktails",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Preferred atmosphere?",
                            options: [
                              {
                                id: "upscale",
                                label: "Upscale Lounge",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question:
                                      "What time do you usually go out?",
                                    options: [
                                      {
                                        id: "early",
                                        label: "Early Evening (6-8pm)",
                                      },
                                      {
                                        id: "prime",
                                        label: "Prime Time (8-10pm)",
                                      },
                                      {
                                        id: "late",
                                        label: "Late Night (10pm-12am)",
                                      },
                                      {
                                        id: "afterhours",
                                        label: "After Hours (12am+)",
                                      },
                                      { id: "flexible", label: "Flexible" },
                                    ],
                                  },
                                },
                              },
                              { id: "casual", label: "Casual Bar" },
                              { id: "sports", label: "Sports Bar" },
                              { id: "live", label: "Live Music" },
                              { id: "outdoor", label: "Outdoor Seating" },
                            ],
                          },
                        },
                      },
                      { id: "beer", label: "Craft Beer" },
                      { id: "wine", label: "Wine Bar" },
                      { id: "spirits", label: "Spirits" },
                      { id: "mocktails", label: "Non-Alcoholic" },
                    ],
                  },
                },
              },
              { id: "clubs", label: "Nightclubs",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of nightclub?",
                    options: [
                      {
                        id: "dance",
                        label: "Dance Club",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Music preference?",
                            options: [
                              {
                                id: "electronic",
                                label: "Electronic/EDM",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Preferred experience?",
                                    options: [
                                      { id: "general", label: "General Admission" },
                                      { id: "vip", label: "VIP Table Service" },
                                      { id: "booth", label: "Private Booth" },
                                      { id: "guestlist", label: "Guest List Entry" },
                                      { id: "package", label: "Party Package" }
                                    ]
                                  }
                                }
                              },
                              { id: "hiphop", label: "Hip Hop/R&B" },
                              { id: "latin", label: "Latin Music" },
                              { id: "mixed", label: "Mixed Genre" }
                            ]
                          }
                        }
                      },
                      { id: "lounge", label: "Lounge Club" },
                      { id: "underground", label: "Underground Scene" },
                      { id: "mainstream", label: "Mainstream Club" }
                    ]
                  }
                }
              },
              { id: "live", label: "Live Music",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of live music?",
                    options: [
                      {
                        id: "jazz",
                        label: "Jazz Club",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Seating preference?",
                            options: [
                              {
                                id: "bar",
                                label: "Bar Seating",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Would you like dinner service?",
                                    options: [
                                      { id: "full", label: "Full Dinner Menu" },
                                      { id: "appetizers", label: "Light Bites Only" },
                                      { id: "drinks", label: "Drinks Only" },
                                      { id: "package", label: "Dinner & Show Package" },
                                      { id: "special", label: "Chef's Special Menu" }
                                    ]
                                  }
                                }
                              },
                              { id: "table", label: "Table Seating" },
                              { id: "stage", label: "Near Stage" },
                              { id: "private", label: "Private Area" }
                            ]
                          }
                        }
                      },
                      { id: "rock", label: "Rock Venue" },
                      { id: "acoustic", label: "Acoustic Sets" },
                      { id: "classical", label: "Classical Music" }
                    ]
                  }
                }
              },
              { id: "comedy", label: "Comedy Shows",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What type of comedy?",
                    options: [
                      {
                        id: "standup",
                        label: "Stand-up Comedy",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "Show time preference?",
                            options: [
                              {
                                id: "early",
                                label: "Early Show",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Seating section?",
                                    options: [
                                      { id: "front", label: "Front Row" },
                                      { id: "middle", label: "Middle Section" },
                                      { id: "back", label: "Back Section" },
                                      { id: "bar", label: "Bar Area" },
                                      { id: "booth", label: "Private Booth" }
                                    ]
                                  }
                                }
                              },
                              { id: "late", label: "Late Show" },
                              { id: "special", label: "Special Event" },
                              { id: "open-mic", label: "Open Mic Night" }
                            ]
                          }
                        }
                      },
                      { id: "improv", label: "Improv Show" },
                      { id: "sketch", label: "Sketch Comedy" },
                      { id: "variety", label: "Variety Show" }
                    ]
                  }
                }
              },
              { id: "rooftop", label: "Rooftop Lounges",
                nextQuestions: {
                  q3: {
                    id: "q3",
                    question: "What's your preferred atmosphere?",
                    options: [
                      {
                        id: "upscale",
                        label: "Upscale Lounge",
                        nextQuestions: {
                          q4: {
                            id: "q4",
                            question: "What's your group size?",
                            options: [
                              {
                                id: "couple",
                                label: "Date Night",
                                nextQuestions: {
                                  q5: {
                                    id: "q5",
                                    question: "Special requests?",
                                    options: [
                                      { id: "sunset", label: "Sunset Reservation" },
                                      { id: "romantic", label: "Romantic Setup" },
                                      { id: "window", label: "Window Table" },
                                      { id: "celebration", label: "Special Celebration" },
                                      { id: "regular", label: "Standard Seating" }
                                    ]
                                  }
                                }
                              },
                              { id: "small", label: "Small Group (3-6)" },
                              { id: "medium", label: "Medium Group (7-12)" },
                              { id: "large", label: "Large Group (13+)" }
                            ]
                          }
                        }
                      },
                      { id: "casual", label: "Casual Rooftop" },
                      { id: "pool", label: "Pool Lounge" },
                      { id: "restaurant", label: "Rooftop Restaurant" }
                    ]
                  }
                }
              }
            ],
          },
        },
      },
    ],
  },
};
