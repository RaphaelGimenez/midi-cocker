import { Midi } from '@cocker/midi-obs';
import { useEffect, useState } from 'react';

export function Index() {
  const [bpm, setBpm] = useState(0);

  useEffect(() => {
    const midi = new Midi();

    const sub = midi.bpm$('e').subscribe(setBpm);
    return () => sub.unsubscribe();
  });
  return <div className="bpm">{bpm}</div>;
}

export default Index;
