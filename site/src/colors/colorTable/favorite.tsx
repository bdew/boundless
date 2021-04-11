import React, { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

interface Props {
    favorite: boolean;
    setFavorite: (v: boolean) => void;
}

interface UseFavoritesResult {
    isFavorite: (id: number) => boolean;
    setFavorite: (id: number) => (v: boolean) => void;
}

export function useFavorites(): UseFavoritesResult {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);
    const setFavorite = useCallback((id: number) => (v: boolean) => {
        const updated = v ? [...favorites, id] : favorites.filter(x => x !== id);
        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated);
    }, [favorites]);

    return { isFavorite, setFavorite };
}

const useStyles = createUseStyles({
    cell: {
        cursor: "pointer",
        borderLeft: "none !important",
    },
    active: {
        color: "red",
    },
    inactive: {
        color: "#aaa",
        "&:hover": {
            color: "#444",
        },
    },
});

export const FavCell: React.FC<Props> = ({ favorite, setFavorite }) => {
    const classes = useStyles();
    return <td className={clsx(classes.cell, favorite ? classes.active : classes.inactive   )} onClick={() => setFavorite(!favorite)}>
        <svg height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
        </svg>
    </td>;
};
