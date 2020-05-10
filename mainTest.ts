import createGraphsFromFile from "./typescript_files/read_from_files";
import Graph from "./typescript_files/graph"
import {approx_t_tsp} from "./typescript_files/approx_t_tsp";

let x : Graph = createGraphsFromFile()[0];
let [mst, totalWeight] = approx_t_tsp(x);
console.log(totalWeight);
