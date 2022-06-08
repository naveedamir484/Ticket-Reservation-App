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
                
               return  <Link key={href}  href={href}><a key={href} className="navbar-brand">{label}</a></Link>
              
          });


     return (<nav className="navbar navbar-light ">
           
           { currentUser ? <Link href="/"><a className="navbar-brand">Home</a></Link> :
               <Link href="/auth/signin"><a className="navbar-brand">@ticket_reservation.com</a></Link>}
          
          <li  className=" d-flex " > { links} </li>
        
     </nav>);
}