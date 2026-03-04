import { useAuthStore } from "@/presentation/user/authStore";
import { useEffect, useState } from "react";

export function useUserMenu() {
  const { user, centerSelected, setCenterSelected } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [showCenterSelection, setShowCenterSelection] = useState(false);
  const [availableCenters, setAvailableCenters] = useState<string[]>([]);

  useEffect(() => {
    const adjustedCenters = user?.roles.map((role) => role.split(':')[2]);
    if(adjustedCenters) {
      setAvailableCenters(adjustedCenters);
    }
  }, [user?.roles]);

  function handleSelectCenter(center: string) {
    setCenterSelected(center);
    setIsOpen(false);
  }
  

  return {
    isOpen,
    setIsOpen,
    centerSelected,
    handleSelectCenter,
    showCenterSelection,
    setShowCenterSelection,
    availableCenters,
    setAvailableCenters,
  }
}