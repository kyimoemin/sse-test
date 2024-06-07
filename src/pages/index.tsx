import { useEffect, useRef } from "react";

export default function Home() {
  const ev = useRef<EventSource>();

  useEffect(() => {
    const eventSource = (ev.current = new window.EventSource(
      "/api/hello?id=43"
    ));
    eventSource.onopen = (e) => {
      console.log("event source initiated");
    };
    eventSource.onmessage = (message) => {
      console.log("receive message:", message.data); // Make sure to use message.data
      return true;
    };
    eventSource.onerror = (error) => {
      console.log("EventSource failed:", error);
      eventSource.close();
    };
    return disconnect;
  }, []);

  function disconnect() {
    console.log("close event source");
    ev.current?.close();
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      Hello World
      <button onClick={disconnect}>disconnect</button>
    </main>
  );
}
