# Example IoT in a Box Integration

This is an bootstrap example on how to make an integration with IoT in a Box. 

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

Enter the necessary integration setup information in `tina.js`:
```
function : path to function.js, which should contain all of the integration functionality
settings : any settings necessary for tina to work with the integration
credentials : any credentials needed to authorize the integration(api keys, access tokens, etc.)
```

Run example
```
node tina.js
```

### Development
To develop your own integration function, add your  `function.js` file and run the application again (`node tina.js`).

**NOTICE** `function.js` is executed inside a [NodeJS VM](https://nodejs.org/api/vm.html#vm_vm_executing_javascript), hence native and external modules are not available within context. 

Available modules:
 - request (HTTP Client)
 - Buffer
 - Primitives

If you need additional library, submit an issue.