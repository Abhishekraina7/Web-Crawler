# What is a module?

- In JavaScript, a module is a file that contains a self-contained piece of code that can be imported and used by other parts of an application. In this case, we're creating a module called crawl.js.

# What is the normalizeURL function?

- The normalizeURL function takes a URL as an input and returns a normalized version of that URL. 
- In this example, the function removes any trailing slashes from the URL and converts it to lowercase. 
- This can be useful when working with URLs, as it ensures that they're in a consistent format.

# What does module.exports do?

- module.exports is a way to export specific functions or variables from a module, making them available for use by other parts of the application. 
- In our case, we're exporting the normalizeURL function from the crawl.js module.
- By using module.exports, we're making the normalizeURL function a public API of the crawl.js module. 
- This means that other parts of the application can import the crawl.js module and use the normalizeURL function.

# In JavaScript, ESM stands for ECMAScript Module.

ECMAScript Module (ESM) is a standard for packaging and importing JavaScript code, introduced in ECMAScript 2015 (ES6). It allows you to write modular, reusable, and maintainable code by importing and exporting functions, variables, and classes between JavaScript files.

Key features of ESM:

- Import: Import functions, variables, and classes from other JavaScript files using the import statement.
- Export: Export functions, variables, and classes from a JavaScript file using the export statement.
- Module scope: Each ESM has its own scope, which means that variables and functions defined in one module are not automatically available in other modules.

# Dependencies and Dev-Dependencies

## Dependencies (also known as Production Dependencies)

dependencies are packages that your project needs to run in production. These are the packages that are required for your application to function correctly when it's deployed to a production environment. Examples of dependencies include:

- Express.js (a web framework)
- MongoDB (a database driver)
- React (a front-end library)
When you run npm install or yarn install, these dependencies are installed in the node_modules directory.

## DevDependencies (also known as Development Dependencies)

devDependencies are packages that are only needed during development, testing, or building of your project. These packages are not required for your application to function correctly in production. Examples of devDependencies include:

- Jest (a testing framework)
- ESLint (a code linter)
- Webpack (a bundler)
  
When you run npm install or yarn install, these devDependencies are also installed in the node_modules directory. However, when you run npm install --production or yarn install --production, devDependencies are not installed.