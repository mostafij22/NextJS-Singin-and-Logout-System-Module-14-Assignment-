import Link from "next/link";
import React from 'react';
const Page = () => {
    return (
        <div>
            <div className="container">
                <div className="row d-flex vh-100 align-content-center justify-content-center">
                    <div className="col-6 text-center">
                        <div className="btn-group">
                            <Link className="btn btn-success" href={"/login"} replace>Sign In</Link>
                            <Link className="btn btn-primary" href={"/dashboard"} replace>Dashboard</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

