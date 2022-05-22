import { useEffect, useState } from 'react';
import { isTemplateTail } from 'typescript';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [getChosenId, setChousenId] = useState(-1);
    function idLabel(item: IItem) {
        setChousenId(item.id);
    }

    function inputKey(event: any) {
        if (event.target.value != '') {
            if (event.key == `Enter`) {
                props.initialData[getChosenId - 1].name = event.target.value;
                setChousenId(-1);
            } else if (event.key == `Escape`) {
                setChousenId(-1);
            }
        }
    }

    function data() {
        if (props.sorting == 'ASC') {
            console.log('asc');
            props.initialData.sort((a: IItem, b: IItem) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });
        } else {
            console.log('DESC');
            props.initialData.sort((a: IItem, b: IItem) => {
                if (a.id > b.id) {
                    return -1;
                }
                if (a.id < b.id) {
                    return 1;
                }
                return 0;
            });
        }
        return (
            <ol>
                {props.initialData.map((item: IItem) => {
                    if (getChosenId != item.id) {
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        idLabel(item);
                                    }}
                                >
                                    {item.name}
                                </button>
                            </li>
                        );
                    } else {
                        return (
                            <li key={item.id}>
                                <input
                                    onKeyUp={(event) => {
                                        inputKey(event);
                                    }}
                                    type="text"
                                    defaultValue={
                                        props.initialData[getChosenId - 1].name
                                    }
                                />
                            </li>
                        );
                    }
                })}
            </ol>
        );
    }

    return <div>{data()}</div>;
}
