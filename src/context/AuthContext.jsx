import {createContext,useContext,useEffect,useState} from 'react';
import {api} from '../services/api';
const AuthContext=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(null);const [loading,setLoading]=useState(true);
 useEffect(()=>{if(localStorage.getItem('kubhera_token'))api('/auth/me').then(d=>setUser(d.user)).catch(()=>localStorage.removeItem('kubhera_token')).finally(()=>setLoading(false));else setLoading(false)},[]);
 const login=async(form)=>{const d=await api('/auth/login',{method:'POST',body:JSON.stringify(form)});localStorage.setItem('kubhera_token',d.token);setUser(d.user);return d.user};
 const register=async(form)=>{const d=await api('/auth/register',{method:'POST',body:JSON.stringify(form)});localStorage.setItem('kubhera_token',d.token);setUser(d.user);return d.user};
 const logout=()=>{localStorage.removeItem('kubhera_token');setUser(null)};
 return <AuthContext.Provider value={{user,loading,login,register,logout}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);
