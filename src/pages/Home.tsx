import ChatsContainer from "../components/ChatsContainer";
import Sidebar from "../components/Sidebar";  

const Home = () => {
  

  return (
    <section className='h-screen w-screen flex relative bg-sidebar-nav-color'>
      <Sidebar />
      <ChatsContainer />      
    </section>
  )
}

export default Home