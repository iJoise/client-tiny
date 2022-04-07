import React from "react";
import s from "./style/Layout.module.scss";
import { Outlet } from 'react-router-dom';

type LayoutPropsType = {

}


export const Layout: React.FC<LayoutPropsType> = ({}) => {

   return (
      <div>
        <Outlet/>
      </div>
   )
}
