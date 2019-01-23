const faker = require('faker')
const fs = require('fs')
const random = require('lodash/random')
const times = require('lodash/times')
const sample = require('lodash/sample')
const uniqueId = require('lodash/uniqueId')

const generateAttachment = () => {

    const i = uniqueId()
    const cat = sample(['wanderlust', 'water', 'canada', 'mountain', 'beach'])
    return {
        id: `att${i}`,
        type: 'image/jpeg',
        filename: `Image`,
        thumbnails: {
            small: {
                url: `https://source.unsplash.com/featured/400x360?${cat}`
            },
            medium: {
                url: `https://source.unsplash.com/featured/400x360?${cat}`
            },
            large: {
                url: `https://source.unsplash.com/featured/400x360?${cat}`
            },
        },
        url: `https://source.unsplash.com/featured/400x360?${cat}`
    }
}

const generateAttachments = () => {

    return times(random(0, 5)).map(i => {
        return generateAttachment(i)
    })
}

const generateLinkedRecord = (i) => ({
    id: `rec${i}`,
    name: faker.name.findName()
})

const generateLinkedRecords = () => {

    return times(random(0, 8)).map(i => {
        return generateLinkedRecord(i)
    })
}

const structure = {
    table: {
        id: 'tbl1',
        name: 'Persons',
        primaryFieldId: 'fld1',
    },
    view: {
        coverFieldId: 'fld5',
        coverFitTypeId: 'cover',
        visibleFieldOrder: [
            'fld1',
            'fld2',
            'fld3',
            'fld4',
            'fld5',
            'fld6',
            'fld7',
            'fld8',
            'fld9'
        ]
    },
    fields: [{
        id: 'fld1',
        name: 'Name',
        typeId: 'singleLineText'
    }, {
        id: 'fld2',
        name: 'Email address',
        typeId: 'singleLineText'
    }, {
        id: 'fld3',
        name: 'Active',
        typeId: 'checkbox'
    }, {
        id: 'fld4',
        name: 'Friends',
        typeId: 'linkToAnotherRecord'
    }, {
        id: 'fld5',
        name: 'Attachment',
        typeId: 'attachment'
    }, {
        id: 'fld6',
        name: 'Colors',
        typeId: 'multipleSelect',
        options: {
            coloredOptions: true,
            optionOrder: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6'],
            options: {
                'opt1': {
                    id: 'opt1',
                    colorId: 'blue.base',
                    name: 'Blue'
                },
                'opt2': {
                    id: 'opt2',
                    colorId: 'green.base',
                    name: 'Green'
                },
                'opt3': {
                    id: 'opt3',
                    colorId: 'red.base',
                    name: 'Red'
                },
                'opt4': {
                    id: 'opt4',
                    colorId: 'yellow.base',
                    name: 'Yellow'
                },
                'opt5': {
                    id: 'opt5',
                    colorId: 'indigo.base',
                    name: 'Indigo'
                },
                'opt6': {
                    id: 'opt6',
                    colorId: 'purple.base',
                    name: 'Purple'
                }
            }
        }
    }, {
        id: 'fld7',
        name: 'Color',
        typeId: 'singleSelect',
        options: {
            coloredOptions: true,
            optionOrder: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6'],
            options: {
                'opt1': {
                    id: 'opt1',
                    colorId: 'blue.base',
                    name: 'Blue'
                },
                'opt2': {
                    id: 'opt2',
                    colorId: 'green.base',
                    name: 'Green'
                },
                'opt3': {
                    id: 'opt3',
                    colorId: 'red.base',
                    name: 'Red'
                },
                'opt4': {
                    id: 'opt4',
                    colorId: 'yellow.base',
                    name: 'Yellow'
                },
                'opt5': {
                    id: 'opt5',
                    colorId: 'indigo.base',
                    name: 'Indigo'
                },
                'opt6': {
                    id: 'opt6',
                    colorId: 'purple.base',
                    name: 'Purple'
                }
            }
        }
    }, {
        id: 'fld8',
        name: 'Revenue',
        typeId: 'number',
        options: {
            numberFormatId: 'decimal',
            allowNegativeNumbers: false,
            precisionId: '2'
        }
    }, {
        id: 'fld9',
        name: 'Notes',
        typeId: 'longText'
    }]
}

const content = times(200).map(i => {

    return {
        id: 'rec' + (i + 1),
        cells: {
            'fld1': {
                text: faker.name.findName()
            },
            'fld2': {
                text: faker.internet.email()
            },
            'fld3': {
                checked: sample([false, true])
            },
            'fld4': {
                records: generateLinkedRecords()
            },
            'fld5': {
                attachments: generateAttachments()
            },
            'fld6': {
                optionIds: ['opt1', 'opt2', 'opt3']
            },
            'fld7': {
                optionId: sample(['opt1', 'opt2', 'opt3', null])
            },
            'fld8': {
                number: 32.25
            },
            'fld9': {
                longText: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
            }
        }
    }
})

const data = {
    structure,
    content
}

fs.writeFileSync(__dirname + '/../demo/src/data.json', JSON.stringify(data, null, 2))