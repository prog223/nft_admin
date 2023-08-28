import { useRoutes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Layout from "../../components/atoms/Layout/Layout";
import Users from "../../pages/Users/Users";
import Nfts from "../../pages/Nfts/Nfts";
import Collections from "../../pages/Collections/Collections";
import Auth from "../../pages/Auth/Auth";
import Settings from "../../pages/Settings/Settings";
import CreateNft from "../../pages/CreateNft/CreateNft";
import HomeSettings from "../../pages/HomeSettings/HomeSettings";
import CreateCollection from "../../pages/CreateCollection/CreateCollection";
import Error from "../../pages/Error/Error";
import Chat from "../../pages/Chat/Chat";

export function UseRoutes() {
   let element = useRoutes([
      {
         path:'/admin',
         element: <Layout/>,
         children: [
            {
               path: 'dashboard',
               element: <Dashboard/>
            },
            {
               path: 'users',
               element: <Users/>
            },
            {
               path: 'nfts',
               element: <Nfts/>
            },
            {
               path: 'create_nft',
               element: <CreateNft/>
            },
            {
               path: 'collections',
               element: <Collections/>
            },
            {
               path: 'create_collection',
               element: <CreateCollection/>
            },
            {
               path: 'settings',
               element: <Settings/>
            },
            {
               path: 'home_settings',
               element: <HomeSettings/>
            },
            {
               path: 'chat',
               element: <Chat/>
            },
         ]
      },
      {
         path: '/',
         element: <Auth/>
      },
      {
         path: '*',
         element: <Error/>
      }
   ])
   return element
}

export default UseRoutes