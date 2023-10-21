
JWT (JSON Web Token )
======================

Class Topis: (Sign in and Log out ) concept
------------------------------------------
jwt token , authentication, user authenticate hole redirect kore pathai deya.
user authenticate na thakle redirect kore registration page pathai deya.
authentication er jonno properly Cookies manage kora. 

jwt encode kora , decode kora , token middleware diye pass kora , token header e set kora 
carry kora, login korle redirect kore pathai deya ba adik odik neya jawa. a e sob gulu 
a application er topics.

user er akta singing options thakbe user email password diye login korbe , jodi email password
match kore tahole user k login korabo and dashboard e pathabo. dashboad e asle user er email ta
return kore dekhabe. and user logout korle home page e pathai dibo. 

akhane kisu security bisoy ase, 
user jokhon login kore phelbe tokhon user k login page aste dibo na. aber user logout korle 
tokhon r dashboard e gete parbe na. a bisoy gulu amra Cookie madhome korbo.
login korle Browser er Cookies Storage e token name e akta cookie set hobe ja akta encrypted
cookie and a e encrypted string ta pabo ta JWT encrypted String. user Jokhon login korse email
password diye tokhon ta encrypt kore akta token er vitor rekhe disse and sei token ta aber brower
e set hobe , 
React JS amra local storage or session storage e token set kore thaki but Token Cookie te rakha
recommanded for security perpose. 
Cookie te akta expire date , size , HttpOnly true, Secure true , SameSite Strict, last access
date thakbe. jotokhon porjonto cookie browser storage e thakbe totokhon porjonto dashboard page
user access korte parbe and logout korar sate sate cookie information browser storage theke muse
jabe , R cookie information clear hole user r dashboard e jetei parbe na.



1. api directory
    1) login folder= route.js
    2) logout folder= route.js


JWT jonno onek gulu credential dorkar hoi, se jonno .env environment variabel file create kore 
nei. .env file er vitor JWT Token bisoye jegulu dorkar hoi ta manage korbo . JWT token toiri
korar jonno akta secret key lage, ja amra nijer moto kore toiri kori, dhore nei: 
JWT_SECRET=123-XYZ-ABC
a e secret key diye amra user er email address k encrypt korbo and decrypt korbo. Cookie jemon 
expire time thake thik JWT teo expire period thake, JWT je token ta amra create korbo seta sob
somoy alive thakbe na, akta certain period por JWT token ta destroy hoye jabe . jekaro amra jwt
akta expiration time diye debo. dhore nei 2 hours , 2 hours vitor JWT token kaj korbe but 2h 
por JWT token kaj korbe na. JWT_ISSUER name thakbe means kon domain ba website theke token 
jabe ta, so, JWT Token er jonno 3ta credential dorkar, security,expiratin time, issuer ba domain
name.
    1. JWT_SECRET=123-XYZ-ABC
    2. JWT_EXPIRATION=2h
    3. JWT_ISSUER= ostad.app

akhon JWT token gulu encrypt decrypt korar jonno app er vitor utility nam e akta directory create
kore nibo. jar vitor JWTHelper.js nam e akta file create kore nei , jar vitor 2ta function toiri
kori 1st funciton JWT token encrypt korbe 2nd funciton JWT token decrypt korbe.JWT token encrypt
korar jonno npm.js e onek gulu pakage ase, but mother package hosse= jose jwt, a e package k rap 
kore onek soto soto package toiri hoise.
amra main = jose jwt , a e official package tai use korbo. JWT er official package hose= jose jwt

2. npm install jose 

jose package install hole , a e package diyei jwt token encrypt and decrypt korbo JWTHelper.js 
file er vitor. jwt token encrypt korar jonno signJWT property and decrypt korar jonno jwtVerify
property use korbo jose theke. 
import { SignJWT, jwtVerify } from "jose";

user jokhon login kore email,password diye login kore, amra jwt token er vitor user er email 
rekhe dibo, so function parameter er vitor email dibo and secret key toiri korbo.

export async function CreateToken(email){

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
} 

secret key diye akta token toiri korbo, jwt token toiri korte gele onek gula property lage
1. SignJWT 2. payload (token er vitor je data rakha hobe tai payload, payload dei object akare)

jwt token er jonno protected header set korbo, protected header vitor jwt token er algorithm bole
dibo, token algorithm onek dhoroner hoi tar vitor 'HS256' hosse worldly used algorithm.

then set issue add korbo means kokhon create hosse ,then set issuer bole dibo means k issue korlo
then expire moment dibo means kotokhon pore token expire hoye jabe, 
finally sign korbo means encrypt korbo , sign korbo secret key diye ja secret nam create koresi.
tahole akhon akta token create hobe. 
akhon a e token ta k function theke return kore dibo.

//===Token create===== (Token hosse akta variabe, jar vitor user login email or onnokisu
   encrypt kore rakha hoi  )

import { SignJWT, jwtVerify } from "jose";

export async function CreateToken(email){

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    let token = await new SignJWT({email:email})
                .setProtectedHeader({alg: 'HS256'})
                .setIssuedAt()
                .setIssuer(process.env.JWT_ISSUER)
                .setExpirationTime(process.env.JWT_EXPIRATION)
                .sign(secret);

    return token;            

}

amra akta function likhlam Token create korar jonno , akhon aro akta function create korbo
Token varify korar jonno. 
email encrypt kore token nam e variable e rakha aktu kotin but email decrypt kor kub sohoj

Token decrypt korar jonno, encrypt korar motoi akta secret key nibo. and jwtVerify property
ba method er vitor (token,secret) diye decrypt korbo.

