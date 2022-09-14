import { useState, useEffect, useRef, useContext, createContext } from 'react';
import FortuneHub from './FortuneHub';
import DebugInstance from '../debug/DebugInstance';

export const FortuneHubContext = createContext();
export const fortuneHubInstance = new FortuneHub();

export const DebugContext = createContext();
export const debugInstance = new DebugInstance();
 
