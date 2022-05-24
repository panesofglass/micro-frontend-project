import "./SongList.css"
import { deepEqual } from "./utils"
import Song from "./Song"

function SongList(props) {
  const { songs, selected, setSelected, isPlaying } = props
  console.log(selected, isPlaying)
  return (
    <ul className="song-list polka-dot-bg">
      {songs.map(item =>
        <li
          className={deepEqual(selected, item) ? isPlaying ? "selected playing" : "selected" : ""}
          key={item.artworkUrl}
          onClick={() => setSelected({...item})}
        >
          <Song {...item} />
        </li>
      )}
    </ul>
  )
}

export default SongList
