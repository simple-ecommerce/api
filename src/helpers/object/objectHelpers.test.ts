import { toCamelCase, toSnakeCase } from "./objectHelpers";

interface Person {
  fullName: string;
  ageInYears: number;
  seasons: {
    launchYear: number;
    numericRepresentation: number;
  }[];
  companyDescription: {
    fullName: string;
    addressDescription: {
      streetName: string;
    };
  };
}

describe("object helper", () => {
  const snakeCase = {
    full_name: "Michael Scott",
    age_in_years: 40,
    seasons: [
      {
        launch_year: 2000,
        numeric_representation: 1,
      },
      {
        launch_year: 2001,
        numeric_representation: 2,
      },
    ],
    company_description: {
      full_name: "Dunder Mifflin",
      address_description: {
        street_name: "Cold Street",
      },
    },
  };
  const camelCase: Person = {
    fullName: "Michael Scott",
    ageInYears: 40,
    seasons: [
      {
        launchYear: 2000,
        numericRepresentation: 1,
      },
      {
        launchYear: 2001,
        numericRepresentation: 2,
      },
    ],
    companyDescription: {
      fullName: "Dunder Mifflin",
      addressDescription: {
        streetName: "Cold Street",
      },
    },
  };

  describe("#toCamelCase", () => {
    test("should transform keys into camel-case", () => {
      const value = toCamelCase<Person>(snakeCase);
      expect(value).toStrictEqual(camelCase);
    });
    test("should return null", () => {
      expect(toCamelCase(null)).toEqual(null);
    });
    test("should return undefined", () => {
      expect(toCamelCase(undefined)).toEqual(undefined);
    });
  });

  describe("#toSnakeCase", () => {
    test("should transform keys into snakeCase", () => {
      const value = toSnakeCase(camelCase);
      expect(value).toStrictEqual(snakeCase);
    });
    test("should return null", () => {
      expect(toSnakeCase(null)).toEqual(null);
    });
    test("should return undefined", () => {
      expect(toSnakeCase(undefined)).toEqual(undefined);
    });
  });
});
