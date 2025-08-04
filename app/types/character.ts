// types/character.ts

export interface Character {
  id: number;
  name: string;
  images: string[]; // масив рядків URL

  debut?: {
    manga?: string;
    anime?: string;
    novel?: string;
    movie?: string;
    game?: string;
    ova?: string;
    appearsIn?: string;
  };

  family?: {
    father?: string;
    mother?: string;
    son?: string;
    daughter?: string;
    wife?: string;
    'adoptive son'?: string;
    godfather?: string;
  };

  jutsu?: string[];

  natureType?: string[];

  personal?: {
    birthdate?: string;
    sex?: string;
    age?: {
      'Part I'?: string;
      'Part II'?: string;
      'Academy Graduate'?: string;
    };
    height?: {
      'Part I'?: string;
      'Part II'?: string;
      'Blank Period'?: string;
    };
    weight?: {
      'Part I'?: string;
      'Part II'?: string;
    };
    bloodType?: string;
    kekkeiGenkai?: string[];
    classification?: string[];
    tailedBeast?: string;
    occupation?: string[];
    affiliation?: string[];
    team?: string[];
    clan?: string;
    titles?: string[];
  };

  rank?: {
    ninjaRank?: {
      'Part I'?: string;
      Gaiden?: string;
    };
    ninjaRegistration?: string;
  };

  tools?: string[];

  voiceActors?: {
    japanese?: string[];
    english?: string[];
  };
}

export interface CharactersApiResponse {
  characters: Character[];
  currentPage: number;
  pageSize: number;
  total: number;
}
