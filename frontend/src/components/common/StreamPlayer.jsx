import { useEffect, useRef } from "react";
import Hls from "hls.js";

/**
 * StreamPlayer component for playing an HLS stream.
 * @param {string} props.src - The HLS stream URL (e.g., http://localhost:8080/hls/test.m3u8)
 */
export default function StreamPlayer({ src, ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && src) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);

        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        // For Safari
        videoRef.current.src = src;
      }
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      width={props.width || 640}
      height={props.height || 360}
      style={{ background: "#000" }}
    />
  );
}