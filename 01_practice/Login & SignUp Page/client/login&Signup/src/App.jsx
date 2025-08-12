import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./components/AppLayout.jsx"
import { LogInPage } from "./components/LogInPage.jsx"
import { SignUpPage } from "./components/SignUpPage.jsx"
import { HomeLayout } from "./components/HomeLayout.jsx"
import { HeroSection } from "./components/HeroSection.jsx"


export const App = () => {

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <AppLayout />,
        children: [
        
          {
            path: "/login",
            element: <LogInPage />
          },
          {
            path: "/signup",
            element: <SignUpPage />
          },
         
        ]
      },
       {
            path: "/home",
            element: <HomeLayout />,
            children:[
              {
                path:"/home/herosection",
                element:<HeroSection/>,

              }
            ]

          }
      

    ]);




  return (
    <RouterProvider router={router} />
  )
}