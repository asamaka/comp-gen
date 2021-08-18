import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

import { createCompFiles } from './utils'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function CreateProp() {
    const [comp, setComp] = useState({})
    const classes = useStyles();
    useEffect(() => {

    }, [comp])
    return <div>
        <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    
                    <Typography variant="h4" color="inherit" noWrap align="center">
                        Generate Component Code
                    </Typography>
                    <Box m={4} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField fullWidth label="Component Name" variant="outlined" onChange={(n) => setComp({ ...comp, name: n.target.value })} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField fullWidth label="Screenshot Link" variant="outlined" onChange={(i) => setComp({ ...comp, designImg: i.target.value })} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Design Link" variant="outlined" onChange={(d) => setComp({ ...comp, designLink: d.target.value })} />
                        </Grid>
                    </Grid>
                    <p> Props: </p>
                    <Editor
                        value={{}}
                        onChange={(p) => setComp({ ...comp, props: p })}
                    />
                    <p> State: </p>
                    <Editor
                        value={{}}
                        onChange={(s) => setComp({ ...comp, state: s })}
                    />
                    <Button fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        variant="outlined" onClick={() => {
                            createCompFiles(componentFile(comp), stylesFile(), comp.name)
                        }} >Generate Sandbox</Button>


                </Paper>
            </main>
        </React.Fragment>


    </div>
}


function componentFile(comp) {
    return "\n    import React, {useState} from \"react\"\n import {Div} from './componentStyles'\n   export function " + comp.name + " (" + keySet(comp.props) + ") {\n        " + defineUseState(comp.state) + "\n        return (<Div>\n            " + design(comp) + "\n                </Div>\n        )\n    }";
}
function stylesFile() {
    return "\n    import styled from \"styled-components\";\n    export const Div = styled.div`\n        width: 100%;\n    `;\n    ";
}
function defineUseState(state) {
    return state ? Object.keys(state).map(function (s) {
        return "const [" + s + ", set" + (s.charAt(0).toUpperCase() + s.slice(1)) + "] = useState(" + state[s] + ")";
    }).join("\n") : "// no state";
}
function design(comp) {
    return link(comp.designLink, img(comp.designImg));
}
function img(url) {
    return "<img alt=\"design\" src=\"" + url + "\"/>\n";
}
function link(url, text) {
    return "<a href=\"" + url + "\">" + text + "</a>\n";
}
function importSingle(name) {
    return "import " + name + " from \"./" + name + "/" + name + "\"";
}
function consumeSelf(comp) {
    return "<" + comp.name + " " + keySelfValues(comp.props) + "/>";
}
function definePropValues(props) {
    var p = Object.keys(props).map(function (prop) {
        var params = JSON.stringify(props[prop]).match(/\(.*\)/);
        return params ? "let " + prop + "=" + params + "=>console.log" + params : "let " + prop + "=" + JSON.stringify(props[prop]);
    }).join("\n");
    return p;
}
function keySelfValues(props) {
    var p = Object.keys(props).map(function (prop) {
        var params = prop === null || prop === void 0 ? void 0 : prop.match(/\(.*\)/);
        return params ? prop + "={" + params + "=>console.log" + params + "}" : prop + "={" + prop + "}";
    }).join(" ");
    return p;
}
function keySet(props) {
    if(!props) return "{}"
    var p = Object.keys(props).map(function (prop) {
        return "" + prop;
    }).join(", ");
    return "{" + p + "}";
}