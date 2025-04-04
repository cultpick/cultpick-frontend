import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Subregion {
  code: string;
  name: string;
}

interface Region {
  code: string;
  name: string;
  subregions: Subregion[];
}

export const useAddress = () => {
  return useQuery<Region[]>({
    queryKey: ["address"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
      );
      return response.data;
    },
  });
};

export const findAddressCode = (
  addressData: Region[] | undefined,
  address: string | null,
): string | null => {
  if (!addressData || !address) return null;

  const [regionName, subRegionName] = address.split(" ");
  const region = addressData.find((r) => r.name === regionName);
  if (!region) return null;

  const subRegion = region.subregions.find((sr) => sr.name === subRegionName);
  return subRegion?.code || null;
};
