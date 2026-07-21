// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import './App.css'

//typically would do this in diff file (components file) 
function Friend(props) {
  //waht data (state) 

  //what logic 

  //what event handlers 

  //view 
  return (
  <div key={props.friend.id} className="card m-2 w-25">
    <div className="card-body">
        <h5 className={`card-title ${props.friend.ditched && "text-danger"}`}>{props.friend.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.friend.description}</h6>
        <p className="card-text">{props.friend.comment}</p>
        {!props.friend.ditched && <button className="btn btn-danger">Ditch</button>}
      </div>
    </div>
  );
 
}

function App() {
 // const [count, setCount] = useState(0)

 //prepare the data (state)
//  const num = 17;
//  const word = 'seventeen';
//  const list = [5,6,7,8];

//  //event handlers 


//   return (
//     <>
     
//     </>
//   )
  const friends = [
    {id: 1, name: "Bobbo Bobberson", description: "Fun guy", comment: "Takes it all in stride.", ditched: false},
    {id: 2, name: "Bobbina Schendjornnszan", description: "Deceptively strong", comment: "Great at lifting and toting.", ditched: false},
    {id: 3, name: "Mano Mano", description: "Adversarial", comment: "You don't want this.", ditched: true},
    {id: 4, name: "The Flea", description: "Unironically tiny", comment: "Always a circus around her.", ditched: false}
  ];
          
  return (
    <>
     <div className="container">

        <h1 className="my-4">Friends</h1>

      
      <div className="row">
            {friends.map (friend  =>
            <Friend friend = {friend} key={friend.id}/>
        )}
      </div>
    
    </div>

     </>
  );  

}

export default App



{/* //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p> */
    // 
    
     {/* how we do conditional if's (use expressions)  */}
      // <p> Hello , { num > 10 ? "Good" : "Bad" }</p> 
      // <p> Bye , {word}</p>
      // <p> and , {list}</p>


      // {/* looping in REACT uses map 
      //     just makes a copy of element array
      //     must add key attribute on this list */}
      // <ul>
      //   {list.map ((e,i)=>  <li key={i}>I love {e}</li>)} 
      // </ul>
      }