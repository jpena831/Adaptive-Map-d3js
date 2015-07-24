window.onload=function() {
    var root = {
        "name": "Background Topics",
        "children": [
            {
                "name": "Mechanics Basics",
                "children": [
                    {
                        "name": "GU001 group I",
                    "children": [
                        {
                            "name": "CT101 Computing Systems",
                            "size": 93
                        },
                        {
                            "name": "CT102 Algorithms & Information Systems",
                            "size": 74
                        },
                        {
                            "name": "EE130 Fundamentals of Electrical & Electronic Engineering I",
                            "size": 96
                        },
                        {
                            "name": "TOTAL 87.17",
                            "size": 87.17
                        }
                    ]
                },
                {
                    "name": "GU002 group II",
                    "children": [
                        {
                            "name": "CT103 Programming",
                            "size": 93
                        },
                        {
                            "name": "TOTAL 93",
                            "size": 93
                        }
                    ]
                },
                {
                    "name": "GU002 group III",
                    "children": [
                        {
                            "name": "MA190 Mathematics (Honours)",
                            "size": 68
                        },
                        {
                            "name": "PH108 Physics",
                            "size": 75
                        },
                        {
                            "name": "TOTAL 70.33",
                            "size": 70.33
                        }
                    ]
                },
                {
                    "name": "GU004 group IV",
                    "children": [
                        {
                            "name": "CT108 Next-Generation Technologies I",
                            "size": 85
                        },
                        {
                            "name": "TOTAL 85",
                            "size": 85
                        }
                    ]
                },
                {
                    "name": "YEAR TOTAL",
                    "children": [
                        {
                            "name": "TOTAL 82.85",
                            "size": 82.85
                        }
                    ]
                }
            ]
        },
        {
            "name": "year two",
            "children": [
                {
                    "name": "GU001 group I",
                    "children": [
                        {
                            "name": "CT216 Software Engineering I",
                            "size": 89
                        },
                        {
                            "name": "CT231 Professional Skills I",
                            "size": 74
                        },
                        {
                            "name": "TOTAL 85.25",
                            "size": 85.25
                        }
                    ]
                },
                {
                    "name": "GU002 group II",
                    "children": [
                        {
                            "name": "CT213 Computer Systems & Organization",
                            "size": 79
                        },
                        {
                            "name": "CT248 Introduction to Modelling",
                            "size": 70
                        },
                        {
                            "name": "TOTAL 76.75",
                            "size": 76.75
                        }
                    ]
                },
                {
                    "name": "GU002 group III",
                    "children": [
                        {
                            "name": "CT229 Programming II",
                            "size": 87
                        },
                        {
                            "name": "CT230 Database Systems I",
                            "size": 94
                        },
                        {
                            "name": "TOTAL 88.75",
                            "size": 88.75
                        }
                    ]
                },
                {
                    "name": "GU004 group VI",
                    "children": [
                        {
                            "name": "MA237 Statistics I",
                            "size": 72
                        },
                        {
                            "name": "MA238 Statistics II",
                            "size": 88
                        },
                        {
                            "name": "MA283 Algebra",
                            "size": 49
                        },
                        {
                            "name": "MA284 Discrete Mathematics",
                            "size": 87
                        },
                        {
                            "name": "MA286 Analysis I",
                            "size": 57
                        },
                        {
                            "name": "MA286 Analysis II",
                            "size": 29
                        },
                        {
                            "name": "TOTAL 61.63",
                            "size": 61.63
                        }
                    ]
                },
                {
                    "name": "TOTAL",
                    "children": [
                        {
                            "name": "TOTAL 74.80",
                            "size": 74.8
                        }
                    ]
                }
            ]
        },
        {
            "name": "year three",
            "children": [
                {
                    "name": "BEING GRADED",
                    "size": 721
                }
            ]
        },
        {
            "name": "year four",
            "children": [
                {
                    "name": "STARTING SEPTEMBER 2013",
                    "size": 8833
                }
            ]
        }
    ]
}

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;
    
var i = 0,
    duration = 750;
    

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

var svg = d3.select("#body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



  root.y0 = height / 2;
  root.x0 = 0;

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  root.children.forEach(collapse);
  update(root);


d3.select(self.frameElement).style("height", "800px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; });
      

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; }).on("click", click);;

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6)
      .attr("class", "hyper").on("click", clack);;

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}

function clack(d) {
  
  if (d.url == null) {
  }
  else {
      location.href = d.url;
  }


}
 }