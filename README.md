# Pathfinder
----
## what is Pathfinder?

> It's an implementation of a path finding algorithm to connect a **source** to its **destination** on a 2d grid.

----
## Usage
1. Launch the [website](http://www.matthamil.me/Pathfinder).
2. Select the *Start* option on the left side menu, and place it appropriately on the grid.
3. Similarly, select the *Goal* option on the menu and place it on the grid.
4. Add *obstacles* [trees, walls, water] on the grid by selecting them from the menu and placing them on the grid.
5. Click the *play* button, to plot the path on the grid.

----
## Running Locally
1. Clone the git repository
2. Make sure you have [node](https://nodejs.org/) installed on your system by running `npm -v`, which should log the current version of node installed.
3. Run `npm install`.
3. Run `bower install`.
3. Run `npm install -g gulp`.
3. Uncomment the CDNs in index.html to get resources from the bower installations.
3. Run `gulp` to compile the included js.
3. Run `gulp serve` to run a local server.
3. Navigate on your browser to [localhost:8080](http://127.0.0.1:8080).
4. Enjoy!! 