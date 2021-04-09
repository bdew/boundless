import { useMemo } from "react";
import { useLocation } from "react-router";

export function useQuery(key: string): string | null {
    const location = useLocation();
    return useMemo(() => new URLSearchParams(location.search).get(key), [location.search, key]);
}
