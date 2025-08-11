import { useEffect, useState } from 'react';

export type Country = {
  name: { common: string; official: string };
  cca2: string;
  flags: { png: string; svg: string; alt?: string };
};

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        console.log('Loading countries');

        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,cca2'
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data: Country[] = await res.json();
        setCountries(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { countries, loading, error };
};
