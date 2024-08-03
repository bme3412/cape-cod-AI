// Import the rating schema
import ratingSchema from './rating_schema.json';

// Calculate the overall rating for a beach
export function calculateOverallRating(beach) {
  const categoryWeights = {
    environmental_factors: 0.25,
    facilities_and_services: 0.20,
    accessibility_and_safety: 0.15,
    recreational_opportunities: 0.15,
    natural_beauty_and_wildlife: 0.10,
    crowding_and_atmosphere: 0.10,
    environmental_protection: 0.05
  };

  let overallRating = 0;
  for (const [category, weight] of Object.entries(categoryWeights)) {
    overallRating += calculateCategoryRating(beach.ratings[category]) * weight;
  }

  return Math.round(overallRating * 100) / 100; // Round to 2 decimal places
}

// Calculate the rating for a specific category
function calculateCategoryRating(categoryRatings) {
  let total = 0;
  let count = 0;

  for (const [attribute, value] of Object.entries(categoryRatings)) {
    if (typeof value === 'number') {
      total += normalizeRating(value, ratingSchema[attribute]);
      count++;
    } else if (typeof value === 'object') {
      // For complex attributes like wave_conditions or food_and_drink_options
      for (const [subAttribute, subValue] of Object.entries(value)) {
        total += normalizeRating(subValue, ratingSchema[attribute][subAttribute]);
        count++;
      }
    }
  }

  return count > 0 ? total / count : 0;
}

// Normalize a rating value to a 0-100 scale
function normalizeRating(value, schema) {
  if (schema.min !== undefined && schema.max !== undefined) {
    return ((value - schema.min) / (schema.max - schema.min)) * 100;
  }
  return value; // If no min/max defined, assume it's already normalized
}

// Filter beaches based on criteria
export function filterBeaches(beaches, criteria) {
  return beaches.filter(beach => {
    for (const [criterion, value] of Object.entries(criteria)) {
      if (!meetsCriterion(beach, criterion, value)) {
        return false;
      }
    }
    return true;
  });
}

// Check if a beach meets a specific criterion
function meetsCriterion(beach, criterion, value) {
  const [category, attribute] = criterion.split('.');
  const rating = beach.ratings[category][attribute];

  if (typeof value === 'object') {
    if (value.min !== undefined && rating < value.min) return false;
    if (value.max !== undefined && rating > value.max) return false;
  } else {
    if (rating < value) return false;
  }

  return true;
}

// Example usage:
// const beaches = [/* array of beach objects */];
// const overallRatings = beaches.map(calculateOverallRating);
// const familyFriendlyBeaches = filterBeaches(beaches, { 'crowding_and_atmosphere.family_friendliness': { min: 80 } });