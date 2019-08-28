// import React, { Component } from 'react';
// import { BrowserRouter as Router, } from 'react-router-dom'

// import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
// /**
// *  Create routes mapping
// *  
// *  All dynamic params will display automatically.
// *  not that even though '/users/:id' route is not in configuration file, 
// *  it's corresponding link it will be displayed as the value of ':id'
// */
// const routes = {
//     '/': 'Home',
//     '/blog': 'Blog',
//     '/users': 'Users',
//     '/users/:id/info': 'User Info',
//     '/users/:id/posts/:p_id': 'Post :p_id by :id', // backreferences will be replaced by correspoding parts of url

//     /* 
//       You can provide a callback of (url, match)=>string signature
//       match will contain pattern values both prefixed and isolated
//       for instance the following pattern will result in callback with

//       ('/users/dummy/posts/4', {
//        'id':'dummy', ':id':'dummy', 
//        'page':'4',   ':page':'4'
//       })

//       while link will contain smth like "Page 4 of 10".
//     */
//     '/users/:id/posts/:page': (url, match) => `Page ${match[':page']} of ${Pagination.total()}`,


//     /*
//       For static routes 'match' argument is always null

//       NOTE: Services or stores will not be automatically injected into resolver function, 
//       you should either inject your services to your config, like in previous example (bad pattern), 
//       .bind context to your resolvers,  or even totally relay the resolution to a store-aware service
//     */
//     '/settings': MyBreadcrumbsResolver.resolve, // will receive ('/settings',null)

//     /*
//     *  NULLs, FALSEs and empty strings (if listed explicitly) will be skipped from breadcrumb chain. 
//     *  Otherwise if url is matched but not provided in mapping, the corresponding url part will be displayed as crumb title
//     *  
//     *  If callback returns NULL, FALSE or an empty string, the breadcrumb is hidden from chain
//     */

//     //  will skip this link from breadcrumbs. Without this line the crumb title for url will be "posts"
//     '/users/:id/posts': null,

//     //  will skip this link from breadcrumbs conditionally
//     '/users/:id/friends/': (url, match) => match.id == User.getId() ? null : match.id,

// };
// class Test extends Component {
//     render() {
//         return (
//             <Router>
//                 <Breadcrumbs mappedRoutes={routes} />
//             </Router>
//         );
//     }
// }

// export default Test;