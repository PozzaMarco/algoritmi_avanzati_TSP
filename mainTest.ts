import createGraphsFromFile from "./typescript_files/read_from_files";
import Graph from "./typescript_files/graph"
import GraphNode from "./typescript_files/graphNode";
import {approx_t_tsp} from "./typescript_files/approx_t_tsp";

let x : Graph = createGraphsFromFile()[0];
let f : GraphNode = x.getNodeList()[1];
let s : GraphNode = x.getNodeList()[2];

console.log(f)
console.log(s)
console.log(x.computeDistanceGEO(f,s))


