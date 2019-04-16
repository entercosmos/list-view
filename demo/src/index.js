import React, {Component} from 'react'
import {render} from 'react-dom'
import 'react-virtualized/styles.css'
import {css, injectGlobal} from 'emotion'
import CheckboxField from '@cmds/checkbox-field'
import AttachmentField from '@cmds/attachment-field'
import LongTextField from '@cmds/long-text-field'
import SingleLineTextField from '@cmds/single-line-text-field'
import SingleSelectField from '@cmds/single-select-field'
import MultipleSelectField from '@cmds/multiple-select-field'
import NumberField from '@cmds/number-field'
import LinkToAnotherRecordField from '@cmds/link-to-another-record-field'
import RecordListItem from '@cmds/record-list-item'
import ListView from '../../src'
import data from './data.json'
import fieldHeightGetter from "../../../gallery-view/demo/src/fieldHeightGetter";


injectGlobal`
    * {
        box-sizing: border-box;
    }
    *:focus {
        outline: 0;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        background-color: #fff;
    }
`

const selectName = ({record}) => {
    return record.cells.fld1.text
}

const selectCoverAttachments = ({record}) => {
    return record.cells.fld5.attachments
}

const fieldRenderer = ({id, field, props, cellData: cell}) => {

    const renderers = {
        singleLineText: ({props, cell}) => (
            <SingleLineTextField
                {...props}
                text={cell.text}
            />
        ),
        longText: ({props, cell}) => (
            <LongTextField
                {...props}
                longText={cell.longText}
            />
        ),
        checkbox: ({props, cell}) => (
            <CheckboxField
                {...props}
                checked={cell.checked}
            />
        ),
        attachment: ({props, cell}) => (
            <AttachmentField
                {...props}
                attachments={cell.attachments}
            />
        ),
        linkToAnotherRecord: ({props, cell}) => (
            <LinkToAnotherRecordField
                {...props}
                records={cell.records}
            />
        ),
        multipleSelect: ({props, field, cell}) => (
            <MultipleSelectField
                {...props}
                optionIds={cell.optionIds}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        singleSelect: ({props, field, cell}) => (
            <SingleSelectField
                {...props}
                optionId={cell.optionId}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        number: ({props, field, cell}) => (
            <NumberField
                {...props}
                number={cell.number}
                allowNegativeNumbers={field.options.allowNegativeNumbers}
                numberFormatId={field.options.numberFormatId}
                precisionId={field.options.precisionId}
            />
        )
    }

    const renderer = renderers[field.typeId]

    if (!renderer) {
        throw new Error(`Renderer for typeId '${field.typeId}' not found`)
    }

    return renderer({
        id,
        field,
        props,
        cell
    })
}

const cellDataGetter = ({id, data}) => {
    return data.cells[id]
}

const rowRenderer = ({index}) => {

    const record = data.content[index]

    return (
        <RecordListItem
            id={record.id}
            name={selectName({record})}
            data={record}
            cellDataGetter={cellDataGetter}
            coverFitTypeId={data.structure.view.coverFitTypeId}
            coverAttachments={selectCoverAttachments({record})}
            coverEnabled={true}
            visibleFieldOrder={data.structure.view.visibleFieldOrder}
            fieldHeightGetter={fieldHeightGetter}
            fields={data.structure.fields}
            fieldRenderer={fieldRenderer}
            onClick={() => {
                alert(`Clicked record '${selectName({record})}'`)
            }}
        />
    )
}

class Demo extends Component {
    render() {

        return (
            <div
                className={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                `}
            >
                <div
                    className={css`
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 130px;
                        z-index: 1030;
                        background-color: #fff;
                        padding-left: 20px;
                        padding-right: 20px;
                        border-bottom: 1px solid #ccc;
                    `}
                >
                    <h1>ListView <a href="https://www.npmjs.org/package/@cmds/list-view" target="_blank"><img
                        src="https://img.shields.io/npm/v/@cmds/list-view.svg"/></a></h1>
                    <p>Used for displaying records as individual items in a list.</p>
                </div>
                <div
                    className={css`
                        position: absolute;
                        top: 130px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: #fff;
                    `}
                >
                    <ListView
                        id={'view'}
                        rowCount={data.content.length}
                        fields={data.structure.fields}
                        rowGetter={({index}) => data.content[index]}
                        rowRenderer={rowRenderer}
                        fieldRenderer={fieldRenderer}
                    />
                </div>
            </div>
        )
    }
}

render(<Demo/>, document.querySelector('#demo'))
