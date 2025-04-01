import { Linden_Hill } from "next/font/google"
import Link from "next/link"

export const Layout = (props)=>{
<div>
    <Link href={'/'}>Home</Link>
<Link href={'/register'}>Register</Link>
<Link href={'/login'}>Login</Link>

</div>
}