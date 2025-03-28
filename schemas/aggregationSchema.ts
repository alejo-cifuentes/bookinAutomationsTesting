
import { z } from 'zod';

const moneySchema = z.object({
  currencyCode: z.string(),
  units: z.number(),
  nanos: z.number(),
});

export const aggregationSchema = z.object({
  totalCount: z.number(),
  filteredTotalCount: z.number(),
  stops: z.array(z.object({
    numberOfStops: z.number(),
    count: z.number(),
    minPrice: moneySchema,
    minPriceRound: moneySchema,
  })),
  airlines: z.array(z.object({
    name: z.string(),
    logoUrl: z.string().url(),
    iataCode: z.string(),
    count: z.number(),
    minPrice: moneySchema,
  })),
  departureIntervals: z.array(z.object({
    start: z.string(),
    end: z.string(),
  })),
  flightTimes: z.array(z.object({
    arrival: z.array(z.object({
      start: z.string(),
      end: z.string(),
      count: z.number(),
    })),
    departure: z.array(z.object({
      start: z.string(),
      end: z.string(),
      count: z.number(),
    })),
  })),
  shortLayoverConnection: z.object({
    count: z.number(),
  }),
  durationMin: z.number(),
  durationMax: z.number(),
  minPrice: moneySchema,
  minRoundPrice: moneySchema,
  minPriceFiltered: moneySchema,
  baggage: z.array(z.object({
    paramName: z.string(),
    count: z.number(),
    enabled: z.boolean(),
    baggageType: z.string(),
  })),
  budget: z.object({
    paramName: z.string(),
    min: moneySchema,
    max: moneySchema,
  }),
  budgetPerAdult: z.object({
    paramName: z.string(),
    min: moneySchema,
    max: moneySchema,
  }),
  duration: z.array(z.object({
    min: z.number(),
    max: z.number(),
    durationType: z.string(),
    enabled: z.boolean(),
    paramName: z.string(),
  })),
  airports: z.object({
    preferSameAirport: z.object({
      paramName: z.string(),
      enabled: z.boolean(),
      count: z.number(),
    }),
    byCity: z.array(z.object({
      city: z.object({
        code: z.string(),
        name: z.string(),
        translation: z.string(),
      }),
      airports: z.array(z.object({
        name: z.string(),
        iataCode: z.string(),
        translation: z.string(),
        paramName: z.string(),
        count: z.number(),
        minPrice: moneySchema,
      })),
    })),
    hasNearbyCityAirports: z.boolean(),
  }),
  filtersOrder: z.array(z.any()),
});
