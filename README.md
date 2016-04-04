### About

Allows you to interact with the npm commands using es6 promises instead of callbacks

### Install

`npm install npm-as-promised --save-dev`

### Usage

npm.load and all npm.commands are now wrapped in a promise api. See below:

```javascript
npm.load(config).then(function(){
    //do cool stuff
}).catch(function(){
    //Something went wrong, not cool
)

```


