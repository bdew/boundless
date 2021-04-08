import React from 'react';
import clsx from 'clsx';
import './switcher.css';

interface Props<T> {
    name: string;
    value: T;
    setValue: (v: T) => void;
    options: [T, string][];
}


export const Switcher: <T>(props: Props<T>) => React.ReactElement = ({ value, setValue, options, name }) => {
    return <div className="switcher">
        <div className="switcherName">{name}</div>
        {options.map(([val, name], num) => <div className={clsx('switcherOption', value === val && 'switcherSelected')} key={num} onClick={() => setValue(val)}>{name}</div>)}
    </div>
}