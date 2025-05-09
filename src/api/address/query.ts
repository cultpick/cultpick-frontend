import { getAddressList } from "@/api/address/api";
import { AddressResponse } from "@/api/address/type";
import { useQuery } from "@tanstack/react-query";

export const useAddress = () => {
  return useQuery<AddressResponse[]>({
    queryKey: ["address"],
    queryFn: () => getAddressList(),
  });
};

export const findAddressCode = (
  addressData: AddressResponse[] | undefined,
  address: string | null | undefined,
): string | null => {
  if (!addressData || !address) return null;

  const [regionName, subRegionName] = address.split(" ");
  const region = addressData.find((r) => r.name === regionName);
  if (!region) return null;

  const subRegion = region.subregions.find((sr) => sr.name === subRegionName);
  return subRegion?.code || null;
};
