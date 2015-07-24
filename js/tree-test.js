var treeData = [
  {
    "name": "Forces",
    "parent": "null",
    "children": [
      {
        "name": "Point Forces",
        "parent": "Forces",
        "children": [
          {
            "name": "Principal of Transmissibility",
            "parent": "Point Forces"
          },
          {
            "name": "Concurrent Forces",
            "parent": "Point Forces"
          }
        ]
      },
      {
        "name": "Distributed Forces",
        "parent": "Forces"
      }
    ]
  }
];

// ************** Generate the tree diagram	 *****************
var margin = {top: 40, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;
	
var i = 0;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.x, d.y]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
  
update(root);

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 100; });

  // Declare the nodes
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; });

  var text = nodeEnter.append("text")
	  //.attr("y", function(d) { return d.children || d._children ? -18 : 18; })
    .attr("y", "18")
	  .attr("dy", ".35em")
    .attr("text-anchor", "middle")
   	  //.attr("text-anchor", function(d) {return d.children || d._children ? "end" : "start";})
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1);

var bbox = text.node().getBBox();

  var rect = nodeEnter.append("rect")
	  .attr("height", 30)
    .attr("width", bbox.width)
    .attr("x", bbox.x)
	  //.style("fill", "#fff");
    .style("fill",function(d){return d._children ? "lightsteelblue" : "#FFF";})
    .style("fill-opacity", ".3");

  // Declare the linksâ€¦
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", diagonal);

}