<div align="center">
    <img width="196" height="96" vspace="20" src="http://assets.getme.co.uk/manhattan-logo--variation-b.svg">
    <h1>Manhattan Manifest Plugin</h1>
    <p>Webpack plugin for generating manifest files for Manhattan CMS.</p>
    <a href="https://badge.fury.io/js/manhattan-manifest-plugin"><img src="https://badge.fury.io/js/manhattan-manifest-plugin.svg" alt="npm version" height="18"></a>
    <a href="https://david-dm.org/GetmeUK/manhattan-manifest-plugin/"><img src='https://david-dm.org/GetmeUK/manhattan-manifest-plugin/status.svg' alt='dependencies status' height="18"/></a>
</div>

## Installation

`npm install manhattan-manifest-plugin --save-dev`


## Usage

```JavaScript
const {ManhattanManifestPlugin} = require('manhattan-manifest-plugin')

module.exports = (env) => {
    ...

    return {
        ...
        plugins: [new ManhattanManifestPlugin()]
    }
}
```
