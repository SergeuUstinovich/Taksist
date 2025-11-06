import { useQuery } from "@tanstack/react-query";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useMemo, useState } from "react";
import { createSession, mainInfo } from "../api/main";

export function useQueryMain() {
  const [startInit, setStartInit] = useState(false);
  const { initDataRaw } = useMemo(() => retrieveLaunchParams(), []);

  const createSessionQuery = useQuery({
    queryKey: ["createSession"],
    queryFn: () => createSession(initDataRaw),
    enabled: false,
  });

  useEffect(() => {
    if (createSessionQuery.isSuccess) {
      setStartInit(true);
    }
  }, [createSessionQuery.isSuccess]);

  const mainInfoQuery = useQuery({
    queryKey: ["info"],
    queryFn: () => mainInfo(),
    enabled: startInit,
  });

  return {
    createSessionQuery,
    mainInfoQuery,
  };
}
