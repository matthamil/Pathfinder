function generateMap(columns, rows = columns) {
  let map = document.querySelector('#map');

  let PathfinderMap = {
    columns: undefined,
    rows: undefined,
    nodes: [],
    init(columns, rows) {
      this.columns = columns;
      this.rows = rows;
    }
  };

  PathfinderMap.init(columns, rows);

  let Node = {
    // Dynamically setting the height & width of each node
    // Also initializes the coordinates
    init(x, y) {
      if (!this.element) {
        this.element = document.createElement('div');
        this.element.className = 'node';
        this.x = x;
        this.y = y;
        this.state = null;
        this.element.setAttribute('style',
          // The height and width is based off of
          // the vh and vw values on the #map in CSS.
          `height: ${parseFloat(80/this.columns)}vh;
           width: ${parseFloat(80/this.rows)}vh;`
        );
      } else {
        console.error('Node already defined: ', this);
      }
    }
  };

  // Delegate behaviors to PathfinderMap
  Object.setPrototypeOf(Node, PathfinderMap);

  // Initialize the PathfinderMap.nodes array
  for (let i = columns - 1; i > 0; i--) {
    PathfinderMap.nodes.unshift([]);
    for (let j = 0; j < rows; j++) {
      let node = Object.create(Node);

      // Storing the coordinates
      node.init(j, i);

      // Setting the coordinates as attributes
      node.element.setAttribute('x', j);
      node.element.setAttribute('y', i);

      // Click event handler
      node.element.addEventListener('mousedown', changeNodeState);

      // Click and drag event handler
      node.element.addEventListener('mouseover', changeNodeState);

      node.element.innerHTML = `${j},${i}`;

      // Saving the node in an array to be accessed later
      PathfinderMap.nodes[0].push(node);

      // Add the node to the DOM
      map.appendChild(node.element);
    }
  }

  console.log('%c' + 'Nodes created.', 'color: green; font-weight: bold');

  return PathfinderMap;
}

let gameMap = generateMap(10);

//
// Click Handlers and goodies
//

// Click Handlers:
// If current mouse state is tree,
//   When click div,
//   Check if div's state is undefined.
//   If div undefined,
//      Div is now a tree.
//      Graphic updated in div.
//      Div's state set to tree.

let currentState;
let startExists = false;
let startNode;
let goalExists = false;
let goalNode;
let selectedNode;

let isDown = false; // Tracks status of mouse button
$(document).mousedown(() => {
  isDown = true;
});
$(document).mouseup(() => {
  isDown = false;
});

function getTargetNode(x,y) {
  if((x >= 0 && x < gameMap.columns) && (y >= 0 && y < gameMap.rows)) {
    return gameMap.nodes[y-1][x];
  } else {
    return undefined;
  }
}

function changeNodeState(e) {
  if (isDown || e.type === 'mousedown') {
    if (!currentState) {
      console.error(`Current state is ${currentState}`);
      return;
    }

    clearPath();

    // Extracting the values of x and y
    // to find the element in the map.nodes array
    let x = e.target.getAttribute('x');
    let y = e.target.getAttribute('y');

    // Locate the clicked node in memory
    let target = getTargetNode(x, y);
    console.log(`x:${x},y:${y}`);
    console.dir(target);

    if (currentState !== 'deleteObject' && currentState !== 'select') {
      target.state = `${currentState}`;
      target.element.className = `node ${currentState}`;
      loseFocusOnSelected();
    }

    else if (currentState === 'select' && !selectedNode) {
      target.element.id = 'selected';
      selectedNode = target.element;
    }

    else if (selectedNode) {
      target.element.id = 'selected';
      selectedNode.id = '';
      selectedNode = target.element;
    }

    else {
      target.state = null;
      target.element.className = 'node';
    }

    if (startExists && currentState === 'start') {
      startNode.element.className = 'node';
      startNode.state = null;
      startNode = target;
    }

    else if (goalExists && currentState === 'goal') {
      goalNode.element.className = 'node';
      goalNode.state = null;
      goalNode = target;
    }

    if (!startExists && currentState === 'start') {
      startExists = true;
      startNode = target;
    }

    else if (!goalExists && currentState === 'goal') {
      goalExists = true;
      goalNode = target;
    }

    console.log('%c' + `Targeting: (${x},${y}) ==> state: ${target.state}`, 'color: orange; font-weight: bold');
  }
}