//===Token decrypt function==
 
export async function VarifyToken(token){

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    let decoded = await jwtVerify(token, secret);

    return decoded;            

}

jwt token decode hole onek kisu pawa jai, jemon
1. HEADER
2. PAYLOAD (token er vitor je data rakha hobe tai payload)
3. VERIFY SIGNATURE

je decoded token ta amra pabo sei token theke amra PAYLOAD retun korbo. karon amader email
address ta actually oi token er payload e dhuke jai, setar decoded ongso ta return kore dilam.

token create e je email parameter diye function e dei ta saifers text pai and decode korle plain
text  return pabo. ja ae line er madhome pabo-
const secret = new TextEncoder().encode(process.env.JWT_SECRET);


JWTHelper.js file theke je token ta pabo, sei token ta amder application er Cookie vitor set korbo. R 
ajonno utility directory te TokenCookie.js nam e akta file nibo, Cookie generate korar jonno.
TokenCookie.js file e JWTHelper.js file er CreateToken(email); function k call korte hobe. ja akta encrypted
token create korbe. a e token ta amra Cookie vitor rekhe dibo. a e token er akta maximum age dibo means 
koto khon token ta live thakbe- 7200 second,

export async function TokenCookie(email) {
   let token = await CreateToken(email);
   return {'Set-Cookie': `token=${token}; Max-Age=7200; Secure; HttpOnly; Path=/; SameSite=Strict`}
}

application er vitor login thakbe so, akta login derectory toiri kori , login korar por dashboard e dhukbo
a e dashboard er vitor onek page thakte pare, dashboard hosse login poroborti directory. jar vitor nested
route toiri kore onek gulu page toiri korte pari. 

application jokhon banabo tokhon 2 vabe chinta korbo 1.login korar ager obosta 2.login korar porer obosta
dashboard er vitor akta page create kore nibo ja hobe login poroborti obosta.

application er login purboborti and poroborti je controller ba niyontrok hobe middleware. so amra akta root
directory (src vitor ) middleware toiri kore nei. middleware er vitor besi code likhbona , er jonno joto
utility lage, jemon- login check,password varification, CSRF etc middleware somporke sob feature gulu 
utility directory vitor MiddlewareUtility.js file e likhbo and middleware e feature gulu add korbo.   

amra Cookies check korar jonno akta funciton likhbo 
MiddlewareUtility.js
--------------------
export async function CheckCookieAuth(req) {

    try {
        let token = req.cookies.get('token');
        let payload= await VerifyToken(token['value'])
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('email', payload['email'])
        return NextResponse.next({
            request: {headers: requestHeaders},
        })
    }
    catch (e) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

}

application er Cookies dhorte gele (req) lage, application er cookie vitor token ase kina ta request er 
cookie theke prothome dhore nibo, => let token = req.cookies.get('token'); ja browser e user login korar
jonno email ta dibe ja encrypt/encode ba token akare set hoi,
a e token ta k decrypt/decode korar jonno akta function toiri korsi JWTHelper.js file e , seta k try er 
vitor add kore tar vitor token ta pass korai dilam, a e token jodi varification successful hoi tahole 
token theke akta payload return pabo, jar vitor user er email address ta ase.
authentication check korar satei request er headers er vitor email address ta set kore dibo, jate 
porobortite oi headers er vitor email address ta set hobe ja akta user er identity, ja diye pore onek kaj
kora jabe, amra kono user er identity sonkranto information frontend theke nibo na. seta k amra backend e
process korbo, jate kew identity use kore user er kono kisu manupulate na korte pare, 

amra akta request header toiri kore nibo, jeta token ta k ber ber varify korbe, and application er vitor
user er email address ta k supply korbe, and poroborti kajer jonno return korbe.
const requestHeaders = new Headers(req.headers);
requestHeaders.set('email', payload['email']);
token varify hobe then email address controller e jabe poroborti access pawer jonno and ta carry kore niye
jabe- NextResponse.next().

 return NextResponse.next({
            request: {headers: requestHeaders},
 })

middlware.js
-----------
export async function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        console.log("Hello")
        return await CheckCookieAuth(req)
    }
}
akhane request nextUrl e pathname  dashboard path e jotober user jabe totober oi varification ta complete
hoye hoye jabe. login poroborti joto ghotona dashboard directory vitor jabe. and login poroborti ghotoner
jonno authentication check korte hobe, 
akta software k frontend theke noi backend theke thinking korte hobe. jodi backend developer hoi.
 

user k loging korar jonno POST method toiri kori, api directory te login folder e route.js file diye

//===Login====== api/login/route.js

export async function POST(req,res) {
    const JsonBody = await req.json()
    let email=JsonBody['email'];
    let password=JsonBody['password'];
    //Data Checking
    if(email==="email@email.com" && password==="123"){
        let Cookie =await TokenCookie(email);
        return NextResponse.json(
            {status:true,message:"Request completed"},
            {status: 200, headers:Cookie}
        )
    }
    else{
        return NextResponse.json(
            {status:false,message:"Request Fail"}
        )
    }
}



//===Log out==== api/login/route.js
log out means: Cookies er vitor ja ase ta delete kore deya.

export async function GET(req,res) {
    cookies().delete('token')
    return NextResponse.json(
        {status:true,message:"Request Completed"}
    )
}


Backend er kaj ses akhon amader kaj hosse Frontend niye kaj kora
home page e 2ta link kore dibo login and dashboard


login/page.js = file e login form theke login and logout hobe
