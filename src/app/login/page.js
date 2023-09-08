"use client"
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {

    const [formValue,SetFormValue]=useState({
        email:"email@email.com",
        password:"123"
    })
    
    const router=useRouter();

    const inputChange = (name,value) => {
        SetFormValue(formValue=>(
            {
                ...formValue,
                [name]:value
            }
        ))
    }

    const Submit = async (e) => {
        e.preventDefault();
        if(formValue.email.length===0){
            alert("Email Required")
        }
        else if(formValue.password.length===0){
            alert("Password Required")
        }
        else{
            const config = {method: 'POST', body: JSON.stringify(formValue)}
            const response = await fetch("/api/login", config)
            const json=await response.json();
            if(json['status']===true){
                router.replace("/dashboard")
            }
            else {
                alert(json['message'])
            }

        }
    }



    return (

        <div className="container">
            <div className="row d-flex vh-100 align-content-center justify-content-center">
                <div className="col-5 ">
                    <form onSubmit={Submit}  className="card p-5">
                        <label className="form-label">User Email</label>
                        <input className="form-control" value={formValue.email} onChange={(e)=>inputChange('email',e.target.value)} type="email" placeholder="example@example.com"/>
                        <label className="form-label mt-3">User Password</label>
                        <input className="form-control" value={formValue.password} onChange={(e)=>inputChange('password',e.target.value)} type="password" placeholder="XXXXXXX"/>
                        <input className="btn btn-primary mt-3" type="submit" value="Login" />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Page;