function clearPath() {
  let pathNodes = document.querySelectorAll('.path');
  pathNodes.forEach((node) => {
    node.classList = 'node';
  });
}

function setStateToSelect() {
  currentState = 'select';
}

function setStateToStart() {
  currentState = 'start';
  clearPath();
}

function setStateToGoal() {
  currentState = 'goal';
  clearPath();
}

function setStateToTree() {
  currentState = 'tree';
  clearPath();
}

function setStateToWall() {
  currentState = 'wall';
  clearPath();
}

function setStateToWater() {
  currentState = 'water';
  clearPath();
}

function resetMap() {
  let currentMap = document.querySelector('#map');

  while (currentMap.firstChild) {
    currentMap.removeChild(currentMap.firstChild);
  }

  gameMap = generateMap(10);
}

function setStateToDeleteObject() {
  currentState = 'deleteObject';
}

function loseFocusOnSelected() {
  if (selectedNode) {
    selectedNode.id = '';
  }
  selectedNode = undefined;
}

let playButton = document.querySelector('.fa-play-circle-o');
let defaultTool = document.querySelector('.fa-mouse-pointer');
let startTool = document.querySelector('.start-ui-button');
let goalTool = document.querySelector('.goal-ui-button');
let treeTool = document.querySelector('.tree-ui-button');
let wallTool = document.querySelector('.wall-ui-button');
let waterTool = document.querySelector('.water-ui-button');
let deleteObjectTool = document.querySelector('.fa-trash');
let reset = document.querySelector('.restart-ui-button');

playButton.addEventListener('click', searchForGoal);
defaultTool.addEventListener('click', setStateToSelect);
startTool.addEventListener('click', setStateToStart);
goalTool.addEventListener('click', setStateToGoal);
treeTool.addEventListener('click', setStateToTree);
wallTool.addEventListener('click', setStateToWall);
waterTool.addEventListener('click', setStateToWater);
reset.addEventListener('click', resetMap);
deleteObjectTool.addEventListener('click', setStateToDeleteObject);

// Global Event Listeners
document.addEventListener('keydown', (e) => {
  // Enter Key
  if (e.keyCode === 13) {
    currentState = null;
    loseFocusOnSelected();
  }

  // Backspace Key
  else if (e.keyCode === 8) {
    if (selectedNode) {
      selectedNode.state = null;
      selectedNode.classList = 'node';
      loseFocusOnSelected();
    }

    else {
      currentState = 'deleteObject';
    }
  }
});

function searchForGoal() {
  console.log(startNode);
  showPath(breadthFirstSearch(startNode, goalTest, actions, successor));
}

function showPath(path) {
  if (!path) { alert('Your adventurer\'s path is blocked!')}
  path.pop();
  let currentNode = startNode;
  let nodePath = [];

  path.forEach((direction) => {
    if (direction === 'up') {
      currentNode = getTargetNode(currentNode.x, currentNode.y+1);
      nodePath.push(currentNode.element);
    }

    else if (direction === 'left') {
      currentNode = getTargetNode(currentNode.x-1, currentNode.y);
      nodePath.push(currentNode.element);
    }

    else if (direction === 'right') {
      currentNode = getTargetNode(currentNode.x+1, currentNode.y);
      nodePath.push(currentNode.element);
    }

    else if (direction === 'down') {
      currentNode = getTargetNode(currentNode.x, currentNode.y-1);
      nodePath.push(currentNode.element);
    }
  });

  nodePath.forEach((node) => {
    node.classList += ' path';
  });
}
