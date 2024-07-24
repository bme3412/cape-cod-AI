// This is a mock API service. In a real app, this would make actual API calls.
const data = {
    hero: {
      title: "Discover the Magic of Cape Cod",
      description: "Your personal guide to the best beaches, restaurants, and hidden gems",
      image: "/images/cape-cod-hero.jpg"
    },
    features: [
      { title: "Local Expertise", description: "Curated by Cape Cod natives who know every hidden gem" },
      { title: "Customizable Plans", description: "Tailor your itinerary to fit your interests and schedule" },
      { title: "Up-to-Date Information", description: "Always current with the latest attractions and seasonal events" }
    ],
    featuredTown: {
      name: "Barnstable",
      description: "Explore the largest community on Cape Cod, from its pristine beaches to its charming villages.",
      image: "/images/barnstable/barnstable-preview.jpg"
    },
    testimonials: [
      { text: "This itinerary made our Cape Cod vacation unforgettable!", author: "Sarah T." },
      { text: "We discovered places we never knew existed. Truly amazing!", author: "Mike R." }
    ]
  };
  
  export async function getHomePageData() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return data;
  }
  
  export async function getTownData(townName) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would fetch data for the specific town
    return {
      name: townName,
      description: `Explore the beautiful town of ${townName}`,
      attractions: [
        { name: "Beach", description: "A beautiful beach" },
        { name: "Restaurant", description: "A delicious restaurant" }
      ]
    };
  }