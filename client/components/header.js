import Link from 'next/link';

export default ({ currentUser}) => {
    
     const links = [
          !currentUser && {label: 'Sign Up' , href: '/auth/signup'},
          !currentUser && {label: 'Sign In' , href: '/auth/signin'},
           currentUser && {label: 'Create Tickets', href: 'tickets/new'},
           currentUser && {label: 'My Orders', href: '/orders'},
          currentUser && {label: 'Sign Out' , href: '/auth/signout'}]
          .filter(linkConfig => linkConfig)
          .map(( {label,href}) =>{
                
               return  <Link href={href}><a key={href} className="nav-link">{label}</a></Link>
              
          });

     return (<nav className="navbar navbar-light bg-warning">
          <Link href="/">
               <a className="navbar-brand">Home</a>
          </Link>

          <div className="d-flex justify-content-end">
               <ul className="nav d-flex align-items-center">
                  { links}
               </ul>
          </div>
     </nav>);
}