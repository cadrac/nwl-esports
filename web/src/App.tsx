import { useState, useEffect } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { CreateAdBanner } from "./components/CreateAdBanner"
import { CreateAdModal } from "./components/CreateAdModal"
import { GameBanner } from "./components/GameBanner"
import { CaretRight, CaretLeft } from "phosphor-react"

import "./styles/main.css"

import logoImg from "./assets/logo-nlw-esports.svg"
import axios from "axios"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    slides: {
      perView: 6,
      spacing: 24,
      number: games.length
    },
    created() {
      setLoaded(true)
    },
  })

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => setGames(response.data))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="flex flex-row gap-2 mt-16 max-w-[1344px]">
        {loaded && instanceRef.current && (
          <button 
            onClick={() => instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          >
            <CaretLeft className={`w-12 h-12 ${currentSlide === 0 ? 'text-zinc-700' : 'text-zinc-400'}`} />
          </button>
        )}

        <div ref={sliderRef} className="keen-slider">
          {games.map(game =>
            <GameBanner
              className="keen-slider__slide"
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />)}
        </div>

        {loaded && instanceRef.current && (
          <button 
            onClick={() => instanceRef.current?.next()}
            disabled={currentSlide === games.length - 6}
          >
            <CaretRight 
              className={`w-12 h-12 text-zinc-400 
                ${currentSlide === games.length - 6 ? 'text-zinc-700' : 'text-zinc-400'}
              `} 
            />
          </button>
        )}
      </div>

      <Dialog.Root>
        <div className="w-full flex flex-row">
          <div className="w-12 h-12 ml-2 text-zinc-400" />
          <CreateAdBanner />
          <div className="w-12 h-12 mr-2 text-zinc-400" />
        </div>

        
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
