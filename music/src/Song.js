import "./Song.css"

function Song(props) {
  const {
    song,
    isPlaying,
    isSelected,
    setSelected,
  } = props
  const {
    artistName,
    artworkUrl,
    collectionName,
    trackName,
  } = song
  const className =
    isPlaying ? "song playing" :
      isSelected ? "song selected" :
        "song"
  return (
    <div className={className} onClick={() => setSelected({...song})}>
      <img src={artworkUrl} />
      <div className="info">
        <h1>{trackName}</h1>
        <h2>{artistName}</h2>
        <h2>{collectionName}</h2>
      </div>
    </div>
  )
}

export default Song
