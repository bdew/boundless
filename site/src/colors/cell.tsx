import React, { useMemo } from 'react';
import { ColorEntry, WorldColors } from './data/types';
import clsx from 'clsx';

interface Props {
    colors: Map<number, ColorEntry>;
    blocks: WorldColors;
    type: string;
    className?: string;
}

export const ColorCell: React.FC<Props> = ({ colors, blocks, type, className }) => {
    const myColor = useMemo(() => {
        if (!blocks[type]) return null;
        return colors.get(blocks[type]) || null;
    }, [colors, blocks, type])

    if (myColor)
        return <td className={clsx("colorCell", myColor.light ? 'lightColor' : 'darkColor', className)} style={{ backgroundColor: myColor.color }}>{myColor.name}</td>;
    else
        return <td>-</td>
}