function DataCell(props) {
    if (props.index == 0)
        return (
        <>
            <th>
            {props.item}
            </th>
            <th>
            {props.similarity}
            </th>
        </>
        )
    else
        return (<td className={
        props.similarityAdditionalInfo &&
            props.similarityAdditionalInfo.length > 0 ?
            ((props.similarityAdditionalInfo[props.index] == 'red') ? "redBox" : "greenBox") : undefined
        }>{props.item}</td>)
}

export default DataCell;