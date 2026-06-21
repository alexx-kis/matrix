# 1. JS (ES5)

## 1.1. COMMON

- loops while, for;
- if condition;
- switch construction;
- logical operators;
- conditional operators;
- alert/prompt/confirm;
- strict vs none-strict comparison;
- hoisting;

- Usage of `var`. How does variable behave without `var`?
- "use strict";

- "eval is evil". Why?

## 1.2. OBJECTS

### 1.2.1. common

- Set/get/delete object properties/methods;
- Set/get object keys;
- for ... in cycles;
- Ways to create object;

- Object to primitive conversion;
- Object descriptors;
- Object setters/getters;
- Copy/clone objects. Object pointer;
- Mutable vs immutable objects;

- Deep copy/clone;
- Linked list based on objects;

### 1.2.2. garbage collector

- What is garbage collector? Why do we need it?

- "Mark and sweep" algorithm;
- Object pointers reachability. How to mark pointer for garbage collector?

- Generational, incremental, idle-time collection;

## 1.3. DATA TYPES

### 1.3.1. common

- list of types
- type conversion
- "typeof" usage

### 1.3.2. date and time

- Set/get date (year, month, day);
- Date parsing;
- UTC dates and timezones;
- How to check if an object is a valid date?

### 1.3.3. json

- Clone objects with JSON methods;
- Object to JSON conversion;
- Usage of callback for JSON.parse method;

## 1.4. FUNCTIONS

### 1.4.1. common

- Types of functions;
- Immediately-invoked function expressions;

- Function-constructor;
- "Array-like" arguments;
- Recursion definition and examples;

- Recursive traversal (ex.: for objects);
- new Function feature;
- Currying;

### 1.4.2. execution context

- "this" definition;
- Ways to bind "this" to the function;
- Global context (window);

- Lexical environment definition;
- Scope definition;
- Variable shadowing;
- Closure definition and examples. Name conflicts;

- Lexical env garbage collection;

## 1.5. PROTOTYPES, INHERITANCE

- `__proto__` and "prototype" properties;
- chain of prototypes;
- create object with prototype;
- get and set object prototype;

- Prototype inheritance vs OOP inheritance;
- Function-constructor to create objects with prototype (functional prototyping);

- Getting of object constructor through prototype;

## 1.5.6. ERROR HANDLING

- try catch usage;
- exceptions throwing;

- 'finally' for try catch;
- Error object properties;

- window.onerror as a global error handler;

## 1.7. ASYNCHRONOUS PROGRAMMING

### 1.7.1. event loop

- Blocking code;

- Event loop concept;
- Zero delays and event loop queue (setTimeout(() => {}, 0));
- Macro and micro tasks;

- Fake multithreading and "concurrency";

### 1.7.2. scheduling

- setTimeout, setInterval. Why do we need them?
- Clear timeouts and intervals;

- requestAnimationFrame. Why do we need this?
- requestAnimationFrame browser support;

## 1.8. REGULAR EXPRESSIONS

- Two methods of RegExp object;
- Two ways to create RegExp;
- Basic RegExp pattern (character classes);
- Global and case-insensitive search;

- Average RegExp pattern (assertions, quantifiers);
- Characters escaping;

- Advanced RegExp pattern (groups and ranges);
- Advanced search flags;

# 2. JS (ES6+)

## 2.1. COMMON

- let/const vs var;
- What is Temporary Dead Zone?
- Destructing assignments, spread operator;
- Optional mark. Object properties optional chain;
- Arrow functions vs plain functions;
- for ... of cycles;
- template string;
- keys, values, fromEntries, entries methods;
- flat, flatMap, includes, Array.from() methods;

- Map/Set;
- Difference between assign and spread operator;
- Nullish coalescing operator;

- WeakMap/WeakSet;
- Proxy/Reflect;
- Iterable objects;
- Tag functions;

## 2.2. DATA TYPES

- Symbol type;
- BigInt;

## 2.3. MODULES

- import/export syntax;
- `*` for import;
- import/export "as";

- default export. Why this is bad practice?
- reexport. Why do we need it?

- Dynamic import or lazy loaded modules;
- Module Namespace Exports;

## 2.4. CLASSES

- Basic syntax;
- Inheritance;
- Private and protected properties and methods;

- "instanceof" usage;
- Static properties and methods;

