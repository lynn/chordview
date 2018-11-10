import * as React from "react";
import "./App.css";

import logo from "./logo.svg";
import teeTime from "./tee-time.mp3";

const audioUrl: string = teeTime;
const songStartTime: number = 0.24;
const bpm: number = 141;

// prettier-ignore
const chords: string[] = [
  // intro
  "Abm13", "Abm13", "Abm13", "Abm13",
  "Abm13", "Abm13", "Abm13", "Ebm/Db",
  "Ebm13", "Ebm13", "Ebm11", "Ebm11",
  "Ebm11", "Ebm11", "Ebm11", "Abm/Gb",
  "Abm13", "Abm13", "Abm13", "Abm13",
  "Abm13", "Abm13", "Abm13", "Ebm/Db",
  "Ebm13", "Ebm13", "Ebm13", "Ebm13",
  "Ebm11", "Ebm11", "Ebm11", "Abm/Gb",

  // when drums start
  "Abm13", "Abm13", "Ebm7/Bb", "Ebm7/Bb",
  "Badd9", "Badd9", "Badd9", "Badd9/A",
  "Abm13", "Abm13", "Ebm7/Bb", "Ebm7/Bb",
  "Ebsus7", "Ebsus7", "Eb7", "Eb7",

  "Abm13", "Abm13", "Ebm7/Bb", "Ebm7/Bb",
  "Badd9", "Badd9", "C°7", "C°7",
  "Dbsus7", "Dmaj7b5", "Ebm7", "Eb7/G",
  "Abm13", "Ebm7/Bb", "Badd9", "C°7",
  "Dbsus7", "D°", "Ebm7", "Eb7/G",
  "Abm13", "Ebm7/Bb", "Badd9", "C°7",
  "Dbsus7", "(Eb minor blues scale)", "(Eb minor blues scale)", "(Eb minor blues scale)",  // first lick
  "Abm13", "Ebm7/Bb", "Badd9", "C°7",
  "Dbsus7", "(Eb minor blues scale)", "(Eb minor blues scale)", "(Eb minor blues scale)",  // second lick
  "Abm13", "Ebm7/Bb", "Badd9", "C°7",
  "Dbsus7", "D°", "Ebm", "Gbm9",

  "Abm13", "Ebm7/Bb", "Badd9", "C°7",
  // I should have tested this idea with an easier song
];

class ChordDisplay extends React.Component<{ audio: HTMLAudioElement }, {}> {
  public render() {
    const t = this.props.audio.currentTime - songStartTime + 0.06;
    const bps = bpm / 60;
    const bk = t * bps;
    const b = Math.floor(bk);
    const k = bk % 1;
    const kk = Math.floor(k * 4);
    const chord = (chords[b] || '?').replace(/#/g, '♯').replace(/b(?!lues)/g, '♭');
    const style: React.CSSProperties = {
      fontFamily: 'DejaVu Sans Mono',
      textAlign: 'left',
      marginLeft: 500,
      fontSize: 36,
      whiteSpace: 'pre',
      color: `rgba(255, 255, 255, ${1-k*.6})`
    };
    const text = `Vulfpeck – Tee Time
${t.toFixed(2)}sec
beat ${Math.floor(b/4)+1}/${b%4+1}

    ${chord}
`;

    return <p style={style}>{text}</p>;
  }
}

class App extends React.Component {
  public audioRef = React.createRef<HTMLAudioElement>();

  public interval: number | undefined = undefined;
  componentDidMount() {
    this.interval = window.setInterval(() => this.forceUpdate(), 20);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  public render() {
    return (
      <div className="App">
        <p>
          <audio
            ref={this.audioRef}
            src={audioUrl}
            autoPlay={true}
            controls={true}
            onLoadedMetadata={event => console.log(event.currentTarget.duration)}
          />
        </p>

          {this.audioRef.current ? (
            <ChordDisplay audio={this.audioRef.current} />
          ) : null}
      </div>
    );
  }
}

export default App;
