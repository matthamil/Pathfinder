/**
 * Nodes created during the search algorithms
 * constructor(action, state, parent) -> creates a search node
 * getPath() -> returns the path from root to node
 * getPathCost() -> returns path cost from root to node
 * inPath(state) -> returns true if a node is in the path, otherwise returns false
 **/

class searchNode {
  /**
   * Nodes created during the search.
   * this.action = the action taken to reach this node from the previous
   * this.state = the current location on the board
   * this.parent = the previous node in the search
   **/
  constructor(action, state, parent) {
    this.action = action;
    this.state = state;
    this.parent = parent;
  }

  // Returns a list of pairs containing the state and action
  // for each step of the path found
  getPath() {
    if (this.parent === null) {
      return [this.action];
    } else {
      return this.parent.getPath().concat(this.action);
    }
  }

  // Returns the path cost from root to node
  getPathCost() {
    if (this.parent === null) {
      return 0;
    } else {
      return this.parent.getPathCost() + this.action.cost;
    }
  }

  // Returns true if the state occurs anywhere in the path
  inPath(state) {
    if (state === this.state) {
      return true;
    }
    else if (this.parent === null) {
      return false;
    }
    else {
      return this.parent.inPath(state);
    }
  }
}


function breadthFirstSearch(initialState, goalTest, actions, successor) {
  // The fringe is a Queue
  // Actions other than push() and shift() are prohibited.
  let fringe = [];
  if (goalTest(initialState)) {
      console.log("Initial state is the goal state.");
      return [initialState];
  }

  // Add the initialState to the fringe.
  fringe.push(new searchNode(null, initialState, null));
  let expanded = [];
  while (fringe.length !== 0) {
    console.log("Fringe: " + fringe.map((node) =>
      `${node.x}, ${node.y}`));

    // Pop an element out of the queue to expand.
    let parent = fringe.shift();
    console.log("Popped: ", parent.state);
    let newChildStates = [];

    // Child states of the current node
    let actionsList = actions(parent.state);

    console.log(`Found ${actionsList.length} successors of (${parent.state.x},
      ${parent.state.y}): ${actionsList}`);

      // Add the node to the expanded list to prevent re-expansion.
      expanded.push(parent.state);
      console.log("Expanded list: ", expanded);
      console.log("\n");

      // Create successors of each node and push them onto the fringe.
      for (let i = 0; i < actionsList.length; i++) {
          let newS = successor(parent.state, actionsList[i]);
          let newN = new searchNode(actionsList[i], newS, parent);

          // If the goal is found,
          // returns the path to the goal.
          if (goalTest(newS)) {
              console.log("FOUND GOAL!", newS);
              return newN.getPath();
          }

          // If the successor is already expanded,
          // don't add it to the fringe.
          else if (expanded.indexOf(newS) !== -1) {
              console.log("Successor " + newS + " of " + parent.state + " already expanded.");
              console.log("Not adding " + newS + " to the fringe.");
              console.log("\n");
          }

          // If the successor is already in the fringe,
          // don't add it to the fringe again.
          else if (fringe.map(function(item){return item.state}).indexOf(newN.state) !== -1) {
              console.log(newS + " is already in the fringe.");
          }

          // Push new successors to the fringe.
          else {
              console.log("Discovered " + newN.state + " with step cost "
                  + actionsList[i].cost + " from " + parent.state);
              console.log("Pushing to fringe: " + newS);
              newChildStates.push(newS);
              fringe.push(newN);
              console.log("Path: ", newN.getPath());
              // console.log("Current fringe: " + fringe.map(function(city){
              //         return city.state;
              //     }));
              console.log("\n");
          }
      }
  }
}

function goalTest(node) {
  return node.state === 'goal';
}

function actions(node) {
  // Returns an array of available directions

  // Check for edges of board
  // Possible actions otherwise include:
  //   up, down, left, right
  //   (x, y + 1) (x, y - 1), (x - 1, y), (x + 1, y)
  //
  // Check for 'empty' OR 'goal'

  let map = gameMap.nodes;
  let actions = [];

  let x = node.x;
  let y = node.y;

  //**** Check for top row ****

  // Top left corner
  if (x === 0 && y === node.rows - 1) {
    // Check down and right
    if (!getTargetNode(x,y-1).state || getTargetNode(x,y-1).state === 'goal') {
      actions.push('down');
    }
    if (!getTargetNode(x+1,y).state || getTargetNode(x+1,y).state === 'goal') {
      actions.push('right');
    }
  }

  // Top right corner
  else if (x === node.columns - 1 && y === node.rows - 1) {
    // Check down and left
    if (!getTargetNode(x,y-1).state || getTargetNode(x,y-1).state === 'goal') {
      actions.push('down');
    }
    if (!getTargetNode(x-1,y).state || getTargetNode(x-1,y).state === 'goal') {
      actions.push('left');
    }
  }

  // Anywhere in top row
  else if (x >= 1 && x < node.columns - 1 && y === node.rows - 1) {
    // Check left, down, right
    if (!getTargetNode(x-1,y).state || getTargetNode(x-1,y).state === 'goal') {
      actions.push('left');
    }
    if (!getTargetNode(x,y-1).state || getTargetNode(x,y-1).state === 'goal') {
      actions.push('down');
    }
    if (!getTargetNode(x+1,y).state || getTargetNode(x+1,y).state === 'goal') {
      actions.push('right');
    }
  }

  //**** Check for bottom row ****

  // Bottom left corner
  else if (x === 0 && y === 1) {
    // Check up and right
    if (!getTargetNode(x+1,y).state || getTargetNode(x+1,y).state === 'goal') {
      actions.push('right');
    }
    if (!getTargetNode(x,y+1).state || getTargetNode(x,y+1).state === 'goal') {
      actions.push('up');
    }
  }

  // Bottom right corner
  else if (x === node.columns - 1 && y === 1) {
    // Check up and left
    if (!getTargetNode(x-1,y).state || getTargetNode(x-1,y).state === 'goal') {
      actions.push('left');
    }
    if (!getTargetNode(x,y+1).state || getTargetNode(x,y+1).state === 'goal') {
      actions.push('up');
    }
  }

  // Anywhere between bottom corners
  else if (x >= 0 && x < node.columns && node.y === 1) {
    // Check up, left, right
    if (!getTargetNode(x-1,y).state || getTargetNode(x-1,y).state === 'goal') {
      actions.push('left');
    }
    if (!getTargetNode(x+1,y).state || getTargetNode(x+1,y).state === 'goal') {
      actions.push('right');
    }
    if (!getTargetNode(x,y+1).state || getTargetNode(x,y+1).state === 'goal') {
      actions.push('up');
    }
  }

  //**** Check for left column ****
  else if (x === 0 && y > 0 && y <= node.rows - 2) {
    // Check right, up, down
    if (!getTargetNode(x,y-1).state || getTargetNode(x,y-1).state === 'goal') {
      actions.push('down');
    }
    if (!getTargetNode(x+1,y).state || getTargetNode(x+1,y).state === 'goal') {
      actions.push('right');
    }
    if (!getTargetNode(x,y+1).state || getTargetNode(x,y+1).state === 'goal') {
      actions.push('up');
    }
  }

  //**** Check for right column ****
  else if (x === node.columns - 1 && y > 0 && y <= node.rows - 1) {
    // Check left, up, down
    if (!getTargetNode(x-1,y).state || getTargetNode(x-1,y).state === 'goal') {
      actions.push('left');
    }
    if (!getTargetNode(x,y-1).state || getTargetNode(x,y-1).state === 'goal') {
      actions.push('down');
    }
    if (!getTargetNode(x,y+1).state || getTargetNode(x,y+1).state === 'goal') {
      actions.push('up');
    }
  }

  else {
    // Check up, down, left, right
    if (!getTargetNode(x-1,y).state || getTargetNode(x-1,y).state === 'goal') {
      actions.push('left');
    }
    if (!getTargetNode(x+1,y).state || getTargetNode(x+1,y).state === 'goal') {
      actions.push('right');
    }
    if (!getTargetNode(x,y-1).state || getTargetNode(x,y-1).state === 'goal') {
      actions.push('down');
    }
    if (!getTargetNode(x,y+1).state || getTargetNode(x,y+1).state === 'goal') {
      actions.push('up');
    }
  }

  console.log(`Possible actions from ${x},${y}: ${actions}`);
  if (actions.length === 0) {
    alert('Your adventurer is trapped!');
    throw new Error('Your adventurer is trapped!');
  }
  return actions;
}

function successor(node, action) {
  // Given a direction,
  // this function should be able to return a node
  //
  // If called like:
  // successor(state, left);
  // it should return the node at (state.x -1, state.y)
  let map = gameMap.nodes;
  let x = node.x;
  let y = node.y;

  switch(action) {
    case 'left':  return getTargetNode(x-1,y);
    case 'right': return getTargetNode(x+1,y);
    case 'up':    return getTargetNode(x,y+1);
    case 'down':  return getTargetNode(x,y-1);
    default: throw new Error(`No successor possible from action ${action}!`);
  }
}
