[![react-mirror](http://37.187.9.5/public/mirror.gif)](http://theadd.github.io/react-mirror/demos/react-motion-demo2/)
# react-mirror
Mirror any react component.

Given any wrapped react component, e.g. `<Surface>`<kbd>component</kbd>`</Surface>`, **react-mirror** allows you to mirror those components within any other component's `render` method, placing any number of `<Mirror />`.

#### &#10145; [DEMO + PLAYGROUND](http://theadd.github.io/react-mirror)
![react-mirror](http://37.187.9.5/public/cube-of-mirrors.gif)

<blockquote><sup>-- <em>Each mirror is a full clone of the DOM Node it reflects, being replaced by a new clone for each reported mutation. Therefore, don't use this method in order to get a <strong>performance</strong> boost.</em> --</sup></blockquote>


## **API** 

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### **Sample Usage**

```js
class Demo extends Component {

  componentDidMount () {
    this.refs.mirror.reflect(this.refs.surface)
  }

  render () {
  
    return (
      <div>
        <Surface ref="surface">
          <SomeOtherComponent />
        </Surface>
        <Mirror ref="mirror" />
      </div>
    )
  }
}
```

### **&lt;Surface /&gt;**

**Surface** will render any react component without being appended to the DOM tree.

PARAMS | DEFAULT | DESCRIPTION
------:|:--------|:------------------------
<sub>__`initialMirror`__</sub>   | <sub>`true`</sub>  | <sub>Automatically creates a `Mirror` for this `Surface`.</sub>


### **&lt;Mirror /&gt;**

<h4><code><kbd>Mirror</kbd>.reflect([<var>object</var> <kbd>surface</kbd>])</code></h4>
Changes the `Surface` being reflected by this mirror. Stops mirroring when no surface is specified (or `null`).
