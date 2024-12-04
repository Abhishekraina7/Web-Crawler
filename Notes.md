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






# What is learned while coding report.js file

```
const outputPath = path.join(process.cwd(), 'report.csv');

```
## **process.cwd()**

- **What it is:** process is a global object in Node.js that provides information about the current Node.js process. 
- **The cwd()** method stands for "**current working directory.**"

- **Functionality:** **process.cwd()** returns the absolute path of the directory from which the Node.js process was started. This is typically the root directory of your project or the directory where you executed the Node.js script.

- **Example:** If you run your script from /home/user/myproject, process.cwd() would return /home/user/myproject.

##  path.join()

- **What it is:** path is a built-in module in Node.js that *provides utilities for working with file and directory paths.* The **join() method is used to concatenate path segments into a single path.**

- **Functionality:** path.join() takes multiple string arguments and j*oins them together using the appropriate path separator for the operating system* (**e.g., / for Unix/Linux and \ for Windows**). This ensures that the resulting path is valid regardless of the operating system.
  
- **Example:** If you call **path.join('/home/user', 'myproject', 'file.txt'),** it would return **/home/user/myproject/file.txt** on ***Unix/Linux *** or **\home\user\myproject\file.txt** on ***Windows.***


# fs.writeFile 
```
fs.writeFile(outputPath, csvContent, (err) => {
    if (err) {
        console.error('Error writing to CSV file:', err);
    } else {
        console.log(`Report saved as ${outputPath}`);
    }
});

```

 ###  1. **fs.writeFile()**

- **What it is:** fs is the built-in Node.js module for interacting with the file system. The writeFile() method is used to asynchronously write data to a file.
  
- **Functionality:** **The writeFile() method takes three arguments**:
  
**a. File Path:** The first argument is the path to the file where you want to write the data. In this case, it's outputPath, which contains the full path to report.csv.

**b. Data:** The second argument is the data you want to write to the file. Here, it's csvContent, which contains the CSV-formatted string that you want to save.

**c. Callback Function:** The third argument is a callback function that gets executed once the write operation is complete. This function receives an error object as its argument if an error occurs during the write operation.