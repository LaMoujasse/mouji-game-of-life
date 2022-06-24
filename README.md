# Mouji's game of life
## Implementation from La Moujasse of the famous Conway's game of life

Cell object: 
 - width : 20 px
 - height : 20 px

Max cells = (1920 * 1080) / 400 = 5184 cells.  
All the grid is already populated with either dead or alive cells

Rules :
- Any live cell with two or three live neighbours survives.
- Any dead cell with three live neighbours becomes a live cell.
- All other live cells die in the next generation. Similarly, all other dead cells stay dead.

Vectors to enhance this game :
- Calculate time complexity and optimize (Via Promise.all() to parallelize all cells updates)
- Add params to custom the grid 
  - replace dead and alive cells figures (imgs, custom colors etc ...)
- Give user inputs to :
  - start the game
  - stop the game
  - customize the grid (cf : Add params to custom the grid )