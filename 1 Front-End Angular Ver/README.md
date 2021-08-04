# Shopping-List

Initial work for work, all front-end fully configured in AngularJS

## Getting Started

You can find more about AngularJS [here][angularjs]

Then to get you started, you can simply clone the `Shopping-List` repository and install the dependencies:

### Prerequisites

You need git to clone the `Shopping-List` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `Shopping-List`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `Shopping-List` 

Clone the `Shopping-List`  repository using git:

```
git clone https://github.com/hannahscoot/Shopping-List.git
cd Shopping-List 
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and AngularJS framework code. The tools
help us manage and test the application.

* We get the tools we depend upon and the AngularJS code via `npm`, the [Node package manager][npm].

`npm` is preconfigured to automatically copy the downloaded AngularJS files to `app/lib` so we
can simply do:

```
npm install
```

After that, you should find out that you have two new directories in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/lib` - contains the AngularJS framework files and other front end dependencies

### Run the Application

The simplest way to start this server is from within the folder:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].

[angularjs]: https://angularjs.org/
[git]: https://git-scm.com/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/


