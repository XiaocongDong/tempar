# Tempar - Light-weight Template Parser
## Notes: 🚧🚧🚧Both the code and documentation of this project is under construction, try not to use it in your real project now.

For template parsing, we already got [handlebars.js](https://github.com/wycats/handlebars.js/) and [mustache.js](https://github.com/janl/mustache.js/), they are awesome and powerful, but sometime, they may be too `heavy` for our need, we just need a light-weight template parser for generating our text from a template to get the shit done! If you have the same problem as me, Tempar can save you from the headache, it is light-weight (no more than 500 lines of code, no dependencies), flexible and maybe powerful.

## Installation
```
npm install tempar
```

## Usage
Below is a quick example for using Tempar.

Let's say you have a book store template which shows all of the available book list of your store.
```
// src/templates/store
Welcome to {{owner.name}}'s book store!

{{#if open}}
Here is the books available for renting!
{{#each books}}
{{printBook}}
{{/each}}
{{/if}}
```
Here is the javascript sample code:

```
const fs = require('fs')
const Parser = require('tempar')

const store1 = {
  owner: {
    name: 'Shawn'
  },
  open: true,
  printBook: (book) => `${book.name} written by ${book.author.name}`,
  books: [
    {
      name: 'fantastic book',
      author: {
        name: 'fantastic author'
      }
    },
    {
      name: 'awesome book',
      author: {
        name: 'awesome author'
      }
    },
    {
      name: 'shitty book',
      author: {
        name: 'shitty author'
      }
    },
  ]
}

const store2 = {
  owner: {
    name: 'Tommy'
  },
  open: false,
  books: [
    {
      name: 'unknown book',
      author: {
        name: 'no body cares.'
      }
    }
  ]
}

const storeTemplate = fs.readFileSync('src/templates/store')

const parser = new Parser(storeTemplate.toString())
parser.parse()

const generatedStoreContent1 = parser.generate(store1)
console.log(generatedStoreContent1)

const generatedStoreContent2 = parser.generate(store2)
console.log(generatedStoreContent2)
```

```
// store 1 output
Welcome to Shawn's book store!

Here is the book available for renting!

fantastic book written by fantastic author
awesome book written by awesome author
shitty book written by shitty author

// store2 output
Welcome to Tommy's book store!

```

## API
Tempar provides a `Parser` Class, it has the following methods.
```
constructor(template: String)
parse() => void
generate(context: Object) => String
```

## Semantics Blocks
A tempar template is a string that contains any number of tempar tags. Tags are indicated by the double mustaches that surround them.

Overall, there are two types of tags in tempar, they are closed tag and unclosed tag.

Unclosed tags include `LITERAL` and `LITERAL_HELPER` tags, closed tags include `IF` and `EACH` tags.

### LITERAL
Example: {{name}}, {{author.name}}

Literal tag only contain one parameter, it's the key of the value you want to fill in this tag.

### LITERAL_HELPER
Example: {{uppercase name}}

Literal tag contains two parameters, the first one is the key of your helper function, the second one is the key of the value you want to pass to this helper function.

### IF
Example:
{{#if hasMore}}
  something happens if has more...
{{/if}}

Despite the `#if` statement, `if tag` needs the key of the value you want to evaluate, the key is just like the keys for literal and literal helper tags.

Notes: If the value that are evaluated is a pure object, it will become the active context of its children blocks.

### EACH
Example:
{{#each comments}}
  {{athor.name}}: {{content}}
{{/each}}

Each tag starts with `#each` statement, and must be provided with the key of the object you want to iterate, it must be an array.

Notes: each item of the iterated object will become the active context of each children block, for example, each comment in comments will be the active context for its children block.

## Context
Each block of tempar template will has a context stack, context stack is the place where template lookup the value for the key.

## Indentation
Indentation of the closed tags will be ignored.

