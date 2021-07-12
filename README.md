# Minesweeper

Was the first thing everyone kept checking on that site and I was bored, so I've thrown together a version of minesweeper and I'll build on it some.

Image assets taken directly from [ShizukuIchi](https://github.com/ShizukuIchi)'s pretty great Windows XP project at https://github.com/ShizukuIchi/winXP/tree/master/src/assets/minesweeper

So this is a pretty quickly cobbled together minesweeper clone which can hopefully just be dumped into whatever project at a fairly small size (:fingers-crossed:). I haven't even checked how closely it resembles the original minesweeper but you can probably assume most people won't care beyond clicking on it a few times.

## Props

| Name     | Type             | Default | Description             |
| -------- | ---------------- | ------- | ----------------------- |
| gridSize | [number, number] | [9,9]   | Size of grid            |
| mines    | number           | 10      | Number of mines on grid |
|          |                  |         |                         |

To restart games from outside the component I suggest using the `key` prop on the component.
