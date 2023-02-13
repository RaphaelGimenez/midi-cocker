import { getMessageType } from './utils/get-message-type';
import { filter, from, map, Observable, switchMap, take, tap } from 'rxjs';
export class Midi {
  start = 0;
  // Expose an observable that list availabe midi inputs from the Web Midi API
  inputs$: Observable<WebMidi.MIDIInput[]> = from(
    navigator.requestMIDIAccess()
  ).pipe(
    switchMap((midiAccess) => {
      const inputs = Array.from(midiAccess.inputs.values());

      return new Observable<WebMidi.MIDIInput[]>((subscriber) => {
        const stateChangeHandler = () => {
          console.log('CHANGE');
          subscriber.next(Array.from(midiAccess.inputs.values()));
        };
        midiAccess.onstatechange = stateChangeHandler;
        subscriber.next(inputs);
        return () => {
          midiAccess.onstatechange = () => null;
        };
      });
    })
  );

  // Expose an observable that list availabe midi outputs from the Web Midi API
  outputs$: Observable<WebMidi.MIDIOutput[]> = from(
    navigator.requestMIDIAccess()
  ).pipe(
    switchMap((midiAccess) => {
      const outputs = Array.from(midiAccess.outputs.values());

      return new Observable<WebMidi.MIDIOutput[]>((subscriber) => {
        const stateChangeHandler = () => {
          console.log('CHANGE');
          subscriber.next(Array.from(midiAccess.outputs.values()));
        };
        midiAccess.onstatechange = stateChangeHandler;
        subscriber.next(outputs);
        return () => {
          midiAccess.onstatechange = () => null;
        };
      });
    })
  );

  // Expose a function that returns an observable that listen to a specific midi input by id
  listen$ = (id: string) =>
    this.inputs$.pipe(
      map((inputs) => inputs.find((input) => input.id === id)),
      filter((input) => input !== undefined),
      switchMap((input) => {
        if (!input) {
          throw new Error(`Midi input with id ${id} not found`);
        }

        return new Observable<WebMidi.MIDIMessageEvent>((subscriber) => {
          input.onmidimessage = (event) => {
            subscriber.next(event);
          };
          return () => {
            input.onmidimessage = null as unknown as (
              event: WebMidi.MIDIMessageEvent
            ) => void;
          };
        });
      })
    );

  // Expose a function that send a midi message to a specific midi output by id
  send(id: string, message: number[]): void {
    // get an output by id from the observable outputs$
    this.outputs$
      .pipe(
        take(1),
        map((outputs) => outputs.find((output) => output.id === id)),
        filter((output) => output !== undefined)
      )
      .subscribe((output) => {
        if (!output) {
          throw new Error(`Midi output with id ${id} not found`);
        }

        output.send(message);
      });
  }

  // Listen to midi messages of an input and emit computed BPM
  // each time a clock message is received
  bpm$(id: string): Observable<number> {
    return this.listen$(id).pipe(
      filter((message) => {
        const data = message.data as unknown as [];
        const messageType = getMessageType(data);
        return messageType.includes('clock');
      }),
      map((message) => {
        const data = message.data as unknown as [];
        const messageType = getMessageType(data);

        switch (messageType) {
          case 'clock-start':
            return 0;
          case 'clock-continue': {
            const now = performance.now();
            const interval = now - this.start;
            return Math.round(60000 / interval);
          }
          case 'clock-stop':
            return 0;
          default:
            return 0;
        }
      }),
      tap((bpm) => {
        if (bpm) {
          this.start = performance.now();
        }
      })
    );
  }
}

export default Midi;
