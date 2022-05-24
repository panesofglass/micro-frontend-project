import React, { useEffect, useMemo, useRef, useState } from "react"
import { getList } from "./api"
import { deepEqual } from "./utils";
import SongList from "./SongList"
import Footer from "./Footer"

function App() {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const prevSelected = useRef(null)
  const audio = useMemo(() => new Audio(), [])

  useEffect(() => {
    let mounted = true
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      })
    return () => mounted = false
  }, [])

  useEffect(() => {
    if (selected) {
      if (deepEqual(selected, prevSelected.current)) {
        console.log("deeply equal")
        audio.paused ? audio.play() : audio.pause()
        setIsPlaying(!audio.paused)
        return
      }

      console.log("new selection")
      if (!audio.paused) {
        audio.pause()
      }

      prevSelected.current = selected
      audio.src = selected.previewUrl
      audio.play()
      setIsPlaying(true)
    }
  }, [selected])

  return (
    <>
      <SongList
        songs={list}
        selected={selected}
        isPlaying={isPlaying}
        setSelected={setSelected}
      />
      <Footer />
    </>
  )
}

export default App
