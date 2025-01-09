import { useRouter } from "next/navigation";

export const handleNavigation = (
  router: ReturnType<typeof useRouter>,
  setActiveButton: (button: string) => void,
  button: string,
  path: string,
) => {
  setActiveButton(button);
  router.push(path);
};
