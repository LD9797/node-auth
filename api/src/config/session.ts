import {MemoryStore, SessionOptions, Store} from "express-session";
import { IN_PROD } from "./app";

const THIRTY_MINUTES = 1000 * 60 * 30

export const {
    SESSION_SECRET = 'please keep this secret, mate',
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT =  THIRTY_MINUTES
} = process.env

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
}
