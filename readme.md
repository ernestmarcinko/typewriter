# TypeWriter javascript effect

A super simple and very small TypeWriter javascript library, only about ~2KB
[Live example](https://ernestmarcinko.com/typewriter/)

## Installation
Use npm or yarn to install TypeWriter with a single command

```shell
# with npm
npm i @anag0/typewriter

# with yarn
yarn add @anag0/typewriter

```
## Via CDN

If you prefer a build, use the CDN version

```html
<script src="https://unpkg.com/@anag0/typewriter@latest/dist/typewriter.js"></script>
```

## Usage
```javascript
// Choose a node
const element = document.querySelectorAll('p')[0];

// Do the thing
const typeWriter = new TypeWriter(element, {
    keepBlinking: false
});
typeWriter.wait(2000)
        .write('Hi!')
        .delete(3)
        .write('This is a typewriter script!')
        .wait(2000)
        .config({pauseMin: 50, pauseMax:60})
        .wipe()
        .write('You can change the speed.');
```  

## Options

| Name | Type | Default value | Description |
| --- | --- | --- | --- |
| cursor | String | '\|' (Pipe) | The blinking cursor |
| pauseMin | Integer | 170 | Mininum wait time before the next character |
| pauseMax | Integer | 230 | Maximum wait time before the next character |
| keepBlinking | Bool | true | Should the cursor remain after the text is printed |
| autoStart | Bool | true | Should the tasks start right away. If false then use the ``start()`` method to start the tasks |
| className | String | typewriter | The class name to be used for the element |
| injectStyles | Bool | true | Should the typewriter CSS be injected to the header |

## Methods

| Method | Params | Description |
| --- | --- | --- |
| write | ``String`` Text to write | Writes a text to the node innerHTML property |
| delete | ``Int`` Number of Characters to delete | Deletes number of characters a from the node innerHTML property |
| wait | ``Int`` Milliseconds to wait | Waits for N milliseconds before continuing with the next task |
| wipe | - | Deletes everything from the target node innerHTML property |
| config | ``Object`` Configuration key => value pairs | Changes the configuration |

## Callback functions
These are added via the arguments (options).

```javascript
const typeWriter = new TypeWriter(node, {
    onFinish: (node, params)=>{
        console.log(node, params);
    },
    onStart: (node, params)=>{
        console.log(node, params);
    },
    onTask: (task, node, params)=>{
        console.log(task, node, params);
    },
});
``` 

| Name | Arguments | Description |
| --- | --- | --- |
| onStart | ``Element`` The Node, ``Object`` Options | Executes when the ``start()`` function is triggered |
| onFinish | ``Element`` The Node, ``Object`` Options | Executes when no more tasks left in the queue |
| onTask | ``Object`` Task, ``Element`` The Node, ``Object`` Options | Executes when a task is about to be executed from the queue |

## Examples

### Basic Usage

Appends a text to the first paragraph node found

```javascript
const typeWriter = new TypeWriter(document.querySelectorAll('p')[0]);
typeWriter.write('This is a typewriter script!')
```  

Deletes the node contents after waiting 2 seconds, then types in the new text:

```javascript
const typeWriter = new TypeWriter(document.querySelectorAll('p')[0]);
typeWriter.wait(2000).wipe().write('This is a typewriter script!')
```  

### Advanced Usage

Deletes the node contents after waiting 2 seconds, then types in the new text, deletes 7 characters, then changes the typing speed, then writes a new text.

```javascript
const typeWriter = new TypeWriter(document.querySelectorAll('p')[0], {
    pauseMin: 100,
    pauseMax: 150,
    keepBlinking: false
});
typeWriter.wait(2000)
    .wipe()
    .write('This is a typewriter script!')
    .wait(2000).
    .delete(7)
    .config({pauseMin: 50, pauseMax:100})
    .write('example!');
```  

### Custom class name & styles injection

By default the styles are injected to the document header. You can skip that, and add the styles manually from the ``typewriter.css`` file, or:

```html
<link rel="stylesheet" href="https://unpkg.com/@anag0/typewriter@latest/dist/typewriter.css">
```

In that case the ``injectStyles`` option has to be ``false``:

```javascript
const typeWriter = new TypeWriter(document.querySelectorAll('p')[0], {
    injectStyles: false
});
```  

You can also specify a custom wrapper class name:

```javascript
const typeWriter = new TypeWriter(document.querySelectorAll('p')[0], {
    className: "myCustomTypewriter"
});
```  

If injectStyles is enabled, the className is automatically changed within the injected styles.

### Chaining multiple TypeWriters via callbacks

Using the ``onFinish`` and ``autoStart`` options you can chain the typewriter scripts together, so the next one is always started after the previous one finishes.

```javascript
const node1 = document.querySelector('#node1');
const node2 = document.querySelector('#node2');
const node3 = document.querySelector('#node3');

const typeWriter1 = new TypeWriter(node1, {
    autoStart: false,
    keepBlinking: false,
    onFinish: (node, params)=>{
        typeWriter2.start()
    },
});
const typeWriter2 = new TypeWriter(node2, {
    autoStart: false,
    keepBlinking: false,
    onFinish: ()=>{
        typeWriter3.start()
    }
});
const typeWriter3 = new TypeWriter(node3, {
    autoStart: false,
    keepBlinking: false
});

typeWriter1.write('This is the first typewriter writing..').start();
typeWriter2.write('..this is the second one..');
typeWriter3.write('..and this is the third.');
``` 