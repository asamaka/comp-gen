import { getParameters } from './import-utils/api/define';
export function createCompFiles(comp, styles, compName) {

    const parameters = getParameters({
        files: {
            'src/index.js': { content:
                `import React from 'react';
                import ReactDOM from 'react-dom';
                import {${compName}} from './component'
                ReactDOM.render(
                    <React.StrictMode>
                        <${compName} />
                    </React.StrictMode>,
                    document.getElementById('root')
                );`
            },
            'src/component.js': {
                content: `
                //TASK DETAILS:
                // Implement this component using styled components
                // ONLY implement the part of the design in the image and not the entire design
                // All css needs to be in componentStyels.js and imported here as styled components.
                // The final design should look exactly like the screenshot and follow all design specs.
                // The final desgin has to be responsive (looks nice in both large and small screens).
                // The scope is only what's inside the screenshot and not the entire design
              
                //TODO:
                // Modify the return code below to display the component as per the image screenshot linked below
                // Make sure yo use the props and state for any dynamic data (don't hardcode dynamic data for test)
                // To test, pass your test data as props to the component in the index.js file
                // Test for responsivness by changing the size of the screen from very large (1200px) to very small (300px)
                // The index.js should only display this component and not the entire screen in the design link
              
                ${comp}
                `,
            },
            'src/componentStyles.js': {
                content: styles,
            },
            'package.json': {
                content: {
                    "name": "template",
                    "version": "0.1.0",
                    "private": true,
                    "dependencies": {
                      "@testing-library/jest-dom": "^5.14.1",
                      "@testing-library/react": "^11.2.7",
                      "@testing-library/user-event": "^12.8.3",
                      "react": "^17.0.2",
                      "react-dom": "^17.0.2",
                      "react-scripts": "4.0.3",
                      "styled-components": "^5.3.0",
                      "web-vitals": "^1.1.2"
                    },
                    "scripts": {
                      "start": "react-scripts start",
                      "build": "react-scripts build",
                      "test": "react-scripts test",
                      "eject": "react-scripts eject"
                    },
                    "eslintConfig": {
                      "extends": [
                        "react-app",
                        "react-app/jest"
                      ]
                    },
                    "browserslist": {
                      "production": [
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                      ],
                      "development": [
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                      ]
                    }
                  },
            },
        },
    });

    window.location.href = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;
}