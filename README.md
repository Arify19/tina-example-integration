# Example IoT in a Box Integration

This is an bootstrap example on how to make an integrate with IoT in a Box. 

### Getting Started

NodeJS is required for this example.

Clone repository
```
git clone https://github.com/myDevicesIoT/tina-example-integration
cd tina-example-integration
```

Install modules
```
npm install
```

Run example
```
node index.js
```

### Development
To develop your own integration function, add your logic to the `function.js` file and run the application again (`node index.js`).

**NOTICE** `function.js` is executed inside a [NodeJS VM](https://nodejs.org/api/vm.html#vm_vm_executing_javascript), hence native and external modules are not available within context. 

Available modules:
 - request (HTTP Client)
 - Buffer
 - Primitives

If you need additional library, submit an issue.