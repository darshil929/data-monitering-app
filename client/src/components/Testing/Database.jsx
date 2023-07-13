import React from 'react'

function Database(props) {
    const propKeys = Object.keys(props);

    React.useEffect(() => {
        console.log("useEffect")
        propKeys.forEach(prop => {
            console.log(`${prop}: ${props[prop]}`,"hutttttttttttttttttttt paka mat");
        });
    }, [propKeys, props]);

    return (
        <div>
            <p>heyyyyyyyy</p>
        </div>
    )
}

export default Database
