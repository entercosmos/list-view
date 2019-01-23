# ![ListView](https://user-images.githubusercontent.com/44801418/48134187-d08dea00-e2cb-11e8-9466-8b05188ccf33.png) ListView

[![npm package][npm-badge]][npm]

Used for displaying records as individual items in a list.

![ListView](https://user-images.githubusercontent.com/44947294/51615784-ffaa1400-1f28-11e9-81d8-e1b97c169068.gif)
## Getting started

````
npm install @cmds/list-view --save
````

### Prop Types

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| id | String | ✓ | Unique id for the instance of this view |
| rowCount | Number | ✓ | The amount of rows to be rendered |
| rowGetter | Function | ✓ | Return row data for the index `({index: number})` |
| rowRenderer| Function | ✓ | Callback invoked whenever one of the rows get's rendered: `({index: number, }): jsx` |

### More information

This component is designed and developed as part of [Cosmos Design System][cmds]. 

[cmds]: https://github.com/entercosmos/cosmos
[npm-badge]: https://img.shields.io/npm/v/@cmds/list-view.svg
[npm]: https://www.npmjs.org/package/@cmds/list-view

