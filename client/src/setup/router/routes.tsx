import { useRoutes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Layout from "../../components/Layout/Layout";
import Users from "../../pages/Users/Users";
import Nfts from "../../pages/Nfts/Nfts";
import Collections from "../../pages/Collections/Collections";
import Auth from "../../pages/Auth/Auth";
import Settings from "../../pages/Settings/Settings";
import CreateNft from "../../pages/CreateNft/CreateNft";
import HomeSettings from "../../pages/HomeSettings/HomeSettings";
import CreateCollection from "../../pages/CreateCollection/CreateCollection";

export function UseRoutes() {
   let element = useRoutes([
      {
         path:'/',
         element: <Layout/>,
         children: [
            {
               path: '/dashboard',
               element: <Dashboard/>
            },
            {
               path: '/users',
               element: <Users/>
            },
            {
               path: '/nfts',
               element: <Nfts/>
            },
            {
               path: '/create_nft',
               element: <CreateNft/>
            },
            {
               path: '/collections',
               element: <Collections/>
            },
            {
               path: '/create_collection',
               element: <CreateCollection/>
            },
            {
               path: '/settings',
               element: <Settings/>
            },
            {
               path: '/home_settings',
               element: <HomeSettings/>
            },
         ]
      },
      {
         path: '/auth',
         element: <Auth/>
      },
      {
         path: '*',
         element: <Auth/>
      }
   ])
   return element
}

export default UseRoutes