- Reverting of class inheritance to functional inheritance and vice versa;
- Mixins;
- Decorators;

## 2.5. ASYNCHRONOUS PROGRAMMING

### 2.5.1. Promise

- Promises vs callbacks;
- States of promises;
- Exceptions/errors handling;

- Promise chaining. Falling through promises;
- Custom promises;
- finally;
- How to use then to catch errors;

- Promise.all. How it looks like as polyfill?
- race() method;
- allSettled() method;

### 2.5.2. Async/await

- Examples of async functions;
- Exceptions/errors handling;

- Rewriting Promise code with async/await;
- async/await class methods;

- async/await underhood;
- analogue Promise.all, Promise.race;

### 2.5.3. Generators/iterators

- Simple generators syntax and how it works;
- Generators composition;

- next with value sending or vice versa yield;
- Iterators;
- Async generators and iterators;

## 2.6. NETWORK

### 2.6.1. Fetch

- Basic usage of fetch() (how to make simple request and handle answer);

- Advanced usage of fetch() (How to get binary data from body, how to get/set headers);

- Difference between XHR and fetch();

# 3. Browser API

## 3.1. DOCUMENT AND PAGE OBJECTS

### 3.1.1. DOM

- What is the DOM?
- What is DOM tree?
- DOM inspecting (live DOM viewer);

- DOM tree creating;
- DOM elements navigation;
- console.log vs console.dir;

- Web components;
- Shadow DOM;

### 3.1.2. Elements size and position

- client* vs offset*;
- scroll\* properties;
- Getting of element rectangular;

- Writeable properties (name list of them);

### 3.1.3. Style and Classes

- classList vs className;
- Dynamic styles with JS;

- style.cssText;
- Computed styles;

### 3.1.4. Search methods

- Ways to get DOM elements in JS;
- Selectors;

- getElement* vs querySelector*

### 3.1.5. Events

- DOM events. Handling (add/remove event handlers);
- Basic types of DOM events;
- Ways to prevent DOM event;

- Events propagation (bubbling/capturing);
- Events delegation;
- Extended types of DOM events;
- Form events;

- Custom events;
- Content/document/window load events;

## 3.2. STORAGES

### 3.2.1. Cook1ie

- What is cookie;
- Setting and getting of cookies;

- Age of cookie;
- Secured cookies;

- Cookie removing
- Size restrictions;
- GDPR;
- Third party cookies;

### 3.2.2. LocalStorage, SessionStorage

- Local vs session storages;
- Storages purpose;

- Setting, getting, clearing of values;
- Storage events;

- Size restrictions;

### 3.2.3. IndexedDB

- DB setup;
- Transactions;
- Search flow;

- Version control;
- Cursors;

## 3.3. OPTIMIZATION AND PERFORMANCE

### 3.3.1. Bundle

- Minification;
- Uglifying;

- Compression (basic concept);
- Tree shacking for dependencies;
- Dependencies duplication (npm);

- Dynamic compression vs static;
- Gzip vs Brotli compression;

### 3.3.2. Browser loading

- Browser caching for resources;
- Assets compressing;

- Async and defer scripts;
- Critical CSS;
- Lazy load for code chunks;

### 3.3.3. Web Workers

- What are web workers and why do we need them?

- Web workers creating;
- Web workers terminating;
- Web workers messaging;
- Subworkers;
- Error handling;

- Shared workers;
- Embedded workers;
- Content security policy;

### 3.3.4. Service Workers

- Service worker. What is it?
- Browsers setup to allow service worker;
- Basic architecture of service worker;
- Steps to use service worker;
- Old cache removing;

- Service workers vs AppCache;
- IndexedDB as storage for data;
- Versioning for service workers;"

## 3.4. HTML

- Basic scheme for HTML document;
- HTML symbols usage;
- Text formatting, paragraphs;
- HTML links. Link target;
- HTML tables;
- Adding of scripts;
- Difference between block and inline elements;

- Media;
- HTML forms;
- SVG;
- Meta tags;

- `<template>` element;
- `<iframe>` element;
- `<canvas>` element;
- Style guide and coding convention. Good/bad practices;

## 3.5. CSS

- Frameworks layout technique;
- Selectors and their weight;
- Positioning;
- Margings vs paddings;
- Fonts adding;
- Element visibility. Ways to hide element;
- Z-index;

- Flexbox layout technique;
- Responsive design (concept);
- Preprocessors (SASS, LESS). Difference and advantages;
- Pseudo-elements and pseudo-classes;

- Layout techniques (frameworks, float, flexbox, grid);
- Responsive design (setup);
- Animation. Keyframes. Transitions;
- Browser dependent styles;

# 4. React

## 4.1. JSX

### 4.1.1. Render

- Why and how do we use ReactDOM library
- Why was ReactDOM moved to a separate library
- How does it work inside

### 4.1.2. JSXless react

- Why do we import React if we don't use it? Note: The question is about old react version (before 17th version)

- Explain in your own words what React is for in a component
- Know how JSX is converted to JS

- How "createElement" works
- cloneElement

### 4.1.3. Fragments

- What the purpose of React Fragments?

## 4.2. RECONCILIATION

### 4.2.1. Fiber

- What is ""Fiber"" in react library?
- Explain how this algorithm works in own words

- Good understanding of Fiber implementation Note: Inaccuracies in the description are allowed

- Understanding the intricacies of Fiber
- The ability to describe the principle of the algorithm at a deep level

### 4.2.2. Jobs

- A basic understanding of how prioritization works in react.
- Understanding how react prioritization works. Ability to explain the topic at a good level.
- Full understanding of the concept

### 4.2.3. Recursion on child elements

- Have an idea of why recursion is needed on child components
- The ability to apply this approach in practice

## 4.3. COMPONENTS

### 4.3.1. Functional components

- Know and understand at a basic level what functional components are for.
- How to work with state in functional components.

- Know and understand the topic at a good level.
- Understand the pros and cons of using functional components.

### 4.3.2. Class components

- Ability to write a class component.
- Working with the state.
- Working with queries.

- Deep understanding of class components.
- Understanding the pros and cons of using.
- Why functional components are preferred.

### 4.3.3. Props

- Understanding what props are for.
- Why are they readonly?
- how to organize reverse data flow to parent?

### 4.3.4. State

- Working with state in class and functional components.
- Basic understanding of how setState works

- Strong understanding of how setState works.
- Explain why setState is asynchronous and how it can be used.
- how callback used in setState

- What is the difference between nth setState calls in a synchronous and asynchronous function?
- How many rerenders will there be in the 1st and 2nd cases, and why?
- Batch of states

### 4.3.5. Lifecycle methods

- Knowledge of all basic life cycle methods.
- Understanding what they are for.

- Ability to explain why which method is needed.
- Ability to explain the order of execution of lifecycle methods.

### 4.3.6. Props validation

- How runtime typing works in react
- Default props
- prop types

- Static typing capabilities
- Why do we need flow or typescript

### 4.3.7. PureComponent/memo

- Understanding and the ability to explain in your own words what PureComponent is for.
- Why did he appear.
- Differences from Component

- why do we need React.memo

### 4.3.8. Refs

- Why do we need ref
- What is ref in react

- Understanding what refs are for.
- Ability to work with them, incl. using forwardRef

- Deep understanding of the meaning of refs in react.
- What they are for (give examples of use).

### 4.3.9. Context

- Understanding the concept of React.Context

- Ability to apply contexts.
- Deep understanding of the topic"

### 4.3.10. Portals

- Understanding and being able to explain in your own words what portals are used for in React

- Good knowledge of the topic.
- Ability to apply in practice

- Bubbling events through portals
- What is it for and how to work with it

### 4.3.11. Patterns

- Condition render

- Render props

- HOC
- Custom HOC

## 4.4. EVENTS

### 4.4.1. JSX handlers

- Understanding and being able to explain the difference between native handlers and handlers in React

### 4.4.2. Binding

- Understanding and the ability to explain how not to lose context, etc.

### 4.4.3. SyntheticEvent

- What is SyntheticEvent and what is it for

- Supported events

- What is the difference between event handling in 17 and previous versions of React?

### 4.4.4. Event types

- What are the types of events in react.
- What it is? Note: very briefly

- Deep understanding of the topic.
- Detailed explanation. Note: inaccuracies are allowed

- Full understanding of the topic

### 4.4.5. Controlled/uncontrolled components

- What is the difference between controlled and uncontrolled components.
- Understanding the pros and cons.
- Ability to explain the essence in your own words.

- Ability to work with uncontrolled components

### 4.4.6. Working with forms

- custom forms implementation

- usage of react forms libraries: formik, react-final-form etc

- custom validations, understanding form libs lifecycle, ability to explain in your own words how they works

### 4.4.7. Bubbling event in react

- Understanding how component bubbling works.
- Explanation in your own words

- Working with bubbling in components.
- Understanding How Portal Bubbling Works (Basic understanding)

- Bubbling through portals (good understanding)

## 4.5. OPTIMIZATION

### 4.5.1. Basic react optimization

- Confident knowledge of what keys are used for in react.
- Understanding how the shouldComponentUpdate lifecycle method works

- Strong knowledge, understanding when to use Component / PureComponent.
- How to work with props to avoid unnecessary redrawing.
- Ability to profile bottlenecks in the code

### 4.5.2. Reselect&Recompose

- Understanding what Reselect and Recompose are used for.
- Ability to describe in your own words.

- Good understanding of the two libraries. Note: It is assumed that the person has already worked with them for a short time.

- Deep understanding of the API

### 4.5.3. Virtualization

- What is virtualization.
- Understanding what virtualization is for.

- Working with libraries for data virtualization.

- Understanding and using virtualization.
- Rendering Optimization

### 4.5.4. useMemo, useCallback

- Differences between useMemo and useCallback.
- Understanding what and when to use.

- Optimizing the work of these hooks.
- How to avoid excessive memoization.

### 4.5.5. Lazy imports, dynamic imports

- Understanding the concept at a basic level.
- What is lazy loading of components for?

- Ability to apply in practice.
- Explain how lazy loading works.

### 4.5.6. Concurrent Mode and Suspense

- Understanding Concurrent Mode.
- Ability to explain in your own words.

- Good understanding of Concurrent.
- Application of UI patterns Concurrent.

- Good understanding of the Concurrent API.

### 4.5.7. Bundle optimization "

- lazy-loading
- tree shaking

- import cost
- webpack optimization
- chunks

- caching,
- webpack,
- internal react tools

### 4.5.8. React devtools, redux devtools

- react/redux devtools usage

- Ability to work with React devtools, Redux devtools at a good level, saving variables

- Ability to profile components.
- Optimize component performance

### 4.5.9. Service workers

- Ability to explain in your own words where service workers can be useful

- Good understanding of how service workers work.
- Using native service workers in the project, or using third-party libraries

- Deep understanding of the topic.
- How to register a worker.
- Reasons why the service worker did not register.
- Working with the cache, etc.

### 4.5.10. SSR (server side rendering)

- ReactDOMServer
- Basic understanding of hydration

- renderToString,
- renderToStaticMarkup,
- renderToNodeStream,
- renderToStaticNodeStream.
- Understanding what is needed, the ability to work with it.

- Deep understanding of SSR, how it works.
- Ability to describe a given concept.
- Probably have experience with NextJS, Gatsby

## 4.6. TESTING

### 4.6.1. Jest, Enzyme and other tools

- What are jest and enzyme for.
- Basic understanding of writing tests.

- Good understanding of how to test various entities: components, utilities, HOCs, modals.
- Basic application of test patterns.

- Application of test patterns.
- Testing pyramid.
- Working with TTD approach is possible.

### 4.6.2. Snapshot testing, components testing

- basic understanding of snapshot testing, why it can be used
- working experience with snapshot testing

### 4.6.3. e2e

- Understanding what e2e tests are for,
- Difference from unit, integration tests

- Used one of the libraries / frameworks for writing e2e tests. Note: e.g. Cypress"

- Write e2e tests on a regular basis in projects

## 4.7. ROUTING

### 4.7.1. React router

- Knows how to work with react-router

- Can explain in his own words how it works

- Understanding and ability to explain at a good level how react-router works.
- Optional: Can write his own basic implementation

### 4.7.2. Hooks routing

- Know which hooks are used for routing.
- Apply them into practice.

- Writing custom hooks for routing.

### 4.7.3. React-router API

- Basic understanding of API components: Route, Switch, Link
- Good knowledge of what Route, Switch, Link and Redirect are for

- Deep understanding of the topic.
- Know and be able to explain what BrowserRouter, StaticRouter etc. are for.

### 4.7.4. history, location, match

- Understanding and the ability to explain what is needed and how to work with it.
- Difference from native implementation.

### 4.7.5. Lazy routes

- see lazy imports see lazy imports see lazy imports

### 4.7.6. Connected react router

- why it can be used, basic usage experience
- deep understanding of the topic and how it can be implemented from scratch

## 4.8. SERVER INTERACTION

### 4.8.1. Working with api

- Axios, Fetch

- Be able to explain at a high level how to interact with the server in React, React + Redux, etc.

### 4.8.2. mock servers

- What is a mock server.
- Basic understanding of what mock servers are for.

- Ability to work with json-server, json-graphql-server or any other, depending on technologies.

### 4.8.3. Websockets with react

- Basic understanding of how and why to use a websocket connection in an application.

- What is needed for this in the react.
- Possibly worked using third party libraries.

- Deep understanding of how web sockets work.
- Ability to explain the details of the work

## 4.9. REDUX

### 4.9.1. 3 redux main principles

- Understand and be able to explain in detail what Redux is for.
- Describe how it works.
- What entities are used in it.

### 4.9.2. HOC connect

- Understanding what connect is for
- What role does it play in the application architecture
- Know and be able to tell about this HOC

### 4.9.3. Actions

- Confident understanding of actions as an entity

### 4.9.4. Reducers

- Basic understanding of the work of a reducer: what basic rules it must comply with.
- Confident writing of the reducer.

- Working with a reducer through switch / case
- redux-toolkit usage

- Work with a reducer using the open/close principle (SOLID)

### 4.9.5. Middlewares

- Understanding the concept of middleware

- Ability to write your own middleware

- Deep understanding of the concept

### 4.9.6. Selectors

- Understanding what selectors are for.
- Ability to explain in your own words

- Deep understanding of what selectors are for.
- Ability to write complex selectors

### 4.9.7. Redux-forms

- How redux-forms works in react+redux ecosystem

- Understanding how and what redux-form is used for.
- Understanding the API

- Confident understanding of the library, regular use in your projects.
- Strong knowledge of the API

### 4.9.8. Redux alternatives

- One of: MobX, Redux-Sagas

- One of: Apollo, Relay
- Basic GraphQL server side

## 4.10. HOOKS

### 4.10.1. Why hooks?

- What are hooks in React.
- The ability to explain the benefits of hooks in your own words.

- Good understanding of hooks.
- Ability to work with hooks.
- Why you can't use hooks inside conditions, loops and nested functions.
- How to implement branching in hooks.

- Ability to work with hooks at a high level.
- Optimize hooks.
- Writing custom hooks.

### 4.10.2. useEffect

- Understand what lifecycle methods this hook can replace.
- What is the second argument for
- how to unsubscribe from changes

### 4.10.3. useState/useReducer/useContext

- Ability to work with basic hooks.
- Explain in your own words how useState and useReducer work.
- What parameters are accepted.

- Good knowledge of the topic.
- Understand when to use this or that hook.

### 4.10.4. useCallback/useMemo

- understanding when and how use this hooks

### 4.10.5. Custom hooks

- Understanding the concept of custom hooks
- Ability to write simple custom hooks

- Writing complex hooks

### 4.10.6. Other hooks

- Understanding what useRef is for
- useImperativeHandle
- useLayoutEffect
- useDebugValue

- Work with third-party libraries. Note: e.g. react-use

# 5. TypeScript

## 5.1. TYPES

### 5.1.1 Basic

- Basic types provided by TS (void, never, unknown, Tulip, etc.);
- Union types;
- Literal types;

- Types casting;
- Generics (simple generics, class generics);

- Void as an alias (void ~ undefined | null);
- Generics (generics extending, class types in generics);

### 5.1.2 Interface

- Difference between interface and class;
- Optional properties;
- Readonly properties;
- Function types for interfaces;

- Indexable types;
- Interfaces for classes. Class as interface;

- Interface with construct signature;
- Hybrid interfaces/types;

### 5.1.3 Functions

- Typing the function;
- Rest params in function typing;
- Optional params;

- Typing 'this'

- Overloads for function type

## 5.2 CLASSES

### 5.2.1 Modifiers

- Access modifiers;
- Parameter properties;

- Abstract class;

- Private constructor;

## 5.3 EXTRA

### 5.3.1 Enums

- Number/string enums;
- Static/computed enums;

- Behavior in runtime/compile time;

### 5.3.2 Declaration files

- Why do we need declaration files?
- 'declare' keyword;

- Namespaces;

- Best practice for typings;

# 6. Software Development Processes

## 6.1 PROCESS PLANNING (SDLC)

- understanding of primary SDLC models;
- applying principals of selected SDLC model in practice;

- scaling projects in the context of selected SDLC model;
- defining unit-testing process in the context of selected SDLC model;
- defining code review process in the context of selected SDLC model;

## 6.2 BUG TRACKING SYSTEMS (JIRA, REDMINE, TFS)

- understanding of the purpose of using such systems;

- understanding and basic usages of Board, Dashboard and Plugins;

- setup and configuration Boards and Dashboards;
- setup and configuration Plugins (GitHub, Jenkins, Bitbucket, etc.);
- applying tuning Queries.

## 6.3 VERSION CONTROL SYSTEM (GIT)

- fundamental concepts of group work and version control;
- basic operations;
- branching, tagging, merging changes from specific branch;

- configuring repository;
- importing and exporting sources;
- blaming (annotate);
- resetting vs reverting changes;

- developing and implementing versions control infrastructure;
- revision graph/log actions;
- creating policy documents;
- applying patches;

## 6.4 ESTIMATIONS

- providing estimates of efforts required for implementing the tasks based on defined WBS;

- estimating complex tasks, verifying given estimations against personal and company experience;
- effectively using concepts like WBS, Gantt charts, critical path for estimating work efforts, suggesting required project team, estimating schedule of development;
- estimation of wide scope of a project, like phase scope, release scope, etc.;
- PERT analysis

- writing comprehensive evaluation reports with reasonable assumptions, technical and organization risks identified;
- using Historical Data to Refine Your Estimates;
- parametric models;
- estimation of a project on the phase of pre-sale.

## 6.5 DEVELOPMENT METHODOLOGIES (AGILE, SCRUM/KANBAN, WATERFALL ECT.)

- definition of agile;
- definition of scrum and kanban. Base concept;
- agile vs scrum/kanban;

- definition of waterfall. Waterfall methodology life cycle;
- agile life cycle;
- waterfall vs agile;
- detailed concept of scrum;
- scrum team. Roles;

- scrum planning from start to end. Artifacts and events;
- kanban planning from start to end. Artifacts and events;

# 7. Software Engineering Practices

## 7.1 ARCHITECTURE AND DESIGN

- knowing and using design patterns (3 major groups of GoF design patterns);
- knowing and ability to apply macroachitectural patterns (MVC, MVP, MVVM, Modularity, Layered Architecture, IoC, SOA, EDA, DDD, Event Sourcing, Microservice Architecture, etc.);
- compatibility with previous and future versions;
- basic UML understanding: Use Case, Class Diagram, Entity Relationship, Data Flow Diagrams;

- architecture qualities;
- advanced UML understanding: Component, Package, Deployment, Activity, Sequence Diagrams, etc.;
- patterns of Enterprise Architecture Applications;
- cloud types and service models;
- cloud computing patterns.

## 7.2 OOP

- knowing difference between class and object;
- difference between prototypical inheritance and classic inheritance;
- definition for inheritance, polymorphism, encapsulation, abstraction;

- practiced understanding of polymorphism;
- SOLID principles;

- GRASP;

## 7.3 FUNCTIONAL PROGRAMMING

- what is functional programming?
- functional programming basics (first class function, higher order function, lambda functions, data immutability, lazy evaluation, recursion, pure functions);

- imperative vs functional programming;
- functors and monads;
- functional composition. Currying;

- Practical examples of pure functions;
- Tail call optimization;

## 7.4 REACTIVE PROGRAMMING

- what is reactive programming?
- main bricks (stream, observable, subscription, etc.)

- implementation challenges;

- Reactive system. Four characteristics (responsive, resilient, elastic, message driven);

## 7.5 Algorithms and data structures

- Algorithm definition;
- Basic Data Structures;

- Big-O Notation;
- Understanding of sorting and searching algorithms;

- Algorithm complexity calculation;

## 7.6 BUILDS AND CI/CD

- automated build concept;
- building with build tool (gulp/grunt, webpack, bazel ect. ...), cleaning up built product;

- developing/editing build scripts on CI (teamcity/hudson/jenkins/stride/travis/bamboo, etc.);
- scripting multiphase (build, testing, deployment, …) build process;
- integrating building of product installer;
- generating release notes and/or other release documentation;
- development of scheduled builds (night builds);
- monitoring build process;
- build status reporting (notification);
- integrating deployment stage, moving product to release area;
- integrating with source control, versioning, tagging, building releases;

- continuous integration concept, best practices and framework;
- choosing appropriate tools for build environment;
- launching build from command line;
- cleaning up build outcomes;
- automating trivial build process with simple tools and shell;
- experience of Software Configuration Management and the associated tools;
- creating release documents.

## 7.7 Troubleshooting/Logging/Monitoring

- Basic understanding of debugging process;

- Web-browser console usage;
- Basic understanding logging process;

- Usage and Configuration of 3rd part Profilers;
- Usage and Configuration of 3rd party logging tools;
- Usage and Configuration of 3rd party Monitoring tools;

## 7.8 NETWORK

### 7.8.1 REST

- What is REST?
- Request caching as one of the architectural constraints;
- Six architectural constraints;

### 7.8.2 GraphQL

- What is GraphQL?
- GraphQL vs REST;

### 7.8.3 AJAX

- What is AJAX?
- Basic usage of XHR (how to make simple request and handle answer);
- CRUD HTTP methods;

- OPTIONS, HEAD, PATCH HTTP methods;
- Difference between PUT, PATCH, POST;
- AJAX vs COMET;

- CONNECT and TRACE HTTP methods;
- Advanced usage of XHR;

### 7.8.4 CORS

- Why do we need CORS?
- CORS headers;
- JSONP vs CORS;

### 7.8.5 Long polling

- How it works?
- Long polling vs regular polling;
- Area of usage;

### 7.8.6 Web Socket

- API methods;
- API events;

- Cross-origin limitations;
- Ways of integration;

- Extensions and subprotocols;

### 7.8.7 Server Sent Events

- API methods;
- API events;

- CORS with EventSource;

- EventSource vs WebSocket;

## 7.9 SECURITY AND CRYPTOGRAPHY

- HTTP & HTTPS protocols. Differences and Similarities.
- Storing Passwords and hashing capabilities. Difference between hash and hmac.
- Form and URLs attacks (CSRF, XSS, Semantic URLs problem etc.)
- Input Data Filtering.

- Understanding Threats: Defacement, Infiltration, Phishing, Pharming, DoS- Session Management Attacks
- Attacks against JSON - JSON Hijacking
- Cryptography: Symmetric Key Cryptography
- Cryptography: Asymmetric Key Cryptography

- SSI injection;
- Authentication and Access Control Attacks;
- OWASP Top 10 vulnerabilities;
- TLS/SSL protocol understanding;

## 7.10 REFACTORING

- understanding refactoring concept;

- code smells catalog;
- anti-patterns;
- participating in technical debt management process;
- deployment and maintainability;

- refactoring to Patterns;
- defining and documenting technical debt policy;
- tracking technical debt regularly and reporting for stakeholders (Team, PM, Product Owner, Client).

## 7.11 TESTING PROCESSES

- Basic concepts: Test Plan, Test Suite, Test Case
- Different test types concepts: Unit / Integration / Functional ...
- Properties of a good unit test - F.I.R.S.T
- JS Unit basics

- Testing Pyramid
- Test first development techniques (TDD and BDD)
- Test Fixtures concept
- Breaking the dependency and Interaction testing: Stubs, Mocks

- BDD in JS
- JavaScript Testing
- Jasmine or Mocha + Chai + Sinon
- KarmaJS -Jest

## 7.12 CODE REVIEW AND CODE STANDARDS

- Following code conventions defined on a project;

- Code Review concept
- Regularly reviewing of other's code and providing code for review;
- Pull Request technique, Code review with special tools (Cruciable, Upsource etc.)
- Software metric concept and some common metrics: (SLOC, code coverage, cohesion, coupling, cyclomatic complexity)

- Expertise in working with JS code quality tools (ESLint, JSHint, TSLint)
- Creating code policy documents
- Using web services to validate code quality (e.g. SonarQube)
