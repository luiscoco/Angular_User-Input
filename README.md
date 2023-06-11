# user-input

## Binding to user input events
You can use Angular event bindings to respond to any DOM event https://developer.mozilla.org/es/docs/Web/Events.
Many DOM events are triggered by user input. Binding to these events provides a way to get input from the user.

To bind to a DOM event, surround the DOM event name in parentheses and assign a quoted template statement to it.

The following example shows an event binding that implements a click handler:

src/app/click-me.component.html
```typescript
<button type="button" (click)="onClickMe()">Click me!</button>
```

The (click) to the left of the equals sign identifies the button's click event as the target of the binding. The text in quotes to the right of the equals sign is the template statement. The statement responds to the click event by calling the component's onClickMe method.

When writing a binding, be aware of a template statement's execution context. The identifiers in a template statement belong to a specific context object, usually the Angular component controlling the template. The preceding example shows a single line of HTML, but that HTML belongs to a larger component:

```typescript
@Component({
  selector: 'app-click-me',
  template: `
    <button type="button" (click)="onClickMe()">Click me!</button>
    {{clickMessage}}`
})
export class ClickMeComponent {
  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
```

When the user clicks the button, Angular calls the onClickMe method from ClickMeComponent.

## Get user input from the $event object
DOM events carry a payload of information that may be useful to the component. This section shows how to bind to the keyup event of an input box to get the user's input after each keystroke.

The following code listens to the keyup event and passes the entire event payload ($event) to the component event handler.

src/app/keyup.components.ts
```typescript
template: `
  <input (keyup)="onKey($event)">
  <p>{{values}}</p>
`
```

When a user presses and releases a key, the keyup event occurs. Angular then provides a corresponding DOM event object in the $event variable which this code passes as a parameter to the component's onKey() method.

src/app/keyup.components.ts (class v.1)
```typescript
export class KeyUpComponent_v1 {
  values = '';

  onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }
}
```

The properties of an $event object vary depending on the type of DOM event. For example, a mouse event includes different information than an input box editing event.

All standard DOM event objects have a target property, a reference to the element that raised the event. In this case, target refers to the input
element and event.target.value returns the current contents of that element.

After each call, the onKey() method appends the contents of the input box value to the list in the component's values property, followed by a separator character (|). The interpolation displays the accumulating input box changes from the values property.

You could also accumulate the individual keys themselves by substituting event.key for event.target.value

## Type the $event
The preceding example casts the $event as an any type. That simplifies the code at a cost. There is no type information that could reveal properties of the event object and prevent silly mistakes.

The following example rewrites the method with types:

src/app/keyup.components.ts
```typescript
export class KeyUpComponent_v1 {
  values = '';
  onKey(event: KeyboardEvent) { // with type info
    this.values += (event.target as HTMLInputElement).value + ' | ';
  }
}
```

The $event is now a specific KeyboardEvent. Not all elements have a value property so it casts target to an input element. The OnKey method more clearly expresses what it expects from the template and how it interprets the event.

## Passing $event is a dubious practice
Typing the event object reveals a significant objection to passing the entire DOM event into the method. Namely, the component has too much awareness of the template details. It can't extract information without knowing more than it should about the HTML implementation. That breaks the separation of concerns between the template, what the user sees, and the component, how the application processes user data.

The next section shows how to use template reference variables to address this problem.

