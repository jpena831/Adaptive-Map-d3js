window.onload=function() {
    var root = {
        "name": "Engineering Statics Content",
        "children": [
            {
                "name": "Background Topics",
                "children": [
                    {
                        "name": "Mechanics Basics",
                    "children": [
                        {
                            "name": "Bodies and Free Body Diagrams",
                            "size": 105,
                            "url": "http://adaptivemap.ma.psu.edu/websites/newtonian_mechanics/bodies_and_free_body_diagrams/bodies.html"
                        },
                        {
                            "name": "Newton's First Law",
                            "size": 74
                        },
                        {
                            "name": "Newton's Second Law",
                            "size": 96
                        },
                        {
                            "name": "Newton's Third Law",
                            "size": 80
                        }
                    ]
                },
                {
                    "name": "Vector and Matrix Math",
                    "children": [
                        {
                            "name": "Vector Decomposition",
                            "size": 93
                        },
                        {
                            "name": "Vector Addition",
                            "size": 93
                        },
                        {
                            "name": "Dot Product",
                            "size": 90
                        },
                        {
                            "name": "Cross Product",
                            "size": 80
                        },
                        {
                            "name": "Matrix Multiplication",
                            "size": 90
                        },
                        {
                            "name": "Matrix Equation",
                            "size": 75
                        }
                    ]
                },
                {
                    "name": "Moment Intergrals",
                    "children": [
                        {
                            "name": "Moment Integrals",
                            "size": 89
                        },
                        {
                            "name": "Centroids",
                            "size": 75
                        },
                        {
                            "name": "Centroids via the Method of Composite Parts",
                            "size": 150
                        },
                        {
                            "name": "Center of Mass",
                            "size": 175
                        },
                        {
                            "name": "Center of Mass via Composite Parts",
                            "size": 150
                        }
                    ]
                }
            ]
        },
        {
            "name": "Core Topics",
            "children": [
                {
                    "name": "Forces",
                    "children": [
                        {
                            "name": "Forces",
                            "size": 89
                        },
                        {
                            "name": "Point Forces",
                            "size": 74
                        },
                        {
                            "name": "Principle of Transmissibility",
                            "size": 85.25
                        },
                        {
                            "name": "Concurrent Forces",
                            "size": 45
                        },
                        {
                            "name": "Distributed Forces",
                            "size": 75
                        }
                    ]
                },
                {
                    "name": "Moments",
                    "children": [
                        {
                            "name": "Moments",
                            "size": 79
                        },
                        {
                            "name": "Moment About a Point",
                            "size": 70
                        },
                        {
                            "name": "Moment About an Axis",
                            "size": 76.75
                        },
                        {
                            "name": "Varignon's Theorem",
                            "size": 80
                        },
                        {
                            "name": "Couples",
                            "size": 65
                        }
                    ]
                },
                {
                    "name": "Static Equilibrium",
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
                    "name": "Statically Equivalent Systems",
                    "children": [
                        {
                            "name": "Statically Equivalent Systems",
                            "size": 72
                        },
                        {
                            "name": "Resolution of a Force into a Force and a Couple",
                            "size": 188
                        },
                        {
                            "name": "Equivalent Force Couple System",
                            "size": 149
                        }
                    ]
                }
            ]
        },
        {
            "name": "Advanced Topics",
            "children": [
                {
                    "name": "Structures",
                    "size": 721
                },
                {
                    "name": "Friction and Friction Applications",
                    "size": 721
                }
            ]
        },
        
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
      .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
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