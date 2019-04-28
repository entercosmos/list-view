import React from 'react'
import {css} from 'emotion'
import PropTypes from 'prop-types'
import {List, AutoSizer} from 'react-virtualized'

export default class ListView extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        rowGetter: PropTypes.func.isRequired,
        rowRenderer: PropTypes.func.isRequired,
        defaultHeight: PropTypes.number,
        defaultWidth: PropTypes.number,
    }

    render() {

        return (
            <AutoSizer defaultHeight={this.props.defaultHeight} defaultWidth={this.props.defaultWidth}>
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