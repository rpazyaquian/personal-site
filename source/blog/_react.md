# React

I've delved into [React](http://facebook.github.io/react/), Facebook's UI library, and I'm rather fond of it. It works somewhat differently than other approaches to UI in it creates *components* and only **ever** components, it employs *one-way data binding*, and it separates the concepts of *properties and state*. These two things are, in my opinion, what really set React apart and make it an intuitive and agreeable framework.

## Simple and Declarative

All you need to do with React is to express how your app looks at any given time. React manages all UI changes when the underlying data changes. For example, an object that contains the current time will have its matching React component update whenever that time changes. React knows to update upon data change, and only updates the parts of the DOM that have changed - making it extremely efficient.

## The Component

The basic building block of React is the component. A component is like a function that takes in *properties* and *state*, and returns HTML.

Components are declared like this:

    var HelloWorld = React.createClass({
      render: function() {
        return (
          <p>
            Hello, World!
          </p>
        );
      }
    });

React components have (at the very least) a `render` function, which returns the HTML to be written to the DOM every time this component updates.

## One-Way Data Binding

Coming soon!

## Properties vs. State

Coming soon!

## Children, Parents, and Siblings

Coming soon!