# ReactJS

## Create new app

```javascript
npx create-react-app myApp; //it will create app inside myApp directory

npx create-react-app .; //it will create app inside current directory
```



## Ways to declare a functional component

First letter of functional component name must be Capital.

Must have a return statement.

```javascript

export default function App(){
   
    //for single element
    return <div>Hello</div>; 
    
    //for multiple elements
    return (
        <div>1st</div>
         <div>2nd</div>
    ); 
}

//or
function App(){
}
export default App;

//or
const App = () =>{
}
export default App;
```

## Self-closing tag

Self-closing tag can be used for custom components.

```
 return (
        <MyComponent/>
    ); 
```



## State management in functional component

```javascript
import React, {useState} from "react";

function App(){
	const [variableName,  functionNameToChangeValue] =   useState(initialValue);
	return (
		//some jsx
	);
}
```

## Fragment

```javascript
<>
 //Multiple element must be in react fragment.
</>
```

## Template literals

Backtick ` is used to make a template literal.

It is used to mix string and js expressions.

```javascript
const fName = "Saumitra";
const lName = "Paul";
console.log(`My first name is ${fName}`);

//First {} used to write js in jsx.
<h1>{`My name is ${fName}` ${lName}}</h1>
```



## Style

```javascript
import './app.css';
//or 
import Style from './app.css';
<div className={Style.boxshadow}/> </div>
```



https://www.youtube.com/watch?v=Law7wfdg_ls&list=PLDyQo7g0_nsVHmyZZpVJyFn5ojlboVEhE&index=3



## Arrow Function

### With multiple parameters

```javascript

//Normal function with two parameters
function sum(a,b){
	return a+b;
}
//Arrow function

//No need to use {return a+b } if this is a single line statement
const/let sum = (a,b) => a + b;

//use {return a+b } as this is a multi-line statement
const/let sum = (a,b) => {
	c = a + b;
	c = c * 100;
	return c;
}
```

### With single parameter

```javascript
//Normal function
function isPositive(number){
	return number >= 0;
}

//Arrow function
//No need to use parenthesis for single parameter
//No need to use curly braces and return keyword (i.e. {return a+b }) if this is a single line statement
const/let isPositive = number => number >=0;
```

### With no parameter

```javascript
//Normal function
function randomNumber(){
	return Math.random;
}

//Arrow function
const/let randomNumber = () => Math.random;
```



## State vs. Props

### State 

- State is handled inside a component
- State can be updated inside the component
- State is useful inside a form

### Props

- Props is passed into a component
- Props are handled outside of a component.
- Must be updated outside of the component

## Props or Properties

props/properties is a js object.

```javascript
export default function App(props){
	return <div>{props.name}</div>; 
}
```

## Inline CSS

```javascript
export default function App(props){
	return(
        	<div style={{backgroundColor:"red"}}>
        		Hi
    		</div>
    ); 
}
```

## Controlled Form

Thana technical https://www.youtube.com/watch?v=C2IVQFGobA0&list=PLwGdqUZWnOp3aROg4wypcRhZqJG3ajZWJ&index=38

https://www.youtube.com/watch?v=ECbcqkqtkTk&list=PLwGdqUZWnOp3aROg4wypcRhZqJG3ajZWJ&index=39

## HTTP Post Request with axios

https://www.youtube.com/watch?v=x9UEDRbLhJE

[Codevolution](https://www.youtube.com/channel/UC80PWRj_ZU8Zu0HSMNVwKWw)

Best tutorial - https://www.youtube.com/watch?v=oQnojIyTXb8

[Paul Halliday](https://www.youtube.com/channel/UCYJ9O6X1oFt7YGXpfRwrcWg)

## Fetching data with useEffect Part 3

https://www.youtube.com/watch?v=zm_09NER-R0

[Codevolution](https://www.youtube.com/channel/UC80PWRj_ZU8Zu0HSMNVwKWw)

## Learn useEffect In 13 Minutes

https://www.youtube.com/watch?v=0ZJgIjIuY7U

## React Router DOM

```javascript
import Nav from "./Nav";
import About from "./About";
import Contact from "./Contact";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App(){
    
    return(
        <Router>
        	 <Switch>
	        	<Nav/>
        			<Route exact path="/" component={Home}/>
		        	<Route path="/about" component={About}/>
					<Route path="/contact" component={Contact}/>
              </Switch>  
        </Router>
    );
}



class App extends Component {

  render() {

    return (
      <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect to="/"/>
        </Switch>
      </Router>
      </div>
    );
  }

}

export default App;
```

## Reactjs - How to load component after successful login

https://stackoverflow.com/questions/58535557/reactjs-how-to-load-component-after-successful-login-with-githubfirebase