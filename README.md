# ![ListView](https://user-images.githubusercontent.com/44801418/48134118-91f82f80-e2cb-11e8-9928-c54c3d41015f.png) ListView

[![npm package][npm-badge]][npm]

Used for displaying records as individual items in a list.

![ListView](https://user-images.githubusercontent.com/44947294/51593386-5b0cdf80-1ef2-11e9-8ce3-905b6754b2a6.gif)
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
| fieldRenderer | Function | ✓ | Callback invoked whenever one of the cells get's rendered: `({index: number}): jsx` |
| fields | Array | ✓ | Array of fields to be displayed as columns |

#### Field
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| id | String | ✓ | Unique id for the field |
| name | String | ✓ | Name to be displayed as column name |

### More information

This component is designed and developed as part of [Cosmos Design System][cmds]. 

[cmds]: https://github.com/entercosmos/cosmos
[npm-badge]: https://img.shields.io/npm/v/@cmds/list-view.svg
[npm]: https://www.npmjs.org/package/@cmds/list-view

