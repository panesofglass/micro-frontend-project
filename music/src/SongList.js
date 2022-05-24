import "./SongList.css"
import Song from "./Song"

function SongList(props) {
  const { songs, selected, setSelected, isPlaying } = props
  return (
    <div className="song-list">
      {songs.map(item =>
        <Song
          song={item}
          isPlaying={isPlaying}
          isSelected={item === selected}
          setSelected={setSelected}
        />)}
    </div>
  )
}

export default SongList
