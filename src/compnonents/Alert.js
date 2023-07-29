// import React from 'react'

// const Alert = (props) => {
//     return (
//         <div>
//             <div className="alert alert-primary" role="alert">
//   {props.message}
// </div>
//         </div>
//     )
// }

// export default Alert

import React from 'react'

function Alert(props) {
    const capitalise=(word)=>{
        const low = word.toLowerCase();
        return low.charAt(0).toUpperCase() + low.slice(1);
    }
    return (
        <div style ={{height: '50px'}}>
       {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{capitalise(props.alert.type)}</strong> : <strong>{props.alert.msg}</strong>
</div>}
</div>
    )
}

export default Alert