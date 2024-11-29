import { Button } from "./components/ui/button"

const Home = () => {
  console.log(import.meta.env.VITE_TEST)
  return (
    <div className=" font-bold text-red-600">Home
          <Button>Click me</Button>
    </div>
  )
}

export default Home