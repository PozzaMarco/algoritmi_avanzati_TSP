//========================================================================================
/*                                                                                      *
 * Metodi utilizzati per la lettura e gestione delle informazioni che compongono        *
 * il dataset di grafi reso disponibile in formato .txt.                                *
 *                                                                                      */
//========================================================================================
import fs from "fs";
import Graph from "./graph";

//──── Methods ───────────────────────────────────────────────────────────────────────────
function getFileNames(): Array<string> {
  let fileNameList: Array<string> = new Array();

  fs.readdirSync("tsp_dataset_test").forEach((fileName) => {
    fileNameList.push(fileName);
  });
  return fileNameList;
}

function createGraphsFromFile() {
  let fileNameList = getFileNames();
  let graphList = new Array<Graph>();

  fileNameList.forEach((graphFileName) => {
    let graph = new Graph();

    let graphDescription = fs.readFileSync(
      "tsp_dataset_test/" + graphFileName,
      "utf8"
    );
    
    graph.createFromFile(graphDescription);
    
    graphList.push(graph);
  });
  return graphList;
}

export default createGraphsFromFile