import React, { useEffect, useState } from "react";
import './App.css';
import Table from 'react-bootstrap/Table';

import DataCell from "./components/DataCell";
import HeaderCell from "./components/HeaderCell";
import FileUploadPage from "./components/FileUploadPage";

function App() {
  const [dialectsData, setDialectsData] = useState([]);
  const [similarityFlag, setSimilarityFlag] = useState(false);
  const [similarityData, setSimilarityData] = useState([]);
  const [lastSelectedRowIndex, setLastSelectedRowIndex] = useState(null);
  const [similarityAdditionalInfo, setSimilarityAdditionalInfo] = useState([]);
  const [dropdownVal, setDropdownVal] = useState(1);

  const getDialectsData = () => {
    if (dropdownVal != 1) setDropdownVal(1);

    fetch('http://167.71.3.43:3001/dialects/list', {
      // fetch('http://localhost:3001/dialects/list', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    ).then(
      function (response) {
        console.log(response);
        return response.json();
      }
    ).then(
      function (myJson) {
        console.log(myJson);
        setDialectsData(myJson);
        calculateSimilarity();
      }
    );
  }

  const toggleSimilarity = () => {
      setSimilarityFlag(!similarityFlag);
  }

  const calculateSimilarity = (selectedIndex) => {
    if (dialectsData.data === undefined) return;
    if (dialectsData.data.length < 2) return;
    if (selectedIndex === null && lastSelectedRowIndex == null) return;
    if (selectedIndex === null) selectedIndex = lastSelectedRowIndex;

    setLastSelectedRowIndex(selectedIndex);


    let simData = [];
    let simAddInfo = [];
    dialectsData.data.slice(1).forEach(
      (row, i) => {
        let rowAddInfo = [];
        simData.push(calculateOneRowSimilarity(selectedIndex, i, rowAddInfo));
        simAddInfo.push(rowAddInfo);
      }
    );
    setSimilarityAdditionalInfo(simAddInfo);
    setSimilarityData(simData);
  }

  const calculateOneRowSimilarity = (selectedIndex, calculatingIndex, rowAddInfo) => {
    if (selectedIndex === calculatingIndex) {
      return similarityFlag ? 1.0 : 0.0;
    }

    let dataRows = dialectsData.data.slice(1);
    let selectedRow = dataRows[selectedIndex];
    let calculatingRow = dataRows[calculatingIndex];

    let numberOfMatches = 0;
    let numberOfQuestions = selectedRow.length - 1;
    rowAddInfo.push("");
    selectedRow.map(
      (item, i) => {
        if (i != 0) {
          if (item != "-" && item == calculatingRow[i]) {
            numberOfMatches++;
            rowAddInfo.push("green");
          } else {
            rowAddInfo.push("red");
          }
        }
      });

    let x = similarityFlag ? numberOfMatches : numberOfQuestions - numberOfMatches;
    return Math.round(x / numberOfQuestions * 100) / 100;
  }

  // const copySimilarityToClipboard = () => {
  //   console.log("copy similarity to clipboard");
  //   navigator.clipboard.writeText(similarityData.join("\n"));
  // }



  useEffect(() => {
    calculateSimilarity(null);
  }, [similarityFlag])

  useEffect(() => {
    getDialectsData();
  }, [dropdownVal])

  return (
    <div className="app">
      <div className="actionsHolder"></div>
      <Table striped bordered hover>
        <thead>
          {
            dialectsData.data && dialectsData.data.length > 0 && dialectsData.data.slice(0, 1).map(
              (row) =>
                <tr>
                  {
                    row.map(
                      (item, i) =>
                        <HeaderCell item={item} index={i} 
                                    similarityFlag={similarityFlag} 
                                    toggleSimilarity={toggleSimilarity}></HeaderCell>
                    )
                  }
                </tr>
            )
          }
        </thead>
        <tbody>
          {
            dialectsData.data && dialectsData.data.length > 0 && dialectsData.data.slice(1).map(
              (row, i) =>
                <tr onClick={() => calculateSimilarity(i)} className="clickable">
                  {
                    row.map(
                      (item, j) => <DataCell index={j} rowIndex={i} item={item} 
                                              similarity={similarityData[i]} 
                                              similarityAdditionalInfo={similarityAdditionalInfo[i]} ></DataCell>
                    )
                  }
                </tr>
            )
          }
        </tbody>
      </Table>

      <textarea id="clipboardDataHolder" value={similarityData.join("\n")} disabled="true" />
      <FileUploadPage getDialectsData={getDialectsData}></FileUploadPage>

    </div >
  );
  
}

export default App;