# google-material-color

[![GitHub version](https://badge.fury.io/gh/danlevan%2Fgoogle-material-color.svg)](http://badge.fury.io/gh/danlevan%2Fgoogle-material-color)
[![npm version](https://badge.fury.io/js/google-material-color.svg)](http://badge.fury.io/js/google-material-color) [![Bower version](https://badge.fury.io/bo/google-material-color.svg)](http://badge.fury.io/bo/google-material-color)

[Google material color](http://www.google.com/design/spec/style/color.html#color-color-palette) implementation for Sass, Less, Stylus, CSS and JS.

> This color palette comprises primary and accent colors that can be used for illustration or to develop your brand colors. They’ve been designed to work harmoniously with each other.
([http://www.google.com/design/spec/style/color.html](http://www.google.com/design/spec/style/color.html#color-color-palette)).

See the [demo](http://danlevan.github.io/google-material-color/test/) generated by the tests.

## Installation

* Download the files you need from the [dist](dist) directory:
  * Stylus:  [palette.styl](http://danlevan.github.io/google-material-color/dist/palette.styl)
  * Less:  [palette.less](http://danlevan.github.io/google-material-color/dist/palette.less)
  * Sass (SCSS) 3.3+:  [palette.scss](http://danlevan.github.io/google-material-color/dist/palette.scss)
  * CSS:  [palette.css](http://danlevan.github.io/google-material-color/dist/palette.css)
  * CSS variable:  [palette.css](http://danlevan.github.io/google-material-color/dist/palette-var.css)
  * JS:  [palette.js](http://danlevan.github.io/google-material-color/dist/palette.js) supports (AMD, node, browser)
* NPM: `$ npm install google-material-color --save`
* Bower: `$ bower install google-material-color --save`
* Git: `$ git clone git://github.com/danlevan/google-material-color.git`

## Colors

Details can be found on the [google design specs website](http://www.google.com/design/spec/style/color.html#color-color-palette).

**Colors**
> Red, Pink, Purple, Deep Purple, Indigo, Blue, Light Blue, Cyan, Teal, Green, Light Green, Lime, Yellow, Amber, Orange, Deep Orange, Brown, Grey, Blue Grey

**Shades** (note that not all color have all the shades)
> 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, A100, A200, A400, A700


## Usage

### Stylus

Import [palette.styl](http://danlevan.github.io/google-material-color/dist/palette.styl) and call the function `palette('[color]', '[shade]')` in your styl file.

> The shade is optional (500 is the default shade).

`example.styl`

```stylus
@import 'palette'
...

.my-div
  background-color palette('Light Blue', '700')
  color palette('Red') // default shade is 500
```

> If you need direct access to the variables, you can access it like `$palette['Light Blue']['500']`

### Sass (SCSS)

Import [palette.scss](http://danlevan.github.io/google-material-color/dist/palette.scss) and call the function `palette([color], [shade])`.

> The shade is optional (500 is the default shade).

`example.scss`

```scss
@import 'palette';
...

.my-div {
  background-color: palette(Light Blue, 700);
  color: palette(Red); // default shade is 500
}
```

> If you need direct access to the variables, you can access it through a map like `$colorMap: map-get($palette, Light Blue); $color: map-get($colorMap, 700);`.

### Less

Import [palette.less](http://danlevan.github.io/google-material-color/dist/palette.less) and call the mixin `.palette([color], [shade])`.

> The shade is optional (500 is the default shade).

`example.scss`

```less
@import 'palette';
...

.my-div {
  .palette('Light Blue', '700');
  background-color: @palette;

  // get @palette in its own scope otherwise @palette will be overwritten
  &{
    .palette('Red'); // default shade is 500
    color: @palette;
  }
}

```

If you need access to the variables, you can access it through variable like `@palette-Light-Blue-500`


### CSS

Include [palette.css](http://danlevan.github.io/google-material-color/dist/palette.css) in your html. The CSS class follows the pattern `palette-[color]-[shade]` (spaces replaced by `-`).

The CSS provides colors for the background and text
* `background-color`: by adding the `bg` class to the element
* `color`: by adding the `text` class to the element

`example.html`

```html
<link href='palette.css' rel='stylesheet' type='text/css'>
...

<div class="palette-Light-Blue-700 bg">
  The background is Light Blue
</div>

<div class="palette-Light-Blue-700 text">
  The text is Light Blue
</div>
```

### CSS variable

If you're using cssnext, this project also includes a variable files for css. Read more here [Custom properties](http://cssnext.io/features/#custom-properties-var).

Include [palette.css](http://danlevan.github.io/google-material-color/dist/palette-var.css) in your html.
```css
:root {
  --Red-50: #FFEBEE
  --Red-100: #FFCDD2
  --Red-200: #EF9A9A
  ...
```

### JS

You can import the [palette.js](http://danlevan.github.io/google-material-color/dist/palette.js) file in Node.js, and AMD module or the browser.

`example.html`

```javascript
<script src='../dist/palette.js'></script>
...

<script>
  document.getElementById('my-div')
    .style['background-color'] = palette.get('Light Blue', '700');
</script>
```


## Issues

Search or open new issues [here][issues].

If you would like to suggest improvements or other libraries, you can also open an issue.

## Contributing

### Fork

Feel free to fork the project

    $ git clone git://github.com/danlevan/google-material-color.git

### Running this

Install [gulp](http://gulpjs.com/)

    $ npm install --global gulp

Install the package

    $ npm install

Run `gulp` to build the packages. The packages are in /dist/.

    $ gulp

Run `gulp test` to build the test page. The test page can be found in /test/.

    $ gulp test

## Release History
See the [changelog](CHANGELOG.md)

## License

Licensed under [MIT](LICENSE).

Google material design [Terms](http://www.google.com/design/spec/style/color.html).


[issues]: https://github.com/danlevan/google-material-color/issues "GitHub Issues for Less.js"
[download]: https://github.com/less/less.js/zipball/master "Download Less.js"
