import React, { useState } from "react";
import Switch from 'react-bootstrap/Switch';

function HeaderCell(props) {
    
    if (props.index == 0)
        return <>
        <th>
            {props.item}
        </th>
        <th>
            {/* <Button variant="dark" size="sm" onClick={() => copySimilarityToClipboard()}>Copy</Button> */}
            <Switch label="Similarity" defaultChecked={props.similarityFlag} onClick={() => props.toggleSimilarity()} />
        </th>
        </>
    else
        return <th>{props.item}</th>
}

export default HeaderCell;