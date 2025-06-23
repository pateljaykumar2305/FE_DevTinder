import React from 'react'
let count = useState(10);

console.log(state.count);

const arr = [1, 2, 3, 4, 5];

const App = () => {

    return (
        <>
        <div>
          arr.map((value , index) => {
            return (
                <div key={index}>
                    {value}
                </div>
            )       
          })
        </div>
        </>

    )
}

exprort default App;