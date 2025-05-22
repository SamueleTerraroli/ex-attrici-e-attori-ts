type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: "American" | "British" | "Australian" | "Israeli-American" | "South African" | "French" | "Indian" | "Israeli" | "Spanish" | "South Korean" | "Chinese"

}

function isActress(data: unknown): data is Actress {
  return (
    typeof data === 'object' && data !== null &&
    "id" in data && typeof data.id === 'number' && //id
    "name" in data && typeof data.name === 'string' && //name
    "birth_year" in data && typeof data.birth_year === 'number' && //birth_year
    "death_year" in data && typeof data.death_year === 'number' && //death_year
    "biography" in data && typeof data.biography === 'string' && //biography
    "image" in data && typeof data.image === 'string' && //image
    "most_famous_movies" in data && data.most_famous_movies instanceof Array && data.most_famous_movies.length === 3 && data.most_famous_movies.every(m => typeof m === 'string') && //most famous
    "awards" in data && typeof data.awards === 'string' && //awards
    "nationality" in data && Array.isArray(data.nationality) && data.nationality.every(n => typeof n === 'string') //nationality
  )
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333//actresses/${id}`);
    const data: unknown = await response.json();
    if (!isActress(data)) {
      throw new Error('Formato dati non valido')
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Errore durante il recupero dei dati dell\'attrice', error);
    } else {
      console.error('Errore sconosciuto', error);
    }
    return null;
  }
}