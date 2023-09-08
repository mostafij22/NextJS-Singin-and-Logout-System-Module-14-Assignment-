import {headers} from "next/headers";

async function GetData(){
    const headersList = headers()
    return  headersList.get('email')
}


import React from 'react';
import AppNavBar from "@/app/component/AppNavBar";

const Page = async () => {
    const x = await GetData();
    return (
        <div>
            <AppNavBar/>
            {x}
        </div>
    );
};

export default Page;

