# Pathfinder

Pathfinder is a small web app that implements search algorithms in JavaScript.

## Usage

1. Launch the [website](http://www.matthamil.me/Pathfinder).
1. Select the `Start` option on the left side menu, and place it on the grid.
1. Select the `Goal` option on the menu and click to place it on the grid.
1. Add obstacles (trees, walls, or water) on the grid by selecting them from the menu and clicking (or clicking and dragging to add multiple obstacles) onto the grid.
1. Click the `Play` button to plot the path on the grid.

## Running Locally

1. Clone the repository
1. [node](https://nodejs.org/) must be installed on your system. Check if Node is installed by running `node -v`.
1. Make sure you have [Gulp](http://gulpjs.com/) installed to run the `Gulpfile.js` to compile the JavaScript. Without this, browser compatibility issues may occur.
1. Run the following commands in your Terminal:

```Bash
bower install
npm install
gulp && gulp serve
```

Navigate to [localhost:8080](http://127.0.0.1:8080) in your browser.
