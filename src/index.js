import React from 'react'
import {css} from 'emotion'
import PropTypes from 'prop-types'
import {List, AutoSizer} from 'react-virtualized'
import 'react-virtualized/styles.css'

export default class ListView extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        rowGetter: PropTypes.func.isRequired,
        fieldRenderer: PropTypes.func.isRequired,
        fields: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        )
    }

    render() {

        return (
            <AutoSizer>
                {({width, height}) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={this.props.rowCount}
                        rowHeight={118}
                        rowRenderer={this.rowRenderer}
                        style={{
                            paddingTop: 8,
                            paddingBottom: 8
                        }}
                    />
                )}
            </AutoSizer>
        )
    }

    cellRenderer = (params) => {

        const {columnIndex, rowData, cellData} = params

        const field = this.props.fields[columnIndex]

        return (
            <div
                className={css`
                    width: 100%;
                    max-width: 100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 1.5;
                    -webkit-box-align: center;
                    align-items: center;
                    display: inline-flex;
                    cursor: pointer;
                    height: 24px;
                    overflow: hidden;
                `}
            >
                {this.props.fieldRenderer({
                    id: rowData.id,
                    field,
                    cell: cellData,
                    index: columnIndex,
                    props: {
                        id: field.id,
                        contextId: 'recordListItem',
                        roleId: 'readOnly'
                    }
                })}
            </div>
        )
    }

    rowRenderer = ({
                       key,         // Unique key within array of rows
                       index,       // Index of row within collection
                       isScrolling, // The List is currently being scrolled
                       isVisible,   // This row is visible within the List (eg it is not an overscanned row)
                       style        // Style object to be applied to row (to position it)
                   }) => (
        <div
            key={key}
            style={style}
            className={css`
                padding: 8px 16px;
            `}
        >

            {this.props.rowRenderer({
                index
            })}
        </div>
    )
}