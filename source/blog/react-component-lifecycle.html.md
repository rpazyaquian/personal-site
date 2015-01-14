---
title: React Component Life Cycle
---

# React Component Life Cycle

Ever run into a problem where you want your component to render something, but that something needs a DOM node before it works? If you've ever tried to, for example, render a Google Map object in the `render` method of a React class, you've probably noticed that it won't work.

Let's say we have this React class being rendered:

    var GoogleMap = React.createClass({
      render: function() {

        // location of center
        var lat = 42.3493307;
        var lng = -71.0500077;

        var mapCenter = new google.maps.LatLng(lat, lng);

        // options for rendering map
        var mapOptions = {
          center: mapCenter,
          zoom: 17
        };

        // node to render map to
        var mapNode = document.getElementById('map');

        // our Google Map
        var map = new google.maps.Map(mapNode, mapOptions);

        // what our DOM node looks like
        return (
          <div className='map' id='map'>
            map goes here yo
          </div>
        );
      }
    });

    React.render(<GoogleMap />, document.body);

The reason why this fails is that the Google Maps API expects your target DOM node to exist by the time you call `new google.maps.Map`, and that will only happen *after* the components render. Which means that this doesn't work:

    render: function() {

      // [...]

      // we want to declare our map's node to be
      // the div with id 'map'...
      var mapNode = document.getElementById('map');

      var map = new google.maps.Map(mapNode, mapOptions);

      // ...but that doesn't exist yet!
      return (
        <div className='map' id='map'>
          map goes here yo
        </div>
      );
    }

Notice how `map` is declared before the function returns? This means that `new google.maps.Map` is called before the component node is actually rendered to the DOM, i.e. before it actually exists. So, in this example, you can't supply a node for the map to attach to. What to do?

## `componentDidMount`

This is where `componentDidMount` comes in handy. `componentDidMount` is called *after* the component has already rendered to the DOM, meaning that its node can be found using functions like `document.getElementById`. **Anything that requires a DOM node to exist should be performed in this method.** This includes objects like our Google Map.

`componentDidMount` allows you to circumvent the "Uncaught Node Not Found :(" disaster by getting the component's root node using `this.getDOMNode`.

    componentDidMount: function() {

      // [...]

      // get our component's root DOM node
      var rootNode = this.getDOMNode();

      console.log(rootNode);
      // this will log something like
      // `<div class='map' data-reactid='.0'>map goes here yo</div>
      // to the console, which is exactly what we want

      // [...]
    },
    render: function() {
      return (
        <div className='map'>
          map goes here yo
        </div>
      );
    }

This means that our node *does* exist by the time we want to make our map, and the Google Maps API won't complain about it not existing. What we need to do now, then, is to move our map-creating and rendering code to `componentDidMount` instead!

A working version of this code is hosted on [JSFiddle](http://jsfiddle.net/69z2wepo/619/) and looks like this:

    var GoogleMap = React.createClass({
      componentDidMount: function() {

        var lat = 42.3493307;
        var lng = -71.0500077;

        var mapCenter = new google.maps.LatLng(lat, lng);

        var mapOptions = {
          center: mapCenter,
          zoom: 17
        };

        var mapNode = this.getDOMNode();

        // now we have a node to attach the map to!

        var map = new google.maps.Map(mapNode, mapOptions);
      },
      render: function() {
        return (
          <div className='map'>
            map goes here yo
          </div>
        );
      }
    });

    React.render(<GoogleMap />, document.body);

The `componentDidMount` method is also where you should put AJAX requests and integrations with other Javascript frameworks. AJAX requests should happen after the component already exists.

Remember, if you need to do something that should occur after the component has been rendered, use `componentDidMount`